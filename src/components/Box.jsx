// src/components/Box.jsx
import { motion } from "framer-motion";

export default function Box({ className = "", children, ...rest }) {
  return (
    <motion.div
      {...rest}
      className={`
        relative p-[2px] rounded-2xl
        bg-gradient-to-br from-[#2CBDFE] to-[#7F5AF0]
        shadow-[0_0_20px_rgba(127,90,240,0.4)]
        ${className}
      `}
    >
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-gradient-to-br from-[#1A1B3D] via-[#15162A] to-[#0F0F1C]
          px-6 py-10 md:px-12
        "
      >
        
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-gradient-to-br from-[#7F5AF0] to-[#2CBDFE] 
            opacity-20 blur-2xl
          "
        />
        {children}
      </div>
    </motion.div>
  );
}