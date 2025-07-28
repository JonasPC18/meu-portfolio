import React, { useState } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectModal from "./ProjectModal";
import ProjectBox from "./ProjectBox";

// Variantes de animação
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // Separa projetos em destaque e demais
  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  /* --------------------------------------------------
   * CARD DE CONTEÚDO (usa ProjectBox como wrapper)
   * ------------------------------------------------*/
  const ItemCard = ({ proj, i }) => (
    <ProjectBox
      variant={proj.featured ? "destaque" : "normal"}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.1 }}
    >
      <h4 className="text-xl font-semibold text-white mb-2">{proj.name}</h4>

      <p className="text-[#b8c1ec] mb-4 line-clamp-3">{proj.description}</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {proj.tech.map((t) => (
          <span
            key={t}
            className="bg-[#7f5af0] text-white rounded px-2 py-1 text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => setSelected(proj)}
        className="mt-auto bg-[#7f5af0] hover:bg-[#6246ea] text-white font-bold py-2 px-4 rounded"
      >
        Explorar
      </button>
    </ProjectBox>
  );

  /* --------------------------------------------------
   * SEÇÃO PRINCIPAL
   * ------------------------------------------------*/
  return (
    <motion.section
      id="projects"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-12"
    >
      {featured.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">
            Projetos Destaque
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map((proj, i) => (
              <ItemCard key={proj.name + i} proj={proj} i={i} />
            ))}
          </div>
        </>
      )}

      {others.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mt-10 mb-6 text-[#7f5af0]">
            Outros Projetos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {others.map((proj, i) => (
              <ItemCard key={proj.name + i} proj={proj} i={i} />
            ))}
          </div>
        </>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </motion.section>
  );
}
