import { Engine } from "./Basicas.js";
import {
  Quarto,
  Sala_Namorado,
  Cozinha_Namorado,
  Casa_Samanta,
  Rua_1,
  Casa_Sheila,
  HallCasarao,
  SalaCasarao,
  QuartoCasarao,
  PoraoCasarao,
  Porao,
  SalaDeEstar,
  Rua_2,
  Cozinha,
} from "./SalasDemo.js";

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

// Em vez de somente criar um método "criaCenário" eu decidi criar diversos métodos para cada cenário do jogo.
// Também criei um método para cada capítulo do jogo.

export class JogoDemo extends Engine {
  constructor() {
    super();
    this.capitulo6Iniciado = false; // como o capitulo 5 e o 6 ocorrem no mesmo cenário, é preciso esse atributo para mudarmos os itens que precisam ser mudados na troca de capítulos
    this.tatuagemUsada = false; // a cozinha só abre se a tatuagem for utilizada. Isso é necessário para avançar o jogo.
  }

  prologo() {
    console.log("Dentro da caixinha tem uma coisa muito misteriosa.");
    prompt(">"); // Esse prompt serve simplesmente para o jogador ter que apertar enter antes de ler a próxima frase.
    console.log("O que será que tem dentro da caixinha?");
    prompt(">");
    console.log('"Não sei", disse Margaret.');
    prompt(">");
    console.log('"Não faço a menor ideia", disse Bruno.');
    prompt(">");
    console.log('"Eu acho que tem um monte de cabelo", palpita Tony Ramos.');
    prompt(">");
    console.log("E você... sabe o que tem dentro da caixinha?");

    const resposta = prompt(
      "Escreva o que você acha que tem dentro da caixinha: "
    );

    if (
      resposta.toLowerCase() === "casquinha_de_ferida" ||
      resposta.toLowerCase() === "casquinha de ferida"
    ) {
      console.log("Parabéns, você acertou! Você venceu o jogo.");
      this.indicaFimDeJogo();
    } else {
      // Caso ainda não tenhamos chego ao cap.6, segue a história normal.
      if (!this.capitulo6Iniciado) {
        console.log("Você errou...");
        prompt(">");
        this.capitulo1();
      }
      // Caso já estejamos no fim do jogo, fica num loop até acertar.
      else {
        console.log("Você errou. Tente novamente...");
        prompt(">");
        this.prologo();
      }
    }
  }

  capitulo1() {
    console.log(
      "-------------------------\nCAPÍTULO 1\n-------------------------"
    );
    prompt(">");
    console.log("Hoje você sonhou com a caixinha.");
    prompt(">");
    console.log("Você não lembra o que tem dentro dela.");
    prompt(">");
    console.log(
      "Você resolveu visitar a casa dos seus pais. É lá que está a caixinha."
    );
    prompt(">");
    console.log("Sua mãe a recebe, diz que vai preparar uma janta para vocês.");
    prompt(">");
    console.log("Você diz que quer pegar umas coisas no seu quarto.");
    prompt(">");
    console.log(
      "Sua mãe diz para você que seu quarto está exatamente como você deixou quando foi morar sozinha, há 3 meses atrás."
    );
    prompt(">");

    // Aqui é onde eu aciono o método que cria o primeiro cenário do jogo
    this.criaCenario1();
  }

