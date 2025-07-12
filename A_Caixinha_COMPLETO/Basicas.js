import { validate } from "bycontract";
import promptsync from "prompt-sync";

const prompt = promptsync({ sigint: true });

// A classe Bolsa é semelhante à classe mochila disponibilizada pelo professor, mas adicionei os metodos limpaBolsa e removeItem
export class Bolsa {
  #ferramentas;
  #capacidadeMaxima;

  constructor() {
    this.#ferramentas = [];
    this.#capacidadeMaxima = 3; // Definindo a capacidade máxima como 3
  }

  guarda(ferramenta) {
    validate(ferramenta, Ferramenta);

    // Verifica se a bolsa já está com 3 itens
    if (this.#ferramentas.length >= this.#capacidadeMaxima) {
      console.log("Você não consegue carregar mais itens! A bolsa está cheia.");
      return;
    }

    this.#ferramentas.push(ferramenta);
    console.log(
      `${ferramenta.nome} adquirido(a). Agora você tem ${
        this.#ferramentas.length
      } item(ns) na bolsa.`
    );
  }

  pega(nomeFerramenta) {
    validate(nomeFerramenta, "String");
    return this.#ferramentas.find((f) => f.nome === nomeFerramenta);
  }

  tem(nomeFerramenta) {
    validate(nomeFerramenta, "String");
    return this.#ferramentas.some((f) => f.nome === nomeFerramenta);
  }

  inventario() {
    return this.#ferramentas.map((obj) => obj.nome).join(", ");
  }

  // Adicionei o metodo limpaBolsa para limpar o inventario quando for necessário para a história (como mudanças de capítulo, por exemplo)
  limpaBolsa() {
    this.#ferramentas = [];
  }

  // Esse método de remover item foi adicionado para que possamos remover um item específico do inventario.
  // Por exemplo, se a personagem utiliza um item "perecível", esse método será acionado
  removeItem(nomeFerramenta) {
    let index = this.#ferramentas.findIndex((f) => f.nome === nomeFerramenta);
    if (index >= 0) {
      const removido = this.#ferramentas.splice(index, 1)[0];
      return removido;
    }
    return null;
  }
}

// ---------------------------------------------
export class Ferramenta {
  #nome;

  constructor(nome) {
    validate(nome, "String");
    this.#nome = nome;
  }

  get nome() {
    return this.#nome;
  }

  usar() {
    return true;
  }
}

// ---------------------------------------------
export class Objeto {
  #nome;
  #descricaoAntesAcao;
  #descricaoDepoisAcao;
  #acaoOk;

  // modifiquei para validar um por um
  constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
    validate(nome, "String");
    validate(descricaoAntesAcao, "String");
    validate(descricaoDepoisAcao, "String");
    this.#nome = nome;
    this.#descricaoAntesAcao = descricaoAntesAcao;
    this.#descricaoDepoisAcao = descricaoDepoisAcao;
    this.#acaoOk = false;
  }

  get nome() {
    return this.#nome;
  }

  get acaoOk() {
    return this.#acaoOk;
  }

  set acaoOk(acaoOk) {
    validate(acaoOk, "Boolean");
    this.#acaoOk = acaoOk;
  }

  get descricao() {
    return this.#acaoOk ? this.#descricaoDepoisAcao : this.#descricaoAntesAcao;
  }

  usar(ferramenta) {
    validate(ferramenta, Ferramenta);
    return false;
  }

  // Criei esse método para o usuário interagir diretamente com o objeto
  manipular() {
    return false;
  }
}

// ---------------------------------------------
// Criei a classe Pessoa para adicionar os "NPCs" do jogo
export class Pessoa {
  #nome;
  #fala;

  constructor(nome, fala) {
    this.#nome = nome;
    this.#fala = fala;
  }

  get nome() {
    return this.#nome;
  }

  falar() {
    console.log(this.#fala);
  }
}

// ---------------------------------------------
export class Sala {
  #nome;
  #objetos;
  #ferramentas;
  #portas;
  #engine;
  #pessoas; // atributo adicionado

  constructor(nome, engine) {
    validate(nome, "String");
    validate(engine, Engine);
    this.#nome = nome;
    this.#objetos = new Map();
    this.#ferramentas = new Map();
    this.#portas = new Map();
    this.#engine = engine;
    this.#pessoas = new Map(); // atributo adicionado
  }

  get nome() {
    return this.#nome;
  }

  get objetos() {
    return this.#objetos;
  }

  get ferramentas() {
    return this.#ferramentas;
  }

  get portas() {
    return this.#portas;
  }

  get engine() {
    return this.#engine;
  }

  // getter adicionado
  get pessoas() {
    return this.#pessoas;
  }

  objetosDisponiveis() {
    return [...this.#objetos.values()].map(
      (obj) => `${obj.nome} ${obj.descricao}`
    );
  }

