import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const variants = {
    hidden: { y: -80, opacity: 0 },
    show:   { y: 0,   opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          variants={variants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg
                     bg-[#16161a]/80 border-b border-[#26262b]"
        >
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-[#7f5af0]">Portfólio</a>

            <ul className="flex gap-6 text-sm font-medium text-[#eaeaea]">
              <li><a href="#projects" className="hover:text-[#7f5af0]">Projetos</a></li>
              <li><a href="#skills"   className="hover:text-[#7f5af0]">Habilidades</a></li>
              <li><a href="#about"    className="hover:text-[#7f5af0]">Sobre</a></li>
            </ul>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
