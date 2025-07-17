import React, { useState } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      id="projects"
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">Projetos</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#232946] rounded-2xl p-6 shadow-md flex flex-col"
          >
            <h4 className="text-xl font-semibold text-white mb-2">
              {proj.name}
            </h4>

            <p className="text-[#b8c1ec] mb-4 line-clamp-3">
              {proj.description}
            </p>

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
          </motion.div>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </motion.section>
  );
}