import { FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#26262b] bg-[#16161a]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-6 text-center">
        <h4 className="text-lg font-semibold text-white">
          Contato:
        </h4>

        <ul className="flex justify-center gap-6 text-2xl">
          <li>
            <a
              href="mailto:jonaspc43@hotmail.com"
              className="text-[#7f5af0] hover:text-white transition-colors"
              aria-label="Enviar e-mail"
            >
              <FaEnvelope />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jonaspc18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7f5af0] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/jonaspc43"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7f5af0] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>

      <div className="bg-[#0f0f11] py-4">
        <p className="text-center text-xs text-[#707789]">
          © {new Date().getFullYear()} Jonas Costa · Desenvolvido com React & Tailwind
        </p>
      </div>
    </footer>
  );
}
