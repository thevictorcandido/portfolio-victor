import { useState } from 'react'
import { ArrowUpRight, ChevronUp, ChevronDown, Terminal, Globe, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export default function Projects() {
  const { t } = useTranslation()
  const { projects } = portfolioData
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Obter dados dinâmicos traduzidos para cada projeto
  const getProjectData = (proj) => {
    if (proj.id === 'proj-gvs') {
      return {
        badge: t('projects.gvsBadge'),
        tagline: t('projects.gvsTagline'),
        description: t('projects.gvsDesc'),
      }
    }
    return {
      badge: t('projects.xulambisBadge'),
      tagline: t('projects.xulambisTagline'),
      description: t('projects.xulambisDesc'),
    }
  }

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho da Seção com Toque Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-stone-200/70">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              <span>02</span>
              <span className="w-8 h-px bg-stone-300" />
              <span>{t('projects.tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
              {t('projects.headline')} <br />
              <span className="font-display font-light text-stone-700 italic inline-block mt-1">
                {t('projects.headlineHighlight')}
              </span>
            </h2>
          </div>

          {/* Navegação por Pílulas e Controles de Pilha 3D */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/90 border border-stone-200/80 rounded-full p-1 shadow-2xs">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-stone-950 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/70'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')} · {proj.title.split('—')[0].trim()}
                </button>
              ))}
            </div>

            {/* Setas Verticais de Navegação */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={t('projects.prev')}
                className="p-2 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={t('projects.next')}
                className="p-2 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pilha Vertical de Cards com Efeito de Profundidade */}
        <div className="relative min-h-[580px] md:min-h-[540px]">
          {projects.map((proj, idx) => {
            const isCurrent = idx === activeIndex
            const isBehind = idx === (activeIndex + 1) % projects.length
            const transData = getProjectData(proj)

            return (
              <div
                key={proj.id}
                style={{
                  zIndex: isCurrent ? 20 : isBehind ? 10 : 0,
                  transform: isCurrent
                    ? 'translateY(0px) scale(1)'
                    : isBehind
                    ? 'translateY(28px) scale(0.96)'
                    : 'translateY(56px) scale(0.92)',
                  opacity: isCurrent ? 1 : isBehind ? 0.65 : 0,
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-3xl bg-white border border-stone-200/90 shadow-xl overflow-hidden p-6 sm:p-10"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
                  
                  {/* Coluna Esquerda: Texto, Metadados e Ações */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Badge e Categoria */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200/70 inline-flex items-center gap-1.5">
                          {proj.id === 'proj-gvs' ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ) : (
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span>{transData.badge}</span>
                        </span>
                      </div>

                      {/* Título do Projeto */}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight leading-snug mb-2">
                        {proj.title}
                      </h3>

                      {/* Tagline / Subtítulo */}
                      <p className="text-xs sm:text-sm font-medium text-stone-500 mb-4">
                        {transData.tagline}
                      </p>

                      {/* Descrição Detalhada */}
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                        {transData.description}
                      </p>
                    </div>

                    {/* Tags de Tecnologias */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-stone-100 text-stone-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links de Ação */}
                      <div className="flex flex-wrap items-center gap-3">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-950 text-white hover:bg-black transition-all shadow-xs hover:scale-[1.02] cursor-pointer"
                          >
                            <span>{t('projects.viewProject')}</span>
                            <ArrowUpRight className="w-4 h-4 text-stone-300" />
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200/70 text-stone-800 transition-colors border border-stone-200/80 cursor-pointer"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Imagem Real com Moldura e Efeito Visual */}
                  <div className="lg:col-span-7">
                    <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-lg bg-stone-950 group">
                      
                      {/* Barra superior de janela estilo navegador ou terminal */}
                      <div className="bg-[#202024] px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-xs text-stone-400">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="font-mono text-[11px] text-stone-400 truncate max-w-[240px]">
                          {proj.id === 'proj-gvs' ? 'https://grupogvs.com.br' : 'terminal: ~/pucminas/xulambis-pizza'}
                        </span>
                        <div className="flex items-center gap-1.5 text-stone-400">
                          {proj.id === 'proj-gvs' ? (
                            <Globe className="w-3.5 h-3.5" />
                          ) : (
                            <Terminal className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>

                      {/* Imagem Real do Projeto */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-stone-950/10 pointer-events-none" />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
