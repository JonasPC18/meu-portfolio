import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="py-20 flex flex-col md:flex-row items-center gap-10"
      variants={container}
      initial="hidden"
      animate="show"              
      >
      
<motion.div
  className="relative w-44 h-44 md:w-52 md:h-52 rounded-full
             bg-gradient-to-br from-[#7F5AF0] to-[#2CBDFE]
             p-[3px] shadow-[0_0_25px_rgba(127,90,240,0.5)]"
  variants={{
    hidden: { opacity: 0, x: -40 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }}
>
  {/* Círculo interno com gradiente mais escuro */}
  <div className="w-full h-full rounded-full bg-gradient-to-br
                  from-[#10101A] via-[#141425] to-[#1A1940]
                  flex items-center justify-center">
    
    {/* Imagem de perfil */}
    <motion.img
      src="profile.jpg"
      alt="Foto de Jonas"
      className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover
                 border-2 border-white/10 shadow-inner"
    />
  </div>
</motion.div>

      <motion.div className="max-w-2xl text-center md:text-left" variants={fadeUp}>
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          variants={fadeUp}
        >
          Jonas&nbsp;Costa
        </motion.h2>

        <motion.p
          className="text-[#a6adc8] leading-relaxed text-justify"
          variants={fadeUp}
        >
          Em 2023, iniciei minha transição de carreira do audiovisual — onde atuei como supervisor de pós-produção para filmes e publicidades — para a área de Tecnologia da Informação. Desde então, tive um contato geral com diversas tecnologias. Atualmente estou cursando Análise e Desenvolvimento de Sistemas pela PUCRS. Tenho me dedicado especialmente aos estudos em desenvolvimento front-end, mas também tenho interesse por outras áreas e estou sempre aberto a aprender coisas novas.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
