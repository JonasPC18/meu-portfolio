import React, { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";

export default function ProjectModal({ project, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Quando trocar de projeto, limpa o arquivo selecionado
  useEffect(() => {
    setSelectedFile(null);
  }, [project]);

  if (!project) return null;

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
      <div className="bg-[#232946] w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-2xl p-6 sm:p-8 shadow-xl relative flex flex-col overflow-y-auto sm:overflow-y-visible">

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
        <p className="text-[#eaeaea] whitespace-pre-line mb-4 text-justify">
          {project.description}
        </p>

        {/* lista de arquivos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.files.map((f) => (
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

        {/* link GitHub */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-block text-[#7f5af0] underline hover:text-white"
          >
            Ver no GitHub
          </a>
        )}

        {/* área do código */}
        <div className="flex-1">
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