  capitulo2() {
    console.log(
      "Ao abrir a caixinha, o que você encontrou te despertou uma estranha sensação de violência e náusea."
    );
    prompt(">");
    console.log("Você fica tonta e começa a ter visões sinistras.");
    prompt(">");
    console.log("Você vê pegadas de um cachorro louco no tapete do quarto.");
    prompt(">");
    console.log("Você vê um sorriso com dentes afiados.");
    prompt(">");
    console.log("Então você desmaia.");
    prompt(">");
    console.log(
      "-------------------------\nCAPÍTULO 2\n-------------------------"
    );
    prompt(">");
    console.log('"Samanta, Samanta, Samanta!"');
    prompt(">");
    console.log("Você acorda com sua mãe te chamando.");
    prompt(">");
    console.log("Ela pergunta o que aconteceu, mas você não sabe responder.");
    prompt(">");
    console.log(
      "A última coisa que você se lembra é da caixinha, mas não consegue lembrar o que tinha dentro dela."
    );
    prompt(">");
    console.log(
      "Você olha para o chão e vê a caixinha aberta, porém ela está vazia."
    );
    prompt(">");
    console.log("Está ventando na rua.");
    prompt(">");
    console.log(
      "Você conclui que a coisa que estava dentro da caixinha era tão leve que voou pela janela."
    );
    prompt(">");
    console.log(
      "Algumas semanas se passaram e o natal chegou. Você ainda não lembra o que tinha dentro da caixinha."
    );
    prompt(">");
    console.log("Você decidiu passar o natal com a família do seu namorado.");

    this.bolsa.limpaBolsa(); //Nesse memento do jogo o inventario precisa ser limpo, pois os itens coletados no primeiro cenário não serão mais relevantes.

    this.criaCenario2();
  }

  capitulo3() {
    console.log("Você encontra o seu namorado chorando na cozinha.");
    prompt(">");
    console.log(
      "Enquanto colava os brinquedos, os dedos do seu namorado ficaram ásperos com casca de cola."
    );
    prompt(">");
    console.log(
      "Como ele sabia que você não gosta de homens com mãos ásperas, ele arrancou as cascas dos dedos."
    );
    prompt(">");
    console.log("Você percebe que os dedos do seu namorado estão sangrando.");
    prompt(">");
    console.log(
      "Neste momento, a imagem da coisa que tinha dentro da caixinha começa a surgir na sua mente..."
    );
    prompt(">");
    console.log(
      '...mas é abruptamente interrompida pela chegada do papai noel - "Ho ho ho!".'
    );
    prompt(">");
    console.log(
      "-------------------------\nCAPÍTULO 3\n-------------------------"
    );
    prompt(">");
    console.log(
      "Depois do natal você começou a achar que estava ficando louca."
    );
    prompt(">");
    console.log(
      "Você simplesmente não conseguia se lembrar o que tinha dentro da caixinha."
    );
    prompt(">");
    console.log(
      "Seu namorado dizia que você precisa se distrair, pensar em outras coisas."
    );
    prompt(">");
    console.log('"Tenta ler um livro", dizia ele.');
    prompt(">");
    console.log("Mas você não conseguia parar de pensar na caixinha.");
    prompt(">");
    console.log("Porém, numa noite chuvosa, algo aconteceu.");

    this.criaCenario3();
  }

  capitulo4() {
    console.log("Você pede para Sheila te contar o segredo.");
    prompt(">");
    console.log('"Vou te mostrar uma coisa", diz Sheila.');
    prompt(">");
    console.log("Ela te mostra algo na virilha.");
    prompt(">");
    console.log(
      "Você não enxerga direito, então aperta os olhos para ver melhor."
    );
    prompt(">");
    console.log("Ela tem 3 pontinhos pretos na virilha.");
    prompt(">");
    console.log("Você percebe que é uma tatuagem do Mickey Mouse.");
    prompt(">");
    console.log(
      "Então, subitamente, você lembra o que tinha dentro da caixinha."
    );
    prompt(">");
    console.log(
      "-------------------------\nCAPÍTULO 4\n-------------------------"
    );
    prompt(">");
    console.log(
      "Quando você era criança, o seu apelido era 'Samantinha Mijoninha'."
    );
    prompt(">");
    console.log(
      "Suas três amigas a chamavam assim porque você tinha medo de praticamente tudo."
    );
    prompt(">");
    console.log("Você tinha medo de cachorro...");
    prompt(">");
    console.log("Você tinha medo de dormir no escuro...");
    prompt(">");
    console.log(
      "Mas a coisa que mais te dava medo era o casarão abandonado que havia no seu bairro."
    );
    prompt(">");
    console.log(
      "Sempre que você passava na frente do casarão, você ouvia a voz de alguém chorando."
    );
    prompt(">");
    console.log(
      'Entretanto, um dia você cansou de ser chamada de "Samantinha Mijoninha".'
    );
    prompt(">");
    console.log(
      "Você perguntou para as suas três amigas o que você poderia fazer para que parassem de te chamar assim."
    );
    prompt(">");
    console.log(
      "Elas disseram que você deveria passar uma noite dentro do casarão abandonado."
    );
    prompt(">");
    console.log("Inicialmente você recusou o desafio.");
    prompt(">");
    console.log(
      "Mas após rezar 7 ave-marias, você ficou corajosa o suficiente para fugir de casa e invadir o casarão abandonado."
    );

    this.bolsa.limpaBolsa();
    this.criaCenario4();
  }

