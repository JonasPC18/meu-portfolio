import { motion } from "framer-motion";

export default function Box({
  variant = "normal",
  className = "",
  children,
  ...rest
}) {
  if (variant === "highlight") {
    return (
      <motion.div
        {...rest}
        className={`relative p-[2px] rounded-2xl
                    bg-gradient-to-br from-[#7F5AF0] to-[#2CBDFE]
                    shadow-[0_0_20px_rgba(127,90,240,0.4)]
                    ${className}`}
      >
        <div
          className="relative overflow-hidden rounded-2xl
                     bg-gradient-to-br from-[#0F0F1C] via-[#15162A] to-[#1A1B3D]
                     px-6 py-10 md:px-12"
        >
          {/* Inner glow overlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10
                       bg-gradient-to-br from-[#7F5AF0] to-[#2CBDFE]
                       opacity-20 blur-2xl"
          />
          {children}
        </div>
      </motion.div>
    );
  }

  // Default (normal) box
  return (
    <div
      {...rest}
      className={`rounded-2xl p-6 shadow-md
                  bg-[#323649] text-[#eaeaea] ${className}`}
    >
      {children}
    </div>
  );
}