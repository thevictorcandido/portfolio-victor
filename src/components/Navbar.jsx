import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import { portfolioData } from '../data/portfolioData'

export default function Navbar() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const navKeyMap = {
    hero: 'nav.home',
    about: 'nav.about',
    projects: 'nav.projects',
    experience: 'nav.experience',
    skills: 'nav.skills',
    education: 'nav.education',
    contact: 'nav.contact',
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isScrolled) return null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 opacity-100 translate-y-0 pointer-events-auto'
          : 'py-5 sm:py-6 opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Marca estilo editorial */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-stone-900 transition-colors"
          >
            <span className="font-display text-2xl tracking-tight font-bold group-hover:opacity-80 transition-opacity">
              Victor<span className="text-stone-400 font-sans text-xs ml-0.5 tracking-normal">°</span>
            </span>
          </a>

          {/* Desktop Navigation: Floating Pill (inspirado na referência Mindly) */}
          <nav className="hidden md:flex items-center bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/70 shadow-sm shadow-stone-900/5">
            <ol className="flex items-center gap-1">
              {portfolioData.navItems.map((item) => {
                const isActive = activeSection === item.id
                const label = t(navKeyMap[item.id] || 'nav.home')
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                        isActive
                          ? 'bg-stone-100 text-stone-950 font-semibold shadow-xs'
                          : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50/70'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Botão de Ação Direta + Seletor de Idioma */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher className="scale-90" />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-stone-900 text-stone-50 hover:bg-black transition-all shadow-xs hover:shadow-md hover:scale-[1.02]"
            >
              <span>{t('about.ctaTalk')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-300" />
            </a>
          </div>

          {/* Botão Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher className="scale-90" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-stone-200 text-stone-800 shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Flutuante */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-xl shadow-stone-900/5 animate-in fade-in slide-in-from-top-2 duration-200">
            <ol className="flex flex-col gap-1">
              {portfolioData.navItems.map((item) => {
                const label = t(navKeyMap[item.id] || 'nav.home')
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
                    >
                      <span>{label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  </li>
                )
              })}
            </ol>
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('hero.availability')}
              </span>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-stone-900 underline"
              >
                {t('about.ctaTalk')}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
