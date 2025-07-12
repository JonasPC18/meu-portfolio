import { validate } from "bycontract";
import { Ferramenta, Engine } from "./Basicas.js";

import promptsync from "prompt-sync";
const prompt = promptsync({ sigint: true });

// quem decide "abrir" algum objeto é o método usar do próprio objeto.
// por enquanto o unico objeto aberto por chave é o bau
export class Chave extends Ferramenta {
  constructor() {
    super("chave");
  }

  usar() {
    return true;
  }
}

export class Caixinha extends Ferramenta {
  // recebe a instância do Engine no construtor
  constructor(engine) {
    super("caixinha");
    this.engine = engine; // guarda referência
  }

  usar() {
    // Se estivermos no capitulo 6
    if (this.engine.capitulo6Iniciado) {
      console.log(
        "Você acha essa caixinha muito legal. O que será que você pode colocar dentro dela?"
      );
      return true;
    }

    // aqui chamamos o capitulo2() do JogoDemo.
    if (this.engine && typeof this.engine.capitulo2 === "function") {
      this.engine.capitulo2();
    }

    return true;
  }
}

// nada acontece se a cola superbonder for usada, ela só serve para ser entregue ao personagem "namorado"
export class ColaSuperbonder extends Ferramenta {
  constructor() {
    super("cola_superbonder");
  }

  usar() {
    return false;
  }
}

// Nada acontece quando o rato é usado. No futuro talvez eu acrescente algo nessa classe, pois ela aparecerá em capítulos futuros também.
export class Rato extends Ferramenta {
  constructor() {
    super("rato");
  }

  usar() {
    return false;
  }
}

export class Lanterna extends Ferramenta {
  #engine;

  constructor(engine) {
    super("lanterna");
    this.#engine = engine;
  }

  usar() {
    // Se a lanterna não estiver ativa (lanternaCharge < 0),
    // ligamos a lanterna e definimos 2 trocas de sala restantes
    if (this.#engine.lanternaBat < 0) {
      this.#engine.lanternaBat = 2;
      console.log("Você ligou a lanterna. Ela durará por 2 trocas de sala!");
      return true;
    } else {
      console.log("A lanterna já está ligada ou ainda tem bateria.");
      return false;
    }
  }
}

// Nada acontece se o tofu_frito for utilizado
export class TofuFrito extends Ferramenta {
  constructor() {
    super("tofu_frito");
  }

  usar() {
    return false;
  }
}

// A tatuagem do mickey, se utilizada, é removida do inventário e o usuário recebe a mensagem de que a tatuagem foi utilizada.
export class TatuagemMickey extends Ferramenta {
  constructor(engine) {
    super("tatuagem_mickey");
    validate(engine, Engine);
    this.engine = engine;
  }

  usar() {
    console.log("Você usou a tatuagem temporária do Mickey no seu tornozelo.");
    this.engine.tatuagemUsada = true;
    this.engine.bolsa.removeItem("tatuagem_mickey");
    return true;
  }
}
