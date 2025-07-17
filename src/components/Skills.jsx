import { motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiOpenjdk,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import skills from "../data/skills";

const iconMap = {
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  HTML: SiHtml5,
  CSS: SiCss3,
  VSCode: DiVisualstudio, 
};

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">Habilidades</h3>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, i) => {
          const Icon = iconMap[skill];
          return (
            <motion.span
              key={skill}
              className="flex items-center gap-2 px-4 py-2 bg-[#232946] rounded-full text-[#eaeaea] font-medium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {Icon && <Icon className="text-xl" aria-hidden="true" />}
              {skill}
            </motion.span>
          );
        })}
      </div>
    </motion.section>
  );
}
