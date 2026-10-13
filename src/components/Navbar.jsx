import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detect active section on scroll
      const sections = portfolioData.navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0C0F0D]/85 backdrop-blur-md border-b border-[#232E25]/80 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Monogram / Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-wider uppercase text-[#ECE5D8] hover:text-[#A7CCAF] transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#17221A] border border-[#2B4231] text-xs font-semibold text-[#84B18F] group-hover:border-[#4B6F55] transition-colors">
            VL
          </span>
          <span className="font-semibold tracking-tight text-sm">
            Victor<span className="text-[#84B18F]">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <ol className="flex items-center gap-6">
            {portfolioData.navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`group flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 py-1 ${
                      isActive
                        ? 'text-[#FAF7F2] font-medium'
                        : 'text-[#B8ADA0] hover:text-[#FAF7F2]'
                    }`}
                  >
                    <span
                      className={`text-[10px] transition-colors ${
                        isActive ? 'text-[#84B18F]' : 'text-[#8F877C] group-hover:text-[#84B18F]'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#84B18F] ml-0.5 animate-pulse" />
                    )}
                  </a>
                </li>
              )
            })}
          </ol>

          {/* Quick CTA - Resume */}
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono tracking-wider uppercase border border-[#2B4231] bg-[#142017]/80 text-[#ECE5D8] hover:bg-[#1F3023] hover:border-[#4B6F55] hover:text-[#FAF7F2] transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#84B18F]" />
            <span>Currículo</span>
            <ArrowUpRight className="w-3 h-3 text-[#8F877C]" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm border border-[#232E25] bg-[#111613] text-[#ECE5D8] hover:text-[#FAF7F2] hover:border-[#3A5742] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#232E25] bg-[#0C0F0D]/95 backdrop-blur-xl px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <ol className="flex flex-col gap-4">
            {portfolioData.navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#1A221C] text-sm font-mono uppercase tracking-wider text-[#ECE5D8] hover:text-[#84B18F]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-[#84B18F]">{item.number}</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#8F877C]" />
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-6 pt-4 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-mono text-[#B8ADA0]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84B18F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4B6F55]"></span>
              </span>
              Disponível para projetos
            </span>

            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase border border-[#2B4231] bg-[#142017] text-[#ECE5D8] rounded-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#84B18F]" />
              CV
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
