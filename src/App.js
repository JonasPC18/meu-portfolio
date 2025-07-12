import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="min-h-screen bg-[#16161a]">
      <Header />
      <main className="max-w-4xl mx-auto px-4">
        <Hero />
        <Skills />
        <Projects />
      </main>
    </div>
  );
}

export default App;