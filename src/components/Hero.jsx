import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { BlurText } from './ui/blur-text'
import { portfolioData } from '../data/portfolioData'

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const navLinks = [
    { label: 'INÍCIO', href: '#hero', highlight: true },
    { label: 'SOBRE', href: '#about' },
    { label: 'PROJETOS', href: '#projects' },
    { label: 'EXPERIÊNCIA', href: '#experience' },
    { label: 'HABILIDADES', href: '#skills' },
    { label: 'FORMAÇÃO', href: '#education' },
    { label: 'CONTATO', href: '#contact' },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF8F5] text-stone-900 select-none pt-4 pb-8"
    >
      {/* Halo de luz suave de fundo para aquecer a composição */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[600px] bg-gradient-to-b from-amber-100/35 via-stone-200/20 to-transparent rounded-full blur-3xl -z-10"
      />

      {/* Header superior inspirado no componente 21st.dev */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between z-30">
        
        {/* Botão de Menu Hambúrguer com dropdown lateral */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -ml-2 rounded-full text-stone-600 hover:text-stone-950 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 cursor-pointer flex items-center gap-2"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? (
              <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            ) : (
              <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            )}
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-stone-500">
              Menu
            </span>
          </button>

          {/* Menu Dropdown Flutuante */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 mt-3 w-56 sm:w-64 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 px-2">
                Navegação
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                      item.highlight
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/80'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between px-2 text-xs text-stone-500">
                <span>PUC Minas</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Disponível
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Monograma / Assinatura Central em Smile Moon */}
        <div className="text-center">
          <a
            href="#hero"
            className="font-special text-3xl sm:text-4xl text-stone-950 hover:opacity-85 transition-opacity tracking-normal"
            title="Victor Cândido Leite"
          >
            Victor
          </a>
        </div>

        {/* Lado Direito: Tag de Status / Botão Rápido de Contato */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-black transition-all shadow-xs hover:scale-[1.02]"
          >
            <span>Contato</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Centro: Nome Gigante com BlurText e Foto Centralizada com Fundo Transparente */}
      <div className="flex-1 flex items-center justify-center py-6 sm:py-10 my-auto">
        <div className="relative text-center w-full max-w-6xl mx-auto px-4">
          
          {/* Linha 1: VICTOR com BlurText por letras */}
          <div className="overflow-visible flex justify-center">
            <BlurText
              text="VICTOR"
              delay={85}
              animateBy="letters"
              direction="top"
              className="font-bold text-[82px] xs:text-[105px] sm:text-[140px] md:text-[180px] lg:text-[215px] xl:text-[235px] leading-[0.78] tracking-tighter uppercase justify-center whitespace-nowrap text-stone-900 hover:text-black transition-colors"
              style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
            />
          </div>

          {/* Linha 2: CÂNDIDO com BlurText por letras */}
          <div className="overflow-visible flex justify-center mt-1 sm:mt-2">
            <BlurText
              text="CÂNDIDO"
              delay={85}
              animateBy="letters"
              direction="top"
              className="font-bold text-[82px] xs:text-[105px] sm:text-[140px] md:text-[180px] lg:text-[215px] xl:text-[235px] leading-[0.78] tracking-tighter uppercase justify-center whitespace-nowrap text-stone-900 hover:text-black transition-colors"
              style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
            />
          </div>

          {/* Foto de Perfil Centralizada: Cápsula Oval com Victor Recortado Sem Fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <div
              className="w-[68px] h-[115px] sm:w-[92px] sm:h-[156px] md:w-[114px] md:h-[192px] lg:w-[134px] lg:h-[224px] rounded-full overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ring-4 ring-white/90 bg-gradient-to-b from-[#EFE9DF] via-[#E2DACB] to-[#CFC4B2] relative group"
              title="Victor Cândido Leite"
            >
              {/* Brilho interior sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 pointer-events-none z-10" />

              {/* Foto real com fundo transparente */}
              <img
                src="/victor-sem-fundo.png"
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover object-top filter contrast-[1.03] select-none transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Rodapé da Hero: Subtítulo Editorial Animado e Scroll Down */}
      <footer className="w-full max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center">
        
        {/* Frase animada com BlurText por palavras */}
        <div className="flex justify-center mb-2">
          <BlurText
            text="Designing human experiences in code."
            delay={130}
            animateBy="words"
            direction="top"
            className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[23px] text-center text-stone-600 hover:text-stone-900 transition-colors duration-300 justify-center font-medium"
            style={{ fontFamily: "'Antic', 'Montserrat', sans-serif" }}
          />
        </div>

        {/* Assinatura de identidade de Victor */}
        <p className="text-xs sm:text-sm text-stone-500 font-normal mb-4 sm:mb-6">
          Engenharia de Software na PUC Minas · Operações & Web no Grupo GVS
        </p>

        {/* Botão de Scroll Down com Chevron */}
        <a
          href="#about"
          className="inline-flex items-center justify-center p-2 rounded-full text-stone-500 hover:text-stone-950 transition-colors animate-bounce cursor-pointer"
          aria-label="Rolar para a seção Sobre"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
        </a>

      </footer>
    </section>
  )
}
