import thumbDitto from "../assets/thumbs/ditto-morto-site.mp4";
import thumbNizz from "../assets/thumbs/nizz-shop-site.mp4";
import thumbSeries from "../assets/thumbs/series-watchbook-site.mp4";
import thumbCaixinha from "../assets/thumbs/caixinha-site.mp4";
import thumbPomodoro from "../assets/thumbs/pomodoro-site.mp4";
import thumbMeteoro from "../assets/thumbs/meteoro-site.mp4";

const projects = [
  {
    name: "A Caixinha",
    featured: true, 
    folder: "A_Caixinha_COMPLETO",
    thumb: thumbCaixinha,
    files: [
      "Basicas.js",
      "FerramentasDemo.js",
      "index.js",
      "JogoDemo.js",
      "ObjetosDemo.js",
      "PessoasDemo.js",
      "SalasDemo.js"
    ],
    description: `
      Projeto de jogo de aventura em texto estilo "Zork", criado para a cadeira de Programação Orientada a Objetos do Curso de Análise e Desenvolvimento de Sistemas da PUCRS. O objetivo da atividade foi desenvolver minhas hábilidades em JavaScript e compreender o funcionamento da OOP.
    `,
    tech: ["JavaScript", "Node"],
    link: "..."
    
  },

    {
    name: "Series Watchbook",
    featured: true, 
    folder: "series-watchbook",
    thumb: thumbSeries,
    files: [
      "NavBar.jsx",
      "SerieForm.jsx",
      "SerieList.jsx",
    ],
    description: `
      Este projeto é um pequeno CRUD de séries feito em React para a cadeira de Frontend do curso de ADS da PUCRS. Ele permite cadastrar, listar e excluir séries armazenando os dados no localStorage do navegador. A navegação é feita com react-router-dom usando Hash Router
    `,
    tech: ["JavaScript", "React", "Html", "Bootstrap"],
    link: "https://jonaspc18.github.io/series-watchbook/"
  },

    {
    name: "Nizz Shop",
    featured: true,
    folder: "Nizz_Shop",
    thumb: thumbNizz,
    files: [
      "index.html",
      "produtos.html",
      "servicos.html",
      "enderecos.html",
      "cadastro.html",
      "style.css",
    ],
    description: `
      Projeto de MiniMercado para disciplina de Sistemas Web da PUCRS. O site foi feito sem framework, utilizando apenas HTML, Css, Javascript e Bootstrap. A tela não é responsiva para formato mobile.
    `,
    tech: ["Javascript","Html", "Css","Bootstrap"],
    link: "https://jonaspc18.github.io/Nizz_Shop/"
  },

    {
    name: "Pomodoro App",
    featured: true,
    folder: "pomodoro",
    thumb: thumbPomodoro,
    files: [
      "Controls.jsx",
      "CountdownCircle.jsx",
      "Header.jsx",
      "ModeTabs.jsx",
      "SettingsModal.jsx",
    ],
    description: `
      Exercício feito para o site "Frontend Mentor". O desafio consistiu na criação de um app de timer pomodoro.
    `,
    tech: ["JavaScript", "Html", "Css", "React"],
    link: "https://jonaspc18.github.io/pomodoro/"
  },

    {
    name: "Portfólio",
    featured: true,
    folder: "meu-portfolio",
    files: [
      "CodeBlock.jsx",
      "Header.jsx",
      "Hero.jsx",
      "ProjectModal.jsx",
      "Projects.jsx",
      "Skills.jsx",
    ],
    description: `
      O projeto do meu portifólio pessoal foi desenvolvido em React, utilizando Tailwind CSS para estilização. As animações e transições são feitas com Framer Motion, enquanto a exibição de código dentro dos modais é implementada com Prism.js.
    `,
    tech: ["JavaScript", "Html", "Tailwind", "React"],
    link: "https://jonaspc18.github.io/meu-portfolio/"
  },

    {
    name: "Ditto Morto",
    featured: true,
    folder: "ditto-morto",
    thumb: thumbDitto,
    files: [
      "ComicCarousel.jsx",
      "FrameLink.jsx",
      "Layout.jsx",
      "Quadrinhos.jsx",
    ],
    description: `
      Site para o projeto artístico "Ditto Morto". Desenvolvido em React. Ele também emprega React Hooks (useState, useEffect, useRef) para gerenciar estados, ciclos de vida e referências de elementos. Para a galeria de quadrinhos, é utilizado a biblioteca Swiper.js.
    `,
    tech: ["JavaScript", "Html", "Css", "React"],
    link: "https://jonaspc18.github.io/Ditto-Morto/"
  },

      {
    name: "Análise de Dados Meteorológicos",
    featured: true,
    folder: "dados-meteorologicos",
    thumb: thumbMeteoro,
    files: [
      "TRABALHO_FINAL_FASE_2_JONAS_COSTA.py",
    ],
    description: `
      Esse é um projeto acadêmico de lógica e programação de computadores focado em análise de dados meteorológicos. Este projeto foi desenvolvido em Python e faz uso principalmente da biblioteca matplotlib para geração de gráficos.
    `,
    tech: ["Python"],
    link: "..."
  },







];

export default projects;