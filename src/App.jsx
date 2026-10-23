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
    <div className="min-h-screen text-ivory selection:bg-electric selection:text-carbon">
      {/* Barra de Navegação Flutuante no Estilo da Referência */}
      <Navbar />

      {/* Conteúdo Principal do Portfólio */}
      <main>
        {/* Seção Hero: Apresentação com Referência Mindly & Foto do Victor */}
        <Hero />

        {/* 01: Sobre Mim & Visão Editorial */}
        <About />

        {/* 02: Projetos Selecionados com Cartões Arredondados */}
        <Projects />

        {/* 03: Vivência & Trajetória */}
        <Experience />

        {/* 04: Habilidades & Stack Técnica */}
        <Skills />

        {/* 05: Formação Acadêmica na PUC Minas */}
        <Education />

        {/* 06: Contato & Conexão Direta */}
        <Contact />
      </main>

      {/* Rodapé Editorial */}
      <Footer />
    </div>
  )
}

export default App
