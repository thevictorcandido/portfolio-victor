import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Adaptado da timeline horizontal da Hyperiux Vault (21st.dev): a seção fica
// presa na tela, o trilho anda para o lado com a rolagem e cada marco desenha
// a haste e o ponto e revela o texto linha a linha. O original tinha 7 marcos
// com posições escritas à mão e uma imagem; aqui os marcos vêm por props, em
// qualquer quantidade, alternando acima e abaixo da linha.

gsap.registerPlugin(ScrollTrigger, SplitText)

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const subscribe = (callback) => {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

// Rolagem vertical por pixel de deslocamento horizontal
const SCROLL_RATIO = 1.4

export default function Timeline({
  title,
  periodLabel,
  items,
  textColor = '#151515',
  mutedTextColor = '#57534E',
  activeColor = '#FF5F00',
}) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reducedMotion = useSyncExternalStore(subscribe, getReducedMotion, () => false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    let ctx
    let cancelled = false

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
    // A altura da seção define quanto se rola com ela presa na tela
    const setHeight = () => {
      section.style.height = `${window.innerHeight + distance() * SCROLL_RATIO}px`
    }

    // O SplitText mede as linhas: espera as fontes do site carregarem
    document.fonts.ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        setHeight()
        ScrollTrigger.addEventListener('refreshInit', setHeight)

        const master = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        master.fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1 }, 0)

        if (reducedMotion) {
          gsap.set('.timeline-line', { scaleX: 1 })
          return
        }

        const LINE_START = 0.05
        const LINE_DURATION = 0.9
        const line = section.querySelector('.timeline-line')
        gsap.set(line, { scaleX: 0 })
        master.to(line, { scaleX: 1, duration: LINE_DURATION }, LINE_START)

        // Cada marco revela quando a linha central chega até ele
        const lineWidth = line.parentElement.offsetWidth
        const marks = gsap.utils.toArray('.timeline-mark', section)
        marks.forEach((mark) => {
          for (const el of mark.querySelectorAll('.timeline-title, .timeline-text')) {
            new SplitText(el, { type: 'lines', mask: 'lines' })
          }
          // Cada linha fica dentro da sua máscara: anima a linha, não a máscara
          const titleLines = mark.querySelectorAll('.timeline-title > div > div')
          const textLines = mark.querySelectorAll('.timeline-text > div > div')
          const stem = mark.querySelector('.timeline-stem')
          const dot = mark.querySelector('.timeline-dot')
          // Estado inicial explícito: com stagger, o fromTo no meio da timeline
          // só aplicava o "from" ao primeiro elemento e as outras linhas apareciam antes
          gsap.set(stem, { scaleY: 0 })
          gsap.set(dot, { scale: 0 })
          gsap.set([...titleLines, ...textLines], { yPercent: 100 })

          const at = Math.max(0, LINE_START + LINE_DURATION * Math.min(1, mark.offsetLeft / lineWidth) - 0.03)
          master
            .to(stem, { scaleY: 1, duration: 0.12 }, at)
            .to(dot, { scale: 1, duration: 0.12 }, at)
            .to(titleLines, { yPercent: 0, duration: 0.2, ease: 'power2.out' }, at + 0.04)
            .to(textLines, { yPercent: 0, duration: 0.2, stagger: 0.02, ease: 'power2.out' }, at + 0.06)
        })
      }, section)
      ScrollTrigger.refresh()
    })

    return () => {
      cancelled = true
      ScrollTrigger.removeEventListener('refreshInit', setHeight)
      ctx?.revert()
      section.style.height = ''
    }
  }, [reducedMotion, items])

  const active = { backgroundColor: activeColor }

  return (
    <div ref={sectionRef} className="relative w-full" style={{ color: textColor }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-[34vw] w-max items-stretch px-[5vw] will-change-transform max-[600px]:h-[78vh] max-[600px]:px-[7vw]"
        >
          {/* Abertura: título acima da linha, período abaixo */}
          <div className="flex w-[24vw] shrink-0 flex-col max-[600px]:w-[64vw]">
            <div className="flex h-1/2 items-start pt-[2vw] max-[600px]:pt-[5vw]">
              <p className="font-display text-[clamp(1.75rem,3.2vw,3.75rem)] font-bold leading-[0.95] tracking-tight max-[600px]:text-[9vw]">
                {title}
              </p>
            </div>
            <div className="flex h-1/2 items-start pt-[2vw] max-[600px]:pt-[5vw]">
              <p
                className="text-[clamp(1rem,1.65vw,1.75rem)] font-medium leading-none max-[600px]:text-[4.6vw]"
                style={{ color: mutedTextColor }}
              >
                {periodLabel}
              </p>
            </div>
          </div>

          {/* Marcos sobre a linha central */}
          <div className="relative flex shrink-0 pr-[30vw] max-[600px]:pr-[32vw]">
            <div
              className="absolute left-0 right-[24vw] top-1/2 flex -translate-y-1/2 items-center max-[600px]:right-[60vw]"
              aria-hidden="true"
            >
              <span className="size-[0.8vw] shrink-0 rounded-full max-[600px]:size-[2vw]" style={active} />
              <span className="timeline-line h-[2px] flex-1 origin-left rounded-full" style={active} />
              <span className="size-[0.8vw] shrink-0 rounded-full max-[600px]:size-[2vw]" style={active} />
            </div>

            <ol className="flex">
              {items.map((item, i) => {
                const top = i % 2 === 0
                return (
                  <li key={item.id} className="timeline-mark relative flex h-full w-[24vw] shrink-0 flex-col max-[600px]:w-[58vw]">
                    <div className="relative h-1/2">
                      {top && <Mark item={item} top active={active} muted={mutedTextColor} />}
                    </div>
                    <div className="relative h-1/2">
                      {!top && <Mark item={item} active={active} muted={mutedTextColor} />}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

// Um marco: haste ligando a linha central ao ponto, e o texto junto do ponto
function Mark({ item, top = false, active, muted }) {
  return (
    <>
      <div className={`absolute left-0 flex h-full flex-col ${top ? 'top-0' : 'bottom-0 flex-col-reverse'}`} aria-hidden="true">
        <span className="timeline-dot relative size-[1vw] shrink-0 -translate-x-1/2 rounded-full max-[600px]:size-[2.6vw]" style={active} />
        <span
          className={`timeline-stem w-[2px] flex-1 -translate-x-1/2 rounded-full ${top ? 'origin-bottom' : 'origin-top'}`}
          style={active}
        />
      </div>
      <div
        className={`flex h-full w-[30vw] flex-col gap-[0.9vw] pl-[2.4vw] max-[600px]:w-[74vw] max-[600px]:gap-[2.5vw] max-[600px]:pl-[6vw] ${
          top ? '-mt-[0.6vw] justify-start' : 'justify-end pb-[0.2vw]'
        }`}
      >
        <h3 className="timeline-title font-display text-[clamp(1.4rem,2.4vw,3rem)] font-bold leading-none tracking-tight max-[600px]:text-[5.6vw]">
          {item.title}
        </h3>
        <p
          className="timeline-text w-[90%] text-[clamp(1rem,1.45vw,1.6rem)] leading-[1.2] max-[600px]:text-[4.6vw]"
          style={{ color: muted }}
        >
          {item.text}
          {item.highlight && (
            <>
              {' · '}
              <span className="font-semibold" style={{ color: item.highlightColor }}>
                {item.highlight}
              </span>
            </>
          )}
        </p>
      </div>
    </>
  )
}
