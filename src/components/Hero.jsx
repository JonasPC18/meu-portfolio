export default function Hero() {
  return (
    <section
      id="about"
      className="py-16 flex flex-col items-center md:flex-row md:items-start md:gap-10"
    >

      <img
        src="profile.jpg"
        alt="Foto de Jonas"
        className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover
                   border-2 border-[#f1deff] shadow-lg mb-6 md:mb-0"
      />

      <div className="max-w-2xl text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Jonas Costa
        </h2>

             <p className="text-[#a6adc8] leading-relaxed text-justify">
          Em&nbsp;2023, iniciei minha transição de carreira do audiovisual —
          onde atuei como supervisor de pós-produção para filmes e publicidades —
          para a área de&nbsp;Tecnologia da Informação. Desde então, tive um
          contato geral com diversas tecnologias. Atualmente estou cursando Análise 
          e Desenvolvimento de Sistemas pela PUCRS. Tenho me dedicado especialmente 
          aos estudos em desenvolvimento front-end, mas também tenho interesse por 
          outras áreas e estou sempre aberto a aprender coisas novas.
        </p>
      </div>
    </section>
  );
}