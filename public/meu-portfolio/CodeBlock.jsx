import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

// Linguagens necessárias
import "prismjs/components/prism-markup";     // base para HTML (alias: html)
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";        // JSX depende de markup + javascript
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";

import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";

// Essa função identifica a linguagem pelo sufixo do arquivo
function detectLanguage(filename) {
  if (filename.endsWith(".json")) return "json";
  if (filename.endsWith(".js"))   return "javascript";
  if (filename.endsWith(".jsx"))  return "jsx";
  if (filename.endsWith(".css"))  return "css";
  if (filename.endsWith(".py"))   return "python";
  if (filename.endsWith(".html")) return "html"; // alias de "markup" no Prism
  return "";
}

export default function CodeBlock({ folder, file }) {
  const [code, setCode] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (!file) return;

    fetch(`${process.env.PUBLIC_URL}/${folder}/${file}`)
      .then((res) => res.text())
      .then(setCode)
      .catch(() => setCode("// Erro ao carregar arquivo"));
  }, [folder, file]);

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  if (!file) return null;

  // Rolagem horizontal + vertical e altura máxima
  return (
    <pre className="rounded-xl overflow-x-auto overflow-y-auto max-h-[40vh] text-sm">
      <code ref={ref} className={`language-${detectLanguage(file)}`}>
        {code}
      </code>
    </pre>
  );
}
