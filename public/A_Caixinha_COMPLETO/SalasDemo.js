import { validate } from "bycontract";
import { Sala, Engine } from "./Basicas.js";

import {
  Bau,
  Janela,
  Tapete,
  PinheiroDeNatal,
  BrinquedosQuebrados,
  Telefone,
  EstatuaMacabra,
  Candelabro,
  Caveira,
  OssosDeRatos,
  Correntes,
  Presente_1,
  Presente_2,
  Geladeira,
  Fogao,
} from "./ObjetosDemo.js";

import { ColaSuperbonder, Rato, Lanterna } from "./FerramentasDemo.js";

import {
  Irmao_do_Namorado,
  Namorado,
  Sheila,
  Menino,
  Pai,
  Mae,
  Amigas,
} from "./PessoasDemo.js";

// CAPITULO 1
export class Quarto extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("quarto", engine);

    const bau = new Bau(engine); // inicia fechado
    const janela = new Janela();
    const tapete = new Tapete(engine);

    this.objetos.set(bau.nome, bau);
    this.objetos.set(janela.nome, janela);
    this.objetos.set(tapete.nome, tapete);
  }
}

// CAPITULO 2
export class Sala_Namorado extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("sala_namorado", engine);

    // Pessoas
    const irmao = new Irmao_do_Namorado();
    this.pessoas.set(irmao.nome, irmao);

    // Objetos
    const pinheiro = new PinheiroDeNatal();
    const brinquedos = new BrinquedosQuebrados();
    this.objetos.set(pinheiro.nome, pinheiro);
    this.objetos.set(brinquedos.nome, brinquedos);

    // Ferramentas
    const superbonder = new ColaSuperbonder();
    this.ferramentas.set(superbonder.nome, superbonder);
  }
}

export class Cozinha_Namorado extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("cozinha_namorado", engine);

    // Pessoas
    const namorado = new Namorado(engine);
    this.pessoas.set(namorado.nome, namorado);

    // Objetos
    const brinquedos = new BrinquedosQuebrados();
    this.objetos.set(brinquedos.nome, brinquedos);
  }
}

//CAPITULO 3
export class Casa_Samanta extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("casa_samanta", engine);

    // Objetos
    const telefone = new Telefone();
    this.objetos.set(telefone.nome, telefone);
  }
}

export class Rua_1 extends Sala {
  #telefoneRef;

  constructor(engine, telefoneRef) {
    super("rua_1", engine);
    // aqui uma referência ao telefone, para checar se está tocando
    this.#telefoneRef = telefoneRef;

    // Ferramentas
    const rato = new Rato();
    this.ferramentas.set(rato.nome, rato);
  }

  entra(porta) {
    // Se o jogador quer entrar em Casa_Sheila mas o telefone ainda está tocando...
    if (porta === "casa_sheila" && !this.#telefoneRef.acaoOk) {
      console.log(
        "Você não pode ir para a casa_sheila enquanto o telefone ainda está tocando!"
      );
      return null; // impede a entrada
    }

    return super.entra(porta);
  }
}

export class Casa_Sheila extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("casa_sheila", engine);

    // Pessoas
    const sheila = new Sheila(engine);
    this.pessoas.set(sheila.nome, sheila);
  }
}

//CAPITULO 4
export class HallCasarao extends Sala {
  #engine;

  constructor(engine) {
    validate(engine, "Object");
    super("hall_casarao", engine);

    this.#engine = engine;

    const estatua = new EstatuaMacabra();
    this.objetos.set(estatua.nome, estatua);

    const lanterna = new Lanterna(engine);
    this.ferramentas.set(lanterna.nome, lanterna);
  }

  // Sobrescrevemos o metodo entra(porta) para restringir a saída, caso a lanterna esteja desligada
  entra(porta) {
    // Se a lanternaBat < 0, significa que a lanterna não está ligada.
    if (this.#engine.lanternaBat < 0) {
      console.log(
        "Está escuro demais para prosseguir. Você precisa ligar a lanterna primeiro."
      );
      return null;
    }

    // Caso a lanterna esteja ligada, permite sair normalmente
    return super.entra(porta);
  }
}

export class SalaCasarao extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("sala_casarao", engine);

    const candelabro = new Candelabro();
    this.objetos.set(candelabro.nome, candelabro);

    const caveira = new Caveira();
    this.objetos.set(caveira.nome, caveira);
  }
}

export class QuartoCasarao extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("quarto_casarao", engine);

    const ossos = new OssosDeRatos();
    this.objetos.set(ossos.nome, ossos);
  }
}

export class PoraoCasarao extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("porao_casarao", engine);

    const ossos = new OssosDeRatos();
    this.objetos.set(ossos.nome, ossos);

    const correntes = new Correntes();
    this.objetos.set(correntes.nome, correntes);

    const menino = new Menino();
    this.pessoas.set(menino.nome, menino);

    // Aqui eu sobrescrevo o método falar() do menino. Assim, ao falar com ele nesse cenário, vai chamar o capítulo 5
    menino.falar = () => {
      engine.capitulo5();
    };
  }
}