  capitulo5() {
    console.log(
      "-------------------------\nCAPÍTULO 5\n-------------------------"
    );
    prompt(">");
    console.log("Você encontrou um menino com o pescoço acorrentado.");
    prompt(">");
    console.log(
      "Quando você chegou perto do menino, percebeu que havia sangue em sua boca."
    );
    prompt(">");
    console.log(
      "Mesmo assim, sentou ao lado do menino e passou a noite toda conversando com ele."
    );
    prompt(">");
    console.log(
      "Ele te contou que seus pais haviam o abandonado ele sobrevivia comendo os ratos que encontrava no chão."
    );
    prompt(">");
    console.log(
      "Você gostou tanto do menino que o apelidou de Tobias e levou para sua própria casa."
    );
    prompt(">");
    console.log(
      "Você escondeu ele no porão, para que o seu pai não ficasse bravo."
    );

    this.bolsa.limpaBolsa();
    this.criaCenario5();
  }

  capitulo6() {
    this.capitulo6Iniciado = true; //para alterar os itens que mudaram do capítulo 5 para o 6.
    console.log(
      "Você passou semanas caçando ratos para alimentar Tobias, até que acabou pegando uma infecção."
    );
    prompt(">");
    console.log(
      "Sua mãe descobriu que você andava mexendo com ratos e te proibiu de sair de casa."
    );
    prompt(">");
    console.log(
      "Então você tentou alimentar Tobias com outras coisas, como danoninho ou chocolate branco."
    );
    prompt(">");
    console.log(
      "Mas ele simplesmente recusava qualquer coisa que não fosse ratos."
    );
    prompt(">");
    console.log("Por isso Tobias foi ficando faminto...");
    prompt(">");
    console.log("...e louco.");
    prompt(">");
    console.log(
      "-------------------------\nCAPÍTULO 6\n-------------------------"
    );
    prompt(">");
    console.log("Alguns dias se passaram.");
    prompt(">");
    console.log("Tobias foi se acalmando... ficando dócil...");
    prompt(">");
    console.log(
      "Ele aprendeu a comer outras coisas e agora se alimentava principalmente de tofu frito."
    );
    prompt(">");
    console.log("Então chegou a véspera de Natal.");
    prompt(">");
    console.log(
      "Você estava muito empolgada pois finalmente foi autorizada a abrir seus presentes de natal."
    );
    this.bolsa.limpaBolsa();
    this.criaCenario5();
  }

