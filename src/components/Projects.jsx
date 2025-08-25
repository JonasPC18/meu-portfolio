import React, { useState } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectModal from "./ProjectModal";
import Box from "./Box";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // Animação dos cards (suave e dispara mais cedo)
  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  // Separa em projetos destaque e demais
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const renderCard = (proj, i) => (
    <motion.div
      key={proj.name + i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1  }}
      transition={{ delay: i * 0.1 }}
      className="bg-[#232946] rounded-2xl p-6 shadow-md flex flex-col"
    >
      {proj.thumb && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black/40">
          <video
            src={proj.thumb}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            className="h-full w-full object-cover pointer-events-none select-none"
            tabIndex={-1}
            aria-hidden="true"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

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
  );

  return (
    <motion.section
      id="projects"
      className="py-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "200px 0px 200px 0px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* —— PROJETOS EM DESTAQUE —— */}
      {featured.length > 0 && (
        <Box variant="highlight" className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">
            Projetos Destaque
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map(renderCard)}
          </div>
        </Box>
      )}

      {others.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mt-10 mb-6 text-[#7f5af0]">
            Outros Projetos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {others.map(renderCard)}
          </div>
        </>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </motion.section>
  );
}
