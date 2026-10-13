import { ArrowUp, Terminal, Heart } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Footer() {
  const { personal } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 border-t border-[#232E25] bg-[#090C0A] text-[#8F877C]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FAF7F2]">
            <span className="w-2 h-2 rounded-full bg-[#84B18F]" />
            <span>{personal.name}</span>
          </div>
          <span className="text-[#3A5742] hidden sm:inline">|</span>
          <p className="text-xs font-mono">
            © {new Date().getFullYear()} · Todos os direitos reservados.
          </p>
        </div>

        {/* Center: Tech Palette Indicator */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#8F877C]">
          <span>Tema:</span>
          <span className="inline-block w-3 h-3 rounded-full bg-[#1F3023] border border-[#3A5742]" title="Verde Musgo Escuro" />
          <span className="inline-block w-3 h-3 rounded-full bg-[#FAF7F2] border border-[#232E25]" title="Branco Bege" />
          <span className="inline-block w-3 h-3 rounded-full bg-[#0C0F0D] border border-[#3A5742]" title="Quase Preto" />
          <span className="ml-1 text-[#B8ADA0]">React + Vite</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#232E25] bg-[#111613] text-xs font-mono uppercase tracking-wider text-[#FAF7F2] hover:border-[#4B6F55] hover:text-[#A7CCAF] hover:bg-[#17221A] transition-all"
        >
          <span>Topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  )
}
