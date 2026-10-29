import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Adaptado do "Features with Panel" do ScrollX UI (21st.dev): lista numerada
// à esquerda e um painel de mídia preso na tela à direita, que troca conforme
// o item escolhido. No celular a mídia abre dentro do próprio item. Mudanças:
// itens por props, cada item é um <button> (teclado e leitor de tela), uma
// linha de apoio (meta) e um texto que abre junto, e um <div> no lugar do Card
// do shadcn, que o projeto não usa.

const EASE = [0.4, 0, 0.2, 1]

// Nó React animado (as ilustrações da Trajetória): fora da tela as animações
// CSS ficam pausadas. Rodando, as do SVG recalculam estilo e repintam a cada
// quadro mesmo sem aparecer, e isso travava a rolagem do resto da página.
function AnimatedMedia({ alt, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} role="img" aria-label={alt} data-paused={!visible} className="media-anim w-full h-full">
      {children}
    </div>
  )
}

// string com extensão de vídeo → <video>; de imagem → <img>; nó React → como veio
function FeatureMedia({ content, alt }) {
  if (typeof content !== 'string') {
    return <AnimatedMedia alt={alt}>{content}</AnimatedMedia>
  }

  if (/\.(mp4|webm|ogg)$/i.test(content)) {
    return (
      <video
        src={content}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    )
  }

  return <img src={content} alt={alt} loading="lazy" className="w-full h-full object-cover object-top" />
}

// mediaAspect: proporção do painel; 4:3 para as ilustrações, 16:10 para prints de tela
const panelClass = (aspect) =>
  cn('relative w-full overflow-hidden rounded-2xl border border-ivory/10 bg-carbon-raised shadow-xl shadow-black/40', aspect)

