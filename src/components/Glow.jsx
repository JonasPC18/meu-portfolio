import glowBlob from "../assets/blueGlow.png";
import { motion } from "framer-motion";

export default function Glow() {
  return (
    <div
      className="
        absolute top-0 left-0 w-full h-[50vh]
        overflow-hidden pointer-events-none select-none z-0
      "
    >
      <motion.img
        src={glowBlob}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8 }}
        className="
          w-[70vw] md:w-[50vw] lg:w-[45vw] max-w-[900px]
          -translate-y-1/2 -translate-x-1/4
          blur-sm
        "
      />
    </div>
  );
}