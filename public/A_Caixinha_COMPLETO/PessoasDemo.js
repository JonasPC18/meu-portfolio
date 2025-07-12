import { Pessoa } from "./Basicas.js";

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export class Irmao_do_Namorado extends Pessoa {
  constructor() {
    super(
      "irmao_do_namorado",
      '"Adoro fazer bagunça" diz o irmão do seu namorado.'
    );
  }
}

export class Namorado extends Pessoa {
  #contarFala;
  #engine;
  #entregouCola;

  constructor(engine) {
    super("namorado", ""); // a string está vazia pois precisamos controlar a fala manualmente
    this.#engine = engine;
    this.#contarFala = 0;
    this.#entregouCola = false;
  }

  // Aqui eu criei um sistema para que cada vez que o usuario falar com esse personagem, ocorra uma ação diferente.
  falar() {
    this.#contarFala++;

    // Se o jogador falar com o namorado pela primeira vez ele exibe essa mensagem:
    if (this.#contarFala === 1) {
      console.log(
        "Seu namorado diz que o irmão mais novo dele abriu os presentes de natal e quebrou tudo."
      );
      console.log(
        "Ele pede para você buscar cola superbonder para que ele possa colar os brinquedos."
      );

      // Aqui, se o jogador falar pela segunda ou + vezes, ele entrega a superbonder para o namorado e recebe outra mensagem.
    } else if (
      this.#contarFala > 1 &&
      this.#engine.bolsa.tem("cola_superbonder") &&
      !this.#entregouCola
    ) {
      // Remove a cola do inventário
      this.#engine.bolsa.removeItem("cola_superbonder");
      this.#entregouCola = true;

      console.log("Você entrega a cola superbonder para o seu namorado.");
      console.log(
        "Ele pede para você dar uma olhada no irmão dele, para prevenir que ele quebre mais coisas."
      );
      // depois de entregar a superbonder, quando ele fala novamente, somos enviados para o capítulo 3.
    } else if (this.#entregouCola) {
      this.#engine.capitulo3();
    } else {
      console.log('Seu namorado pergunta: "Onde está a cola superbonder?!"');
    }
  }
}

export class Sheila extends Pessoa {
  #engine;

  constructor(engine) {
    // a string  é vazia, pois vamos controlar a fala manualmente
    super("sheila", "");
    this.#engine = engine;
  }

  falar() {
    // Ao falar com a Sheila, o jogo avança para o capítulo 4
    this.#engine.capitulo4();
  }
}

export class Menino extends Pessoa {
  constructor() {
    super("menino", "Estou com fome, quero ratos!");
  }
}

export class Pai extends Pessoa {
  #engine;

  constructor(engine) {
    super("pai", "");
    this.#engine = engine;
  }

  falar() {
    if (this.#engine.capitulo6Iniciado) {
      console.log(
        '"Feliz natal! Lembre-se, eu sempre te protegerei, mesmo que isso signifique arriscar a minha própria vida.", diz o pai.'
      );
    } else {
      console.log(
        '"Sempre te protegerei de todos os males do mundo, filha", diz o pai.'
      );
    }
  }
}

export class Mae extends Pessoa {
  #engine;

  constructor(engine) {
    super("mae", "");
    this.#engine = engine;
  }

  falar() {
    if (this.#engine.capitulo6Iniciado) {
      console.log(
        '"Feliz natal minha filha! Espero que você goste dos presentes.", diz a mãe.'
      );
    } else {
      console.log(
        '"Muito cuidado ao sair na rua, ela está cheia de ratos!", diz a mãe.'
      );
    }
  }
}

export class Amigas extends Pessoa {
  constructor() {
    super("3_amigas", "");
  }

  // Sobrescreve o método falar() para termos mais falas
  falar() {
    console.log("Suas três amigas perceberam que você está caçando ratos.");
    prompt(">");
    console.log("Elas te apelidaram de 'Samantinha Nojentinha'.");
    prompt(">");
    console.log(
      "Você não deu bola. Já não precisa mais delas agora que tem um novo amigo."
    );
  }
}
