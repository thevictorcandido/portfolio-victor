import { ArrowUp } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { personal } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-14 border-t border-stone-200/70 bg-[#F7F4EE] text-stone-500">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Assinatura Editorial & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-display text-lg font-bold text-stone-900">
            {personal.name}
          </span>
          <span className="text-stone-300 hidden sm:inline">|</span>
          <p className="text-xs text-stone-500 font-medium">
            © {CURRENT_YEAR} · Engenharia de Software · PUC Minas
          </p>
        </div>

        {/* Detalhe de Estilo */}
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>Design Editorial Contemporâneo</span>
          <span>✦</span>
          <span>React & Tailwind CSS</span>
        </div>

        {/* Botão de Voltar ao Topo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-semibold text-stone-800 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
        >
          <span>Voltar ao topo</span>
          <ArrowUp className="w-3.5 h-3.5 text-stone-500" />
        </button>

      </div>
    </footer>
  )
}
