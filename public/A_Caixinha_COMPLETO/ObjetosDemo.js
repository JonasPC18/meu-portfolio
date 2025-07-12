import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import {
  Chave,
  Caixinha,
  TatuagemMickey,
  TofuFrito,
} from "./FerramentasDemo.js";

/**
 * O Baú começa fechado (acaoOk = false).
 * Se o jogador usar a chave, ele abre (acaoOk = true).
 * Ao manipular o baú fechado, ele avisa que está fechado.
 * Ao manipular aberto:
 *  caso a janela estiver aberta (janela.acaoOk = true), coloca "caixinha" no inventário.
 *  caso a janela estiver fechada, mostra a mensagem de "ataque de pânico".
 */
export class Bau extends Objeto {
  #engine;
  #caixinhaPegou;

  constructor(engine) {
    super("bau", "[fechado]", "[aberto]");
    validate(engine, "Object");
    this.#engine = engine;
    this.#caixinhaPegou = false;
  }

  usar(ferramenta) {
    validate(ferramenta, Ferramenta);
    if (ferramenta instanceof Chave) {
      this.acaoOk = true;
      console.log("Você abriu o baú com a chave!");
      return true;
    }
    return false;
  }

  manipular() {
    if (!this.acaoOk) {
      console.log("O baú está fechado.");
      return false;
    }
    // Se o baú está aberto:
    if (!this.#caixinhaPegou) {
      // aqui ele tenta achar a 'janela' na sala corrente
      const janela = this.#engine.salaCorrente.objetos.get("janela");
      if (janela && janela.acaoOk) {
        // Janela ta aberta, então o jogador pega a caixinha
        const caixinha = new Caixinha(this.#engine);
        console.log("Você pegou a caixinha que estava dentro do baú!");
        this.#engine.bolsa.guarda(caixinha);
        this.#caixinhaPegou = true;
      } else {
        console.log(
          "Ao se aproximar do Baú, você começa a sentir um calor insuportável. " +
            "Seria um ataque de pânico? Melhor abrir a janela."
        );
      }
    } else {
      console.log("Não há mais nada dentro do baú.");
    }
    return true;
  }
}

//Janela começa fechada. Ao manipular, ela abre.
//Com a janela aberta, o jogador pode pegar o item que está no baú (caso o baú também esteja aberto).
export class Janela extends Objeto {
  constructor() {
    super("janela", "[fechada]", " [aberta]");
  }

  manipular() {
    if (!this.acaoOk) {
      this.acaoOk = true;
      console.log("Você abriu a janela.");
    } else {
      console.log("A janela já está aberta.");
    }
    return true;
  }
}

// Na primeira vez em que for manipulado, o jogador encontra a ferramenta "chave" embaixo do tapete e guarda no inventário.

export class Tapete extends Objeto {
  #engine;

  constructor(engine) {
    super("tapete", "", "");
    validate(engine, "Object");
    this.#engine = engine;
  }

  manipular() {
    if (!this.acaoOk) {
      // Primeira manipulação: o jogador encontra a chave
      console.log("Você achou uma chave embaixo do tapete.");
      const chave = new Chave();
      this.#engine.bolsa.guarda(chave);
      this.acaoOk = true; // marca que já pegou a chave
    } else {
      console.log("Não há mais nada embaixo do tapete.");
    }
    return true;
  }
}

// Esse objeto é meramente ilustrativo
export class PinheiroDeNatal extends Objeto {
  constructor() {
    super("pinheiro_de_natal", "", "");
  }

  manipular() {
    console.log("Nada acontece.");
    return false;
  }
}

// Esse objeto é meramente ilustrativo.
export class BrinquedosQuebrados extends Objeto {
  constructor() {
    super("brinquedos_quebrados", "", "");
  }

  manipular() {
    console.log("Nada acontece.");
    return false;
  }
}

//Quando manipulado, o telefone exibe a mensagem dizendo que é a Sheila te ligando.
export class Telefone extends Objeto {
  #engine;
  constructor(engine) {
    super("telefone", "[tocando]", "[desligado]");
    this.#engine = engine;
  }

