// src/components/Box.jsx
import { motion } from "framer-motion";

export default function Box({
  variant = "normal",
  className = "",
  children,
  ...rest
}) {
  // --- Caixinha de destaque -------------------------------------------
  if (variant === "highlight") {
    return (
      <motion.div
        {...rest}
        className={`relative p-[2px] rounded-3xl
                    bg-gradient-to-br from-[#4240c6] to-[#6f54bd]
                    ${className}`}
      >
        <div
          className="relative overflow-hidden rounded-3xl
                     bg-gradient-to-br from-[#10101A] via-[#141425] to-[#1A1940]
                     px-6 py-10 md:px-12"
        >
          {/* Overlay com blur interno */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10
                       bg-gradient-to-br from-[#4240c6] to-[#6f54bd]
                       opacity-25 blur-2xl"
          />
          {children}
        </div>
      </motion.div>
    );
  }

  // --- Caixinha normal -------------------------------------------------
  return (
    <div
      {...rest}
      className={`rounded-2xl p-6 shadow-md
                  bg-[#141034] text-[#eaeaea] ${className}`}
    >
      {children}
    </div>
  );
}
