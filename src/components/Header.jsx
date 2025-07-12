export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-5 bg-[#16161a]">
      <h1 className="text-2xl font-bold text-[#7f5af0]">Portfólio</h1>
      <nav>
        <a href="#projects" className="mx-3 text-[#a6adc8] hover:text-[#fff]">Projetos</a>
        <a href="#skills" className="mx-3 text-[#a6adc8] hover:text-[#fff]">Habilidades</a>
        <a href="#about" className="mx-3 text-[#a6adc8] hover:text-[#fff]">Sobre</a>
      </nav>
    </header>
  );
}