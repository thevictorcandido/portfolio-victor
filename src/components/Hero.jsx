import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BlurText } from './ui/blur-text'

// Inclinação final do pato, em graus (positivo = para a direita)
const DUCK_TILT = 6

export default function Hero() {
  const { t } = useTranslation()
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

  // Ao primeiro scroll as animações do Hero terminam (regra em index.css):
  // rodando junto com a rolagem, faziam a GPU perder quadros até Projetos.
  const [settled, setSettled] = useState(() => window.scrollY > 0)
  useEffect(() => {
    if (settled) return
    const settle = () => setSettled(true)
    window.addEventListener('scroll', settle, { once: true, passive: true })
    return () => window.removeEventListener('scroll', settle)
  }, [settled])

  return (
    <section
      id="hero"
      data-settled={settled || undefined}
      className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-between overflow-hidden text-ivory select-none pt-6 pb-8"
    >
      {/* Halo de luz suave de fundo para aquecer a composição */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[600px] bg-gradient-to-b from-ice/10 via-electric/[0.04] to-transparent rounded-full blur-3xl -z-10"
      />

      {/* Centro: nome em duas linhas à esquerda e o pato à direita. Abaixo de lg (celular
          e tablet), nome e pato centralizados um sobre o outro, o nome em ~70% da largura */}
      <div className="flex-1 flex items-center py-6 sm:py-10 my-auto">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-12">
          <div className="min-w-0">
            {/* Linha 1: VICTOR com BlurText por letras */}
            <div className="overflow-visible flex justify-center lg:justify-start">
              <BlurText
                text="VICTOR"
                delay={85}
                animateBy="letters"
                direction="top"
                className="font-bold text-[72px] sm:text-[104px] md:text-[128px] lg:text-[140px] xl:text-[180px] leading-[0.78] tracking-tighter uppercase justify-center lg:justify-start whitespace-nowrap text-ivory hover:text-white transition-colors"
                style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
              />
            </div>

            {/* Linha 2: CÂNDIDO com BlurText por letras */}
            {/* mt em em: o circunflexo do Â fica logo abaixo do I e encostava nele */}
            <div className="overflow-visible flex justify-center lg:justify-start">
              <BlurText
                text="CÂNDIDO"
                delay={85}
                animateBy="letters"
                direction="top"
                className="mt-[0.24em] font-bold text-[72px] sm:text-[104px] md:text-[128px] lg:text-[140px] xl:text-[180px] leading-[0.78] tracking-tighter uppercase justify-center lg:justify-start whitespace-nowrap text-ivory hover:text-white transition-colors"
                style={{ fontFamily: "'Fira Code', 'Hyperlegible Sans', monospace" }}
              />
            </div>
          </div>

          {/* Pato: entra com zoom elástico e um giro curto para a direita.
              Mesmo tamanho de fonte do nome: com altura em em, o pato acompanha o nome.
              Ao lado dele (lg+) fica um pouco mais alto que as duas linhas (1,8em);
              embaixo, centralizado, menor (1,5em) para não pesar mais que o nome */}
          <div className="self-center lg:self-auto shrink-0 text-[72px] sm:text-[104px] md:text-[128px] lg:text-[140px] xl:text-[180px] leading-none">
            <img
              ref={duckRef}
              src="/pato.webp"
              alt=""
              width={664}
              height={788}
              className="h-[1.5em] lg:h-[2.1em] w-auto drop-shadow-[0_24px_32px_rgb(0_0_0/0.45)] select-none will-change-transform"
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
            className="text-[16px] sm:text-[19px] md:text-[21px] lg:text-[23px] text-center text-ivory/70 hover:text-ivory transition-colors duration-300 justify-center font-medium"
            style={{ fontFamily: "'Antic', 'Montserrat', sans-serif" }}
          />
        </div>

        {/* Assinatura de identidade de Victor */}
        <p className="text-xs sm:text-sm text-ivory/55 font-normal mb-4 sm:mb-6">
          {t('hero.roleAndCompany')}
        </p>

        {/* Botão de Scroll Down com Chevron */}
        <a
          href="#about"
          className="inline-flex items-center justify-center p-2 rounded-full text-ivory/55 hover:text-ivory transition-colors animate-bounce cursor-pointer"
          aria-label={t('hero.scrollDown')}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} />
        </a>

      </footer>
    </section>
  )
}
