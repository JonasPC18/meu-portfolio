import React, { useState } from "react";
import projects from "../data/projects";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12" id="projects">
      <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">Projetos</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.name}
            className="bg-[#232946] rounded-2xl p-6 shadow-md flex flex-col"
          >
            <h4 className="text-xl font-semibold text-white mb-2">
              {proj.name}
            </h4>
            <p className="text-[#b8c1ec] mb-4 line-clamp-3 ">
              {proj.description}
            </p>
            <div className="flex gap-2 mb-4 flex-wrap ">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="bg-[#7f5af0] text-white rounded px-2 py-1 text-xs "
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
          </div>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
