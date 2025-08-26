import React, { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";

export default function ProjectModal({ project, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Quando trocar de projeto, limpa o arquivo selecionado
  useEffect(() => {
    setSelectedFile(null);
  }, [project]);

  if (!project) return null;

  // Detecta URLs de site e GitHub (com fallback para "link")
  const siteUrl =
    project.site ||
    (project.link && !project.link.includes("github.com") ? project.link : null);
  const isGithubLink = project.github || project.link?.includes("github.com");

  // alterna: clica uma vez e abre / clica de novo e fecha
  const toggleFile = (file) =>
    setSelectedFile((curr) => (curr === file ? null : file));

  return (
    <div
      className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Projeto: ${project?.name || ""}`}
    >
      <div className="bg-[#232946] w-full sm:max-w-3xl rounded-2xl p-6 sm:p-8 shadow-xl relative flex flex-col max-h-[90dvh] overflow-y-auto">

        {/* botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#a6adc8] text-2xl font-bold hover:text-white"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {/* título e descrição */}
        <h4 className="text-2xl font-bold mb-3 text-[#7f5af0]">
          {project.name}
        </h4>
        <p className="text-[#eaeaea] whitespace-pre-line mb-3 text-justify">
          {project.description}
        </p>

        {/* Link do site centralizado dentro de uma "caixinha" */}
        {siteUrl && (
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 ring-1 ring-[#2CBDFE]/25 shadow-sm">
              <span className="text-[#a6adc8] font-medium select-none">Link:</span>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2CBDFE] hover:underline underline-offset-4 decoration-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2CBDFE]/40 break-all transition"
              >
                {siteUrl}
              </a>
            </div>
          </div>
        )}

        {/* título da seção de componentes */}
        {project.files?.length > 0 && (
          <h5
            className="text-xs sm:text-sm font-semibold text-[#a6adc8] uppercase tracking-wide mb-2 text-center sm:text-left"
            aria-label="Principais componentes"
          >
            Principais componentes
          </h5>
        )}

        {/* lista de arquivos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.files || []).map((f) => (
            <button
              key={f}
              onClick={() => toggleFile(f)}
              className={`px-3 py-1 rounded text-xs transition ${
                selectedFile === f
                  ? "bg-[#7f5af0] text-white"
                  : "bg-[#34344e] text-[#eaeaea] hover:bg-[#4b4b74]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* link GitHub (mantido no mesmo lugar) */}
        {(project.github || isGithubLink) && (
          <a
            href={project.github || project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-block text-[#7f5af0] underline hover:text-white break-all"
          >
            Ver no GitHub
          </a>
        )}

        {/* área do código */}
        <div className="flex-1 min-h-0 pb-2">
          {selectedFile ? (
            <CodeBlock
              key={selectedFile}          /* zera o scroll */
              folder={project.folder}
              file={selectedFile}
            />
          ) : (
            <p className="text-[#a6adc8]">
              Clique em um arquivo para visualizar o código.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
