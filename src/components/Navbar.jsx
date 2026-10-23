import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import { cn } from '@/lib/utils'
import { portfolioData } from '../data/portfolioData'

// Estrutura e estilo do navbar-02 do shadcnui-blocks (21st.dev): barra sólida
// de 64 px com borda inferior, logo e links à esquerda, ações à direita e, em
// tela menor, um painel lateral (Sheet) com os links na vertical. Feito sem
// Radix: o painel é um diálogo com motion, foco preso e Esc para fechar.

const navKeyMap = {
  hero: 'nav.home',
  about: 'nav.about',
  projects: 'nav.projects',
  experience: 'nav.experience',
  skills: 'nav.skills',
  education: 'nav.education',
  contact: 'nav.contact',
}

// navigationMenuTriggerStyle do shadcn, na paleta do site
const linkClass = (active) =>
  cn(
    'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50',
    active ? 'bg-ivory/10 text-ivory' : 'text-ivory/70 hover:bg-ivory/8 hover:text-ivory'
  )

// Variantes "outline" e padrão do Button do shadcn. O display fica de fora do
// primaryButton: o cn() do projeto não resolve conflito entre classes, e um
// inline-flex fixo venceria o hidden de quem usa
const outlineButton =
  'inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-ivory/15 bg-carbon text-ivory shadow-xs transition-colors hover:bg-ivory/8 outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50 cursor-pointer'
const primaryButton =
  'h-9 items-center gap-1.5 rounded-md bg-electric px-4 text-sm font-medium text-carbon shadow-xs transition-colors hover:bg-electric-hover outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50'

function Logo({ onClick }) {
  return (
    <a
      href="#hero"
      onClick={onClick}
      title="Victor Cândido Leite"
      className="font-special text-3xl leading-none text-ivory hover:opacity-85 transition-opacity rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50"
    >
      Victor
    </a>
  )
}

function NavLinks({ active, vertical = false, onNavigate }) {
  const { t } = useTranslation()
  return (
    <ul className={cn('flex gap-1', vertical ? 'flex-col items-stretch -ms-3' : 'items-center')}>
      {portfolioData.navItems.map((item) => {
        const isActive = active === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              className={cn(linkClass(isActive), vertical && 'w-full')}
            >
              {t(navKeyMap[item.id] || 'nav.home')}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

// Painel lateral do navbar-02 (Sheet do shadcn): entra pela direita sobre um véu
function NavigationSheet({ open, onClose, active, returnFocusRef }) {
  const { t } = useTranslation()
  const titleId = useId()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const returnTo = returnFocusRef.current
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Foco preso no painel enquanto ele está aberto
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      root.style.overflow = previousOverflow
      returnTo?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusRef])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-y-0 right-0 z-[60] flex h-full w-3/4 max-w-sm flex-col border-l border-ivory/10 bg-carbon px-6 py-4 shadow-2xl shadow-black/50"
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
            exit={{ x: '100%', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
          >
            <h2 id={titleId} className="sr-only">
              {t('nav.menuTitle')}
            </h2>
            <div className="flex h-10 items-center">
              <Logo onClick={onClose} />
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('nav.closeMenu')}
              className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-md text-ivory/70 transition-colors hover:bg-ivory/8 hover:text-ivory outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50 cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <nav aria-label={t('nav.menuTitle')} className="mt-6">
              <NavLinks active={active} vertical onNavigate={onClose} />
            </nav>

            <div className="mt-auto flex flex-col gap-4 border-t border-ivory/10 pt-4">
              <a href="#contact" onClick={onClose} className={cn(primaryButton, 'flex justify-center')}>
                <span>{t('about.ctaTalk')}</span>
                <ArrowUpRight className="size-4" />
              </a>
              <span className="flex items-center gap-1.5 text-xs text-ivory/55">
                <span className="size-2 rounded-full bg-electric animate-pulse" />
                {t('hero.availability')}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('hero')
  const [sheetOpen, setSheetOpen] = useState(false)
  const triggerRef = useRef(null)
  // Estável: o efeito do painel depende dela e não deve reiniciar a cada render
  const closeSheet = useCallback(() => setSheetOpen(false), [])

  // Seção atual: a última cujo topo já passou um pouco abaixo da barra
  useEffect(() => {
    const handleScroll = () => {
      const sections = portfolioData.navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 180

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(portfolioData.navItems[i].id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 h-16 border-b border-ivory/10 bg-carbon">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 xl:gap-12">
            <Logo />

            {/* Links no desktop */}
            <nav aria-label={t('nav.menuTitle')} className="hidden lg:block">
              <NavLinks active={activeSection} />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a href="#contact" className={cn(primaryButton, 'hidden sm:inline-flex lg:hidden xl:inline-flex')}>
              <span>{t('about.ctaTalk')}</span>
              <ArrowUpRight className="size-4" />
            </a>

            {/* Menu no celular e no tablet */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label={t('nav.openMenu')}
              aria-expanded={sheetOpen}
              aria-haspopup="dialog"
              className={cn(outlineButton, 'lg:hidden')}
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <NavigationSheet
        open={sheetOpen}
        onClose={closeSheet}
        active={activeSection}
        returnFocusRef={triggerRef}
      />
    </MotionConfig>
  )
}