export class Porao extends Sala {
  constructor(engine) {
    super("porao", engine);

    // Objetos
    const correntes = new Correntes();
    this.objetos.set(correntes.nome, correntes);

    this.conversouComMenino = false; // flag para ver se ja falamos com o menino. só podemos sair da sala após falar com o menino.

    const menino = new Menino();

    menino.falar = () => {
      // Marca que o jogador já conversou com ele
      this.falouComMenino = true;
      // Se ainda não estamos no capítulo 6 e o jogador tem "rato", inicia o 6
      if (!engine.capitulo6Iniciado && engine.bolsa.tem("rato")) {
        engine.capitulo6();
      }
      // Se já estivermos no capítulo 6, chama epílogo
      else if (engine.capitulo6Iniciado) {
        engine.epilogo();
      }
      // Caso contrário, ele só diz a frase-padrão.
      else {
        console.log("Estou com fome, quero ratos!");
      }
    };

    this.pessoas.set(menino.nome, menino);
  }

  // Bloqueamos a saída para sala_de_estar, se ainda não falou com o menino
  entra(porta) {
    if (porta === "sala_de_estar" && !this.falouComMenino) {
      console.log(
        "Você vai sair do porão quando ouve o menino emitir som. Ele quer falar com você"
      );
      return null; // impede a saída
    }

    //  Se o capítulo 6 foi iniciado, a porta do porão está trancada. Ela Só abre se tivermos o tofu_frito na bolsa.
    if (porta === "sala_de_estar" && this.engine.capitulo6Iniciado) {
      if (!this.engine.bolsa.tem("tofu_frito")) {
        console.log("Acho melhor você levar uma comida pro Tobias.");
        return null;
      }
    }

    return super.entra(porta);
  }
}

export class SalaDeEstar extends Sala {
  constructor(engine) {
    super("sala_de_estar", engine);

    const pinheiro = new PinheiroDeNatal();
    this.objetos.set(pinheiro.nome, pinheiro);

    // As pessoas e objetos seguintes contém a engine pois mudam de comportamento conforme muda de capítulo.
    const presente1 = new Presente_1(engine);
    this.objetos.set(presente1.nome, presente1);

    const presente2 = new Presente_2(engine);
    this.objetos.set(presente2.nome, presente2);

    const pai = new Pai(engine);
    this.pessoas.set(pai.nome, pai);

    const mae = new Mae(engine);
    this.pessoas.set(mae.nome, mae);
  }
  entra(porta) {
    if (porta === "porao") {
      // Se estivermos no capítulo 6, é necessário o tofu_frito para entrar no poão
      if (this.engine.capitulo6Iniciado) {
        if (!this.engine.bolsa.tem("tofu_frito")) {
          console.log(
            "Melhor não entrar no porão sem levar comida para o Tobias"
          );
          return null;
        }
      }
    }

    // Para caso o jogador tente entrar na cozinha antes de ter aberto os presentes e usado a tatuagem do mickey.
    if (porta === "cozinha") {
      // verificamos se ja chegamos no capitulo 6
      if (this.engine.capitulo6Iniciado) {
        // aqui verificamos se o jogador já usou tatuagem e pegou a caixinha
        if (this.engine.tatuagemUsada && this.engine.bolsa.tem("caixinha")) {
          return super.entra(porta);
        } else {
          console.log(
            "Você está muito ansiosa para abrir seus presentes. " +
              "Melhor abri-los e usá-los antes de entrar na cozinha."
          );
          return null;
        }
      }
      // Seo usuário ainda não chegou no cap.6.
      if (!this.engine.capitulo6Iniciado) {
        console.log("A cozinha está trancada! Você não consegue entrar agora.");
        return null;
      }
    }

    // Se o capítulo 6 foi iniciado, tranca a passagem para rua_2
    if (porta === "rua_2" && this.engine.capitulo6Iniciado) {
      console.log("A porta que leva a rua_2 está trancada!");
      return null;
    }

    return super.entra(porta);
  }
}

export class Rua_2 extends Sala {
  constructor(engine) {
    super("rua_2", engine);

    // Ferramentas
    const rato = new Rato();
    this.ferramentas.set(rato.nome, rato);

    // Pessoas
    const amigas = new Amigas();
    this.pessoas.set(amigas.nome, amigas);
  }
}

export class Cozinha extends Sala {
  constructor(engine) {
    super("cozinha", engine);

    // Objetos
    const geladeira = new Geladeira(engine);
    this.objetos.set(geladeira.nome, geladeira);

    const fogao = new Fogao();
    this.objetos.set(fogao.nome, fogao);
  }
}
