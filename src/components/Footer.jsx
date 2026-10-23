import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { portfolioData } from '../data/portfolioData'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useTranslation()
  const { personal } = portfolioData

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="py-14 border-t border-cream/10 text-cream/55">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Assinatura Editorial & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-display text-lg font-bold text-cream">
            {personal.name}
          </span>
          <span className="text-cream/30 hidden sm:inline">|</span>
          <p className="text-xs text-cream/55 font-medium">
            © {CURRENT_YEAR} · {t('footer.course')} · PUC Minas
          </p>
        </div>

        {/* Detalhe de Estilo */}
        <div className="flex items-center gap-2 text-xs text-cream/45">
          <span>{t('footer.rights')}</span>
          <span>✦</span>
          <span>React & Tailwind CSS</span>
        </div>

        {/* Botão de Voltar ao Topo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-raised hover:bg-cream/5 border border-cream/10 text-xs font-semibold text-cream transition-all shadow-2xs hover:shadow-xs cursor-pointer"
        >
          <span>{t('hero.scrollDown')}</span>
          <ArrowUp className="w-3.5 h-3.5 text-cream/55" />
        </button>

      </div>
    </footer>
  )
}
