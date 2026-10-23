import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
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

  return <img src={content} alt={alt} className="w-full h-full object-cover" />
}

const panelClass = 'relative w-full aspect-4/3 overflow-hidden rounded-2xl border border-ivory/10 bg-carbon-raised shadow-xl shadow-black/40'

export function FeaturesWithPanel({ items, header }) {
  const [active, setActive] = useState(0)
  const baseId = useId()

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
                          <div className={cn(panelClass, 'mt-4 lg:hidden')}>
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
          <div className={panelClass}>
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
        </div>
      </div>
    </MotionConfig>
  )
}

export default FeaturesWithPanel