  ferramentasDisponiveis() {
    return [...this.#ferramentas.values()].map((f) => f.nome);
  }

  portasDisponiveis() {
    return [...this.#portas.values()].map((sala) => sala.nome);
  }

  pega(nomeFerramenta) {
    validate(nomeFerramenta, "String");
    let ferramenta = this.#ferramentas.get(nomeFerramenta);
    if (ferramenta) {
      this.#engine.bolsa.guarda(ferramenta);
      this.#ferramentas.delete(nomeFerramenta);
      return true;
    }
    return false;
  }

  //Mudei de "sai" para "entra" pois acho que faz mais sentido.
  entra(porta) {
    validate(porta, "String");
    return this.#portas.get(porta);
  }

  // Fiz algumas modificações nesse método, em relação a formatação.
  // Também adicionei o item "pessoas".
  textoDescricao() {
    return (
      `Você está em ${this.#nome}\n` +
      (this.#objetos.size > 0
        ? `Objetos: ${this.objetosDisponiveis().join(", ")}\n`
        : "Objetos: [não há objetos na sala]\n") +
      (this.#ferramentas.size > 0
        ? `Ferramentas: ${this.ferramentasDisponiveis().join(", ")}\n`
        : "Ferramentas: [não há ferramentas na sala]\n") +
      (this.#pessoas.size > 0
        ? `Pessoas: ${[...this.#pessoas.keys()].join(", ")}\n`
        : "Pessoas: [não há ninguém além de você na sala]\n") +
      (this.#portas.size > 0
        ? `Portas: ${this.portasDisponiveis().join(", ")}\n`
        : "Portas: [todas as portas estão trancadas]\n") +
      "-------------------------"
    );
  }
}

// ---------------------------------------------
// Aqui algumas coisas foram alteradas, principalmente no método joga.
// Também deletei o método criaCenario, pois os métodos de criar cenário estarão na subclasse JogoDemo.
export class Engine {
  #bolsa;
  #salaCorrente;
  #fim;

  constructor() {
    this.#bolsa = new Bolsa();
    this.#salaCorrente = null;
    this.#fim = false;

    this.lanternaBat = -1; // esse atributo serve para contar a bateria da ferramenta "lanterna". -1 significa que ela está desligada.
  }

  get bolsa() {
    return this.#bolsa;
  }

  get salaCorrente() {
    return this.#salaCorrente;
  }

  set salaCorrente(sala) {
    validate(sala, Sala);
    this.#salaCorrente = sala;
  }

  indicaFimDeJogo() {
    this.#fim = true;
  }

  // fiz algumas alterações nos textos das strings, adicionei a ação "manipular"
  joga() {
    let novaSala = null;
    while (!this.#fim) {
      console.log("-------------------------");
      console.log(this.salaCorrente.textoDescricao());
      let acao = prompt("O que você deseja fazer? ");
      let tokens = acao.split(" ");

      switch (tokens[0]) {
        case "fim":
          this.#fim = true;
          break;
        case "pegar":
          if (tokens[1] && this.salaCorrente.pega(tokens[1])) {
          } else {
            console.log(
              `Objeto ${tokens[1] || "desconhecido"} não encontrado.`
            );
          }
          break;
        case "inventario":
          console.log(`Ferramentas disponíveis: ${this.#bolsa.inventario()}`);
          break;

        // modifiquei a ação "usar" para que seja possível tanto usar a ferramenta em objetos quanto apenas usar a ferramenta por si só.
        // o usuário também não precisa digitar o nome do objeto, basta ele usa-lo na sala em que o objeto está.
        case "usar":
          if (tokens[1]) {
            let ferramenta = this.#bolsa.pega(tokens[1]);
            if (ferramenta) {
              let usado = false;
              for (const [
                nomeObj,
                obj,
              ] of this.salaCorrente.objetos.entries()) {
                if (obj.usar(ferramenta)) {
                  usado = true;
                }
              }
              // Se não foi usado em nenhum objeto da sala, tenta usar a própria ferramenta
              if (!usado) {
                // Chama ferramenta.usar(). Se retornar true, tudo certo. senão exibe a mensagem padrão
                if (ferramenta.usar()) {
                  usado = true;
                } else {
                  console.log(
                    `Não há onde usar ${ferramenta.nome} nesta sala.`
                  );
                }
              }
            } else {
              console.log(`Você não tem ${tokens[1]} no seu inventário.`);
            }
          } else {
            console.log("Especifique o que deseja usar.");
          }
          break;

        case "entrar":
          if (tokens[1]) {
            novaSala = this.salaCorrente.entra(tokens[1]);
            if (novaSala) {
              this.#salaCorrente = novaSala;

              // esse mecanismo serve para contarmos a bateria da ferramenta "Lanterna" no casarao
              if (this.#salaCorrente.nome.includes("casarao"))
                if (this.lanternaBat >= 0) {
                  this.lanternaBat--;
                  if (this.lanternaBat < 0) {
                    console.log("A bateria da lanterna acabou.");
                    console.log("Você fica no escuro total e perde o jogo!");
                    this.indicaFimDeJogo();
                  } else {
                    console.log(
                      "A lanterna consumiu 1 carga. Restam " +
                        this.lanternaBat +
                        " trocas de sala."
                    );
                  }
                } else {
                  console.log("Sala desconhecida...");
                }
            }
            break;
          }
        // item adicionado para falar com os NPCs.
        case "falar":
          if (tokens[1]) {
            const pessoa = this.#salaCorrente.pessoas.get(tokens[1]);
            if (pessoa) {
              pessoa.falar();
            } else {
              console.log(`Não há ninguém chamado ${tokens[1]} nesta sala.`);
            }
          } else {
            console.log("Especifique com quem deseja falar.");
          }
          break;

        // adicionado para manipular os objetos
        case "manipular":
          if (tokens[1]) {
            let objeto = this.salaCorrente.objetos.get(tokens[1]);
            if (objeto) {
              let resultado = objeto.manipular();
            } else {
              console.log(`Não há objeto chamado '${tokens[1]}' nesta sala.`);
            }
          } else {
            console.log("Especifique o que deseja manipular.");
          }
          break;

        default:
          console.log(`Comando desconhecido: ${tokens[0]}`);
          break;
      }
      // esse prompt é para o jogador precisar apertar enter novamente.
      // isso faz o loop ficar um pouco menos fluído, mas deixa menos confuso.
      prompt(">");
    }
    console.log("Jogo encerrado!");
  }
}
