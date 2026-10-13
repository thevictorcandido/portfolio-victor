import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0C0F0D] text-[#ECE5D8] selection:bg-[#3A5742] selection:text-[#FAF7F2]">
      {/* Barra de Navegação Fixa com Backdrop Blur */}
      <Navbar />

      {/* Conteúdo Principal do Portfólio */}
      <main>
        {/* Seção Hero: Apresentação de Alto Impacto */}
        <Hero />

        {/* 01: Sobre Mim & Filosofia de Desenvolvimento */}
        <About />

        {/* 02: Projetos em Destaque & Filtros */}
        <Projects />

        {/* 03: Experiência Profissional & Linha do Tempo */}
        <Experience />

        {/* 04: Conhecimento Técnico & Stack */}
        <Skills />

        {/* 05: Formação Acadêmica & Cursos */}
        <Education />

        {/* 06: Contato Direto & Formulário */}
        <Contact />
      </main>

      {/* Rodapé com Direitos e Ações */}
      <Footer />
    </div>
  )
}

export default App
