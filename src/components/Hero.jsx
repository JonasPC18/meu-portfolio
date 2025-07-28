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
  variants={{
    hidden: { opacity: 0, x: -40 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }}
  /* 1️⃣ força LARGURA = ALTURA  */
  className="relative isolate w-40 h-40 md:w-48 md:h-48"
>
  {/* Glow externo */}
  <span
    aria-hidden
    className="absolute inset-0 -z-10 rounded-full
               bg-gradient-to-tr from-[#6f54bd] via-[#5d4fee] to-[#0ccffc]
               opacity-40 blur-[6px]"
  />

  {/* Anel fino */}
  <div
    className="relative p-[3px] rounded-full w-full h-full
               bg-gradient-to-tr from-[#6f54bd] via-[#5d4fee] to-[#0ccffc]"
  >
    {/* Disco interno */}
    <div
      className="relative w-full h-full overflow-hidden rounded-full
                 bg-gradient-to-tr from-[#9852e4] via-[#5e5afc] to-[#00bcff]"
    >
      {/* 2️⃣ foto cobre tudo */}
      <motion.img
        src="profile.jpg"
        alt="Foto de Jonas"
        className="w-full h-full object-cover"
      />
    </div>
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