  manipular() {
    if (!this.acaoOk) {
      console.log(
        "Quem está te ligando é Sheila, sua vizinha e melhor amiga.\n" +
          "Ela te chamou para a casa dela e disse que tem um segredo para te contar."
      );
      // Muda para desligado
      this.acaoOk = true;
    } else {
      // Se o telefone já está desligado (acaoOk === true)
      console.log("O telefone está desligado.");
    }
    return true;
  }
}

export class Candelabro extends Objeto {
  constructor() {
    super("candelabro", "", "");
  }

  manipular() {
    console.log("Você balança o candelabro, nada acontece.");
    return false;
  }
}

export class Caveira extends Objeto {
  constructor() {
    super("caveira", "", "");
  }

  manipular() {
    console.log("A caveira parece te encarar... mas nada acontece.");
    return false;
  }
}

export class Correntes extends Objeto {
  constructor() {
    super("correntes", "", "");
  }

  manipular() {
    console.log("As correntes fazem barulho metálico, mas nada acontece.");
    return false;
  }
}

export class OssosDeRatos extends Objeto {
  constructor() {
    super("ossos_de_ratos", "", "");
  }

  manipular() {
    console.log(
      "Você ouve um barulho estranho ao tocar nos ossos... Melhor deixá-los onde estão."
    );
    return false;
  }
}

export class EstatuaMacabra extends Objeto {
  constructor() {
    super("estatua_macabra", "", "");
  }

  manipular() {
    console.log(
      "A estátua macabra emite uma sensação perturbadora. Nada mais."
    );
    return false;
  }
}

//Ao manipular o presente, o jogador adquire a "tatuagem_mickey" no inventário.
export class Presente_1 extends Objeto {
  #engine;
  #aberto;

  constructor(engine) {
    super("presente_1", "[fechado]", "[aberto]");
    validate(engine, "Object");
    this.#engine = engine;
    this.#aberto = false;
  }

  manipular() {
    if (!this.#engine.capitulo6Iniciado) {
      console.log(
        "Ainda não é véspera de Natal. Você não pode abrir o presente."
      );
      return false;
    }
    if (!this.#aberto) {
      console.log("Você abre o presente_1 e encontra uma tatuagem do Mickey!");
      const tatMickey = new TatuagemMickey(this.#engine);
      this.#engine.bolsa.guarda(tatMickey);

      this.#aberto = true;
      this.acaoOk = true;
    } else {
      console.log("O presente_1 já está aberto e vazio.");
    }
    return true;
  }
}

// Ao manipular, o jogador adquire a "caixinha" no inventário.
export class Presente_2 extends Objeto {
  #engine;
  #aberto;

  constructor(engine) {
    super("presente_2", "[fechado]", "[aberto]");
    validate(engine, "Object");
    this.#engine = engine;
    this.#aberto = false;
  }

  manipular() {
    if (!this.#engine.capitulo6Iniciado) {
      console.log(
        "Ainda não é véspera de Natal. Você não pode abrir o presente."
      );
      return false;
    }

    if (!this.#aberto) {
      console.log("Você abre o presente_2 e encontra uma caixinha!");
      const caixinha = new Caixinha(this.#engine);
      this.#engine.bolsa.guarda(caixinha);

      this.#aberto = true;
      this.acaoOk = true;
    } else {
      console.log("O presente_2 já está aberto e vazio.");
    }

    return true;
  }
}

export class Fogao extends Objeto {
  constructor() {
    super("fogao", "", "");
  }

  manipular() {
    console.log("Nada acontece.");
    return false;
  }
}

// A geladeira serve para pegar o tofu_frito.
export class Geladeira extends Objeto {
  #engine;
  #temTofu;

  constructor(engine) {
    super("geladeira", "", "");
    validate(engine, "Object");
    this.#engine = engine;
    // controla se ainda há tofu na geladeira
    this.#temTofu = true;
  }

  manipular() {
    if (this.#temTofu) {
      console.log("Você abre a geladeira e encontra um tofu frito.");
      const tofu = new TofuFrito();
      this.#engine.bolsa.guarda(tofu);
      this.#temTofu = false;
    } else {
      console.log("Não há mais nada delicioso dentro da geladeira.");
    }
    return true;
  }
}
