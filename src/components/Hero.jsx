import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BlurText } from './ui/blur-text'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'

// Inclinação final do pato, em graus (positivo = para a direita)
const DUCK_TILT = 6

export default function Hero() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const duckRef = useRef(null)

  // Entrada do pato: cresce do zero com sobressalto elástico enquanto gira
  // para a direita; o giro usa um elástico mais amortecido que o zoom, então
  // balança menos. Começa depois que as letras do nome já estão caindo.
  useLayoutEffect(() => {
    const duck = duckRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(duck, { rotation: DUCK_TILT })
      return () => gsap.set(duck, { clearProps: 'transform' })
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.45 })
        .fromTo(duck, { scale: 0 }, { scale: 1, duration: 1.6, ease: 'elastic.out(1, 0.4)' }, 0)
        .fromTo(duck, { rotation: -10 }, { rotation: DUCK_TILT, duration: 1.9, ease: 'elastic.out(1, 0.6)' }, 0)
    })
    return () => ctx.revert()
  }, [])

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
    { label: t('nav.home'), href: '#hero', highlight: true },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden text-cream select-none pt-4 pb-8"
    >
      {/* Halo de luz suave de fundo para aquecer a composição */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[600px] bg-gradient-to-b from-moss/10 via-moss/5 to-transparent rounded-full blur-3xl -z-10"
      />

      {/* Header superior inspirado no componente 21st.dev */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between z-30">
        
        {/* Botão de Menu Hambúrguer com dropdown lateral */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -ml-2 rounded-full text-cream/70 hover:text-cream transition-colors focus:outline-none focus:ring-2 focus:ring-moss cursor-pointer flex items-center gap-2"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {menuOpen ? (
              <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            ) : (
              <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            )}
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-cream/55">
              Menu
            </span>
          </button>

          {/* Menu Dropdown Flutuante */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 mt-3 w-56 sm:w-64 p-4 rounded-2xl bg-ink-raised/95 backdrop-blur-xl border border-cream/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-cream/45 mb-2 px-2 flex items-center justify-between">
                <span>{t('nav.menuTitle')}</span>
                <LanguageSwitcher className="scale-90" />
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                      item.highlight
                        ? 'bg-moss text-ink font-bold'
                        : 'text-cream/80 hover:text-cream hover:bg-cream/8'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-3 border-t border-cream/10 flex items-center justify-between px-2 text-xs text-cream/55">
                <span>PUC Minas</span>
                <span className="text-moss font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
                  {t('hero.availability')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Monograma / Assinatura Central em Smile Moon */}
        <div className="text-center">
          <a
            href="#hero"
            className="font-special text-3xl sm:text-4xl text-cream hover:opacity-85 transition-opacity tracking-normal"
            title="Victor Cândido Leite"
          >
            Victor
          </a>
        </div>

        {/* Lado Direito: Seletor de Idioma (PT / EN) + Botão Rápido de Contato */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LanguageSwitcher />

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold bg-cream text-ink hover:bg-white transition-all shadow-xs hover:scale-[1.02]"
          >
            <span>{t('hero.contactBtn')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Centro: Nome em duas linhas alinhado à esquerda e o pato à direita (abaixo, no celular) */}
      <div className="flex-1 flex items-center py-6 sm:py-10 my-auto">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="min-w-0">
            {/* Linha 1: VICTOR com BlurText por letras */}
            <div className="overflow-visible flex justify-start">
              <BlurText
                text="VICTOR"
                delay={85}
                animateBy="letters"
                direction="top"
                className="font-bold text-[72px] sm:text-[120px] md:text-[150px] lg:text-[140px] xl:text-[180px] leading-[0.78] tracking-tighter uppercase justify-start whitespace-nowrap text-cream hover:text-white transition-colors"
                style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
              />
            </div>

            {/* Linha 2: CÂNDIDO com BlurText por letras */}
            {/* mt em em: o circunflexo do Â fica logo abaixo do I e encostava nele */}
            <div className="overflow-visible flex justify-start">
              <BlurText
                text="CÂNDIDO"
                delay={85}
                animateBy="letters"
                direction="top"
                className="mt-[0.24em] font-bold text-[72px] sm:text-[120px] md:text-[150px] lg:text-[140px] xl:text-[180px] leading-[0.78] tracking-tighter uppercase justify-start whitespace-nowrap text-cream hover:text-white transition-colors"
                style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
              />
            </div>
          </div>

          {/* Pato: entra com zoom elástico e um giro curto para a direita.
              Mesmo tamanho de fonte do nome: com altura em em, o pato fica um
              pouco mais alto que as duas linhas (1,8em) em toda largura de tela */}
          <div className="self-end lg:self-auto shrink-0 text-[72px] sm:text-[120px] md:text-[150px] lg:text-[140px] xl:text-[180px] leading-none">
            <img
              ref={duckRef}
              src="/pato.webp"
              alt=""
              width={664}
              height={788}
              className="h-[2.1em] w-auto drop-shadow-[0_24px_32px_rgb(0_0_0/0.45)] select-none will-change-transform"
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Rodapé da Hero: Subtítulo Editorial Animado e Scroll Down */}
      <footer className="w-full max-w-4xl mx-auto px-6 text-center z-20 flex flex-col items-center">
        
        {/* Frase animada com BlurText por palavras */}
        <div className="flex justify-center mb-2">
          <BlurText
            text={t('hero.subtitle')}
            delay={130}
            animateBy="words"
            direction="top"
            className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[23px] text-center text-cream/70 hover:text-cream transition-colors duration-300 justify-center font-medium"
            style={{ fontFamily: "'Antic', 'Montserrat', sans-serif" }}
          />
        </div>

        {/* Assinatura de identidade de Victor */}
        <p className="text-xs sm:text-sm text-cream/55 font-normal mb-4 sm:mb-6">
          {t('hero.roleAndCompany')}
        </p>

        {/* Botão de Scroll Down com Chevron */}
        <a
          href="#about"
          className="inline-flex items-center justify-center p-2 rounded-full text-cream/55 hover:text-cream transition-colors animate-bounce cursor-pointer"
          aria-label={t('hero.scrollDown')}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
        </a>

      </footer>
    </section>
  )
}
