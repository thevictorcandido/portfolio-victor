import { Suspense, lazy, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { usePathname } from './lib/router'

// Estudos de caso: cada um é um chunk à parte, baixado só quando a página abre
const caseStudies = {
  'degrau-educa': lazy(() => import('./pages/CaseStudyDegrauEduca')),
  'drift-invaders': lazy(() => import('./pages/CaseStudyDriftInvaders')),
  'sentinela-gvs': lazy(() => import('./pages/CaseStudySentinelaGvs')),
  'wisp-tv': lazy(() => import('./pages/CaseStudyWispTv')),
}

function Home() {
  return (
    <>
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
    </>
  )
}

function App() {
  const pathname = usePathname()
  const slug = pathname.match(/^\/projetos\/([\w-]+)\/?$/)?.[1]
  const CaseStudy = caseStudies[slug]

  // Ao trocar de página: com âncora (/#projects), vai até a seção; sem, volta ao topo
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1)
    const target = id && document.getElementById(id)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen text-ivory selection:bg-electric selection:text-carbon">
      {/* Barra de Navegação Flutuante no Estilo da Referência */}
      <Navbar onHome={!CaseStudy} />

      {/* Conteúdo Principal do Portfólio */}
      <main>
        {CaseStudy ? (
          <Suspense fallback={<div className="min-h-screen" />}>
            <CaseStudy />
          </Suspense>
        ) : (
          <Home />
        )}
      </main>

      {/* Rodapé Editorial */}
      <Footer />
    </div>
  )
}

export default App