// Painel com a troca animada entre as mídias dos itens
function MediaPanel({ items, active, mediaAspect }) {
  return (
    <div className={panelClass(mediaAspect)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-0"
        >
          <FeatureMedia content={items[active].media} alt={items[active].alt} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Número, título e a linha de apoio (meta) de um item: o mesmo bloco na caixa
// fechada e em cada opção da lista
function ItemLabel({ item, index, highlighted }) {
  return (
    <>
      <span
        className={cn(
          'mt-0.5 size-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-colors duration-200',
          highlighted ? 'bg-electric text-carbon' : 'bg-ivory/8 text-ivory/55'
        )}
      >
        {index + 1}
      </span>
      <span className="min-w-0">
        <span className={cn('block text-sm sm:text-base font-display font-bold leading-snug', highlighted ? 'text-ivory' : 'text-ivory/70')}>
          {item.title}
        </span>
        {item.meta && <span className="mt-0.5 block text-xs font-medium text-ivory/55">{item.meta}</span>}
      </span>
    </>
  )
}

// layout "select": uma caixa só, com a tela escolhida, que abre a lista das
// outras por cima da mídia. Para galerias longas, em que a grade de botões
// ocupava a tela antes da imagem. Teclado: setas, Home/End, Enter e Esc.
function SelectFeatures({ items, header, mediaAspect, active, setActive, baseId }) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(active)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const listId = `${baseId}-list`
  const panelId = `${baseId}-panel`
  const optionId = (index) => `${baseId}-option-${index}`
  const current = items[active]

  // Clique fora fecha a lista
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Ao abrir, o foco vai para a lista, na opção escolhida
  useEffect(() => {
    if (open) listRef.current?.focus()
  }, [open])

  // Mantém a opção destacada à vista quando a lista rola
  useEffect(() => {
    if (open) document.getElementById(optionId(focused))?.scrollIntoView({ block: 'nearest' })
  })

  const openList = () => {
    setFocused(active)
    setOpen(true)
  }

  const choose = (index) => {
    setActive(index)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onListKeyDown = (event) => {
    const last = items.length - 1
    const moves = {
      ArrowDown: Math.min(focused + 1, last),
      ArrowUp: Math.max(focused - 1, 0),
      Home: 0,
      End: last,
    }
    if (event.key in moves) {
      event.preventDefault()
      setFocused(moves[event.key])
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      choose(focused)
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      if (event.key === 'Escape') event.preventDefault()
      setOpen(false)
      if (event.key === 'Escape') buttonRef.current?.focus()
    }
  }

  return (
    <div>
      {header}
      <div ref={rootRef} className="relative z-20 w-full sm:max-w-md">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              openList()
            }
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          className={cn(
            'flex w-full items-start gap-3 rounded-xl bg-carbon-raised/80 px-3.5 py-3 text-left ring-1 transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-electric',
            open ? 'ring-ivory/30' : 'ring-ivory/15 hover:ring-ivory/30'
          )}
        >
          <ItemLabel item={current} index={active} highlighted />
          <span className="ml-auto flex items-center gap-2 self-center shrink-0 pl-2 text-xs font-medium text-ivory/55">
            {active + 1}/{items.length}
            <ChevronDown className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} aria-hidden="true" />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={optionId(focused)}
              onKeyDown={onListKeyDown}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute inset-x-0 top-full mt-2 max-h-[min(26rem,60vh)] overflow-y-auto overscroll-contain rounded-xl bg-carbon-raised p-1.5 ring-1 ring-ivory/15 shadow-2xl shadow-black/60 outline-none"
            >
              {items.map((item, index) => (
                <li
                  key={item.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={active === index}
                  onClick={() => choose(index)}
                  onPointerMove={() => setFocused(index)}
                  className={cn(
                    'flex items-start gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150',
                    focused === index ? 'bg-ivory/8' : '',
                    active === index && 'ring-1 ring-inset ring-electric/40'
                  )}
                >
                  <ItemLabel item={item} index={index} highlighted={active === index} />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div id={panelId} className="mt-8" aria-live="polite">
        {current.description && (
          <p className="mb-5 max-w-3xl text-sm sm:text-base text-ivory/70 leading-relaxed">
            <strong className="font-semibold text-ivory">{current.title}:</strong> {current.description}
          </p>
        )}
        <MediaPanel items={items} active={active} mediaAspect={mediaAspect} />
      </div>
    </div>
  )
}

export function FeaturesWithPanel({ items, header, mediaAspect = 'aspect-4/3', layout = 'side' }) {
  const [active, setActive] = useState(0)
  const baseId = useId()

  if (layout === 'select') {
    return (
      <MotionConfig reducedMotion="user">
        <SelectFeatures items={items} header={header} mediaAspect={mediaAspect} active={active} setActive={setActive} baseId={baseId} />
      </MotionConfig>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          {header}

          <ul className="flex flex-col gap-1.5">
            {items.map((item, index) => {
              const isActive = active === index
              const detailId = `${baseId}-${index}`
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
                  className={cn(
                    'rounded-xl ring-1 transition-colors duration-200',
                    isActive ? 'ring-ivory/25 bg-carbon-raised/80' : 'ring-transparent hover:bg-ivory/5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-expanded={isActive}
                    aria-controls={detailId}
                    className="flex w-full items-start gap-4 px-4 py-3.5 text-left rounded-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-electric"
                  >
                    <span
                      className={cn(
                        'mt-0.5 size-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors duration-200',
                        isActive ? 'bg-electric text-carbon' : 'bg-ivory/8 text-ivory/55'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block text-base sm:text-lg font-display font-bold leading-snug transition-colors duration-200',
                          isActive ? 'text-ivory' : 'text-ivory/70'
                        )}
                      >
                        {item.title}
                      </span>
                      {item.meta && (
                        <span className="mt-0.5 block text-xs font-medium text-ivory/55">{item.meta}</span>
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={detailId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:pl-15">
                          {item.description && (
                            <p className="text-sm text-ivory/70 leading-relaxed">{item.description}</p>
                          )}
                          <div className={cn(panelClass(mediaAspect), 'mt-4 lg:hidden')}>
                            <FeatureMedia content={item.media} alt={item.alt} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>
        </div>

        <div className="hidden lg:block sticky top-28">
          <MediaPanel items={items} active={active} mediaAspect={mediaAspect} />
        </div>
      </div>
    </MotionConfig>
  )
}

export default FeaturesWithPanel