  epilogo() {
    console.log("Você deu o tofu_frito para o menino.");
    prompt(">");
    console.log(
      "Enquanto Tobias comia o Tofu frito, ele percebeu a sua tatuagem no tornozelo."
    );
    prompt(">");
    console.log("Então Tobias ficou louco.");
    prompt(">");
    console.log(
      "Tamanha foi sua fúria que ele rompeu a corrente e avançou na sua perna, mordendo-a com força."
    );
    prompt(">");
    console.log("Você não conseguiu segurar o choro.");
    prompt(">");
    console.log("Seu pai, que estava na sala, escutou o seu grito de pavor.");
    prompt(">");
    console.log(
      "Ele desceu até o porão e encontrou um cachorro enorme mordendo sua perna."
    );
    prompt(">");
    console.log("Então ele pegou seu revolver calibre 38...");
    prompt(">");
    console.log("... e violentamente executou o cachorro.");
    prompt(">");
    console.log(
      "-------------------------\nEPÍLOGO\n-------------------------"
    );
    prompt(">");
    console.log(
      "Alguns dias se passaram e seu machucado no tornozelo cicatrizou."
    );
    prompt(">");
    console.log(
      "Como lembrança do ocorrido, ficou só uma casquinha de sangue seco grudada na sua ferida."
    );
    prompt(">");
    console.log("Você resolveu arrancar a casquinha de sua ferida.");
    prompt(">");
    console.log(
      "E então, você colocou a casquinha de ferida dentro da caixinha para nunca mais esquecer do seu amigo Tobias."
    );
    prompt(">");
    console.log("--------------------------------------------------");
    prompt(">");
    this.prologo();
  }

  // Aqui no geral eu mantive a estrutura do método criaCenário disponibilizado pelo professor, mas desmembrei em diferentes métodos para cada cenário.
  criaCenario1() {
    let quarto = new Quarto(this);
    this.salaCorrente = quarto; //
  }

  criaCenario2() {
    let salaNamorado = new Sala_Namorado(this);
    let cozinhaNamorado = new Cozinha_Namorado(this);

    salaNamorado.portas.set(cozinhaNamorado.nome, cozinhaNamorado);
    cozinhaNamorado.portas.set(salaNamorado.nome, salaNamorado);

    this.salaCorrente = salaNamorado;
  }

  criaCenario3() {
    let casaSamanta = new Casa_Samanta(this);

    // Nesse cenário temos a especificidade de que a Casa_Sheila só pode ser liberada após o jogador atender o telefone.
    // Aqui temoso telefone criado dentro de Casa_Samanta
    let telefoneObj = casaSamanta.objetos.get("telefone");

    // Passamos essa referência ao construir Rua_1
    let rua1 = new Rua_1(this, telefoneObj);

    let casaSheila = new Casa_Sheila(this);

    casaSamanta.portas.set(rua1.nome, rua1);
    rua1.portas.set(casaSamanta.nome, casaSamanta);

    rua1.portas.set(casaSheila.nome, casaSheila);
    casaSheila.portas.set(rua1.nome, rua1);

    this.salaCorrente = casaSamanta;
  }

  criaCenario4() {
    // Cria as salas
    let hall = new HallCasarao(this);
    let sala = new SalaCasarao(this);
    let quarto = new QuartoCasarao(this);
    let porao = new PoraoCasarao(this);

    // Conecta as portas
    hall.portas.set(sala.nome, sala);

    sala.portas.set(hall.nome, hall);
    sala.portas.set(quarto.nome, quarto);
    sala.portas.set(porao.nome, porao);

    quarto.portas.set(sala.nome, sala);

    porao.portas.set(sala.nome, sala);

    // Define a sala inicial do cenário 4
    this.salaCorrente = hall;
  }

  criaCenario5() {
    let porao = new Porao(this);
    let salaDeEstar = new SalaDeEstar(this);
    let rua2 = new Rua_2(this);
    let cozinha = new Cozinha(this);

    // Conexão das portas:
    porao.portas.set(salaDeEstar.nome, salaDeEstar);
    salaDeEstar.portas.set(porao.nome, porao);

    salaDeEstar.portas.set(rua2.nome, rua2);
    rua2.portas.set(salaDeEstar.nome, salaDeEstar);

    salaDeEstar.portas.set(cozinha.nome, cozinha);
    cozinha.portas.set(salaDeEstar.nome, salaDeEstar);

    // caso estivermos no capítulo 6, o jogo começa na saladeestar
    if (this.capitulo6Iniciado) {
      this.salaCorrente = salaDeEstar;
    } else {
      this.salaCorrente = porao;
    }
  }
}
