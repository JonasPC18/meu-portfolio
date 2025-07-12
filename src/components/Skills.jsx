import skills from "../data/skills";

export default function Skills() {
  return (
    <section className="py-12" id="skills">
      <h3 className="text-2xl font-bold mb-6 text-[#7f5af0]">Habilidades</h3>
      <div className="flex flex-wrap gap-4">
        {skills.map(skill => (
          <span key={skill}
          className="px-4 py-2 bg-[#232946] rounded-full text-[#eaeaea] font-medium">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
