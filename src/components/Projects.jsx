import { useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronUp, ChevronDown, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'
import { Link } from '../lib/router'

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

  // Textos traduzidos do projeto: id "proj-gvs" → chaves projects.gvsTitle, gvsBadge...
  const getProjectData = (proj) => {
    const key = proj.id.replace('proj-', '')
    return {
      title: t(`projects.${key}Title`),
      badge: t(`projects.${key}Badge`),
      tagline: t(`projects.${key}Tagline`),
      description: t(`projects.${key}Desc`),
      tags: t(`projects.${key}Tags`, { returnObjects: true }),
    }
  }

  // Pílulas e setas só fazem sentido com mais de um projeto
  const hasNavigation = projects.length > 1

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho da Seção com Toque Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-ivory/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ivory/55 mb-3">
              <span>02</span>
              <span className="w-8 h-px bg-ivory/25" />
              <span>{t('projects.tag')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight leading-tight">
              {t('projects.headline')} <br />
              <span className="font-display font-light text-ice italic inline-block mt-1">
                {t('projects.headlineHighlight')}
              </span>
            </h2>
          </div>

          {/* Navegação por Pílulas e Controles de Pilha 3D */}
          {hasNavigation && (
            <div className="flex items-center gap-3 min-w-0">
              {/* Com muitos projetos a barra não cabe no celular: rola na horizontal */}
              <div className="flex items-center max-w-full overflow-x-auto [scrollbar-width:none] bg-carbon-raised/90 border border-ivory/10 rounded-full p-1 shadow-2xs">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'bg-electric text-carbon shadow-xs'
                        : 'text-ivory/70 hover:text-ivory hover:bg-ivory/8'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')} · {getProjectData(proj).title.split('—')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Setas Verticais de Navegação */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={t('projects.prev')}
                  className="p-2 rounded-full bg-carbon-raised border border-ivory/10 text-ivory/80 hover:text-ivory hover:bg-ivory/8 transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={t('projects.next')}
                  className="p-2 rounded-full bg-carbon-raised border border-ivory/10 text-ivory/80 hover:text-ivory hover:bg-ivory/8 transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pilha Vertical de Cards com Efeito de Profundidade. Todos ocupam a
            mesma célula da grade: a pilha fica com a altura do card mais alto,
            em vez de uma altura fixa que cortava o conteúdo em telas médias */}
        <div className="grid">
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
                className="[grid-area:1/1] relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-3xl bg-carbon-raised border border-ivory/10 shadow-xl overflow-hidden p-6 sm:p-10"
              >
                {/* grid-cols-1 e min-w-0: sem eles a coluna crescia até o min-content da barra
                    de janela (334 px) e o texto e a imagem estouravam o card no celular */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
                  
                  {/* Coluna Esquerda: Texto, Metadados e Ações */}
                  <div className="min-w-0 lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Badge e Categoria */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ivory/8 text-ivory border border-ivory/10 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                          <span>{transData.badge}</span>
                        </span>
                      </div>

                      {/* Título do Projeto */}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight leading-snug mb-2">
                        {transData.title}
                      </h3>

                      {/* Tagline / Subtítulo */}
                      <p className="text-xs sm:text-sm font-medium text-ivory/55 mb-4">
                        {transData.tagline}
                      </p>

                      {/* Descrição Detalhada */}
                      <p className="text-sm sm:text-base text-ivory/70 leading-relaxed font-normal">
                        {transData.description}
                      </p>
                    </div>

                    {/* Tags de Tecnologias */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {transData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-ivory/8 text-ivory/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links de Ação: com estudo de caso, ele é o botão principal */}
                      <div className="flex flex-wrap items-center gap-3">
                        {proj.caseStudy && (
                          <Link
                            href={proj.caseStudy}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-electric text-carbon hover:bg-electric-hover transition-all shadow-xs hover:scale-[1.02] cursor-pointer"
                          >
                            <span>{t('projects.caseStudy')}</span>
                            <ArrowRight className="w-4 h-4 text-carbon/60" />
                          </Link>
                        )}

                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              proj.caseStudy
                                ? 'bg-ivory/8 hover:bg-ivory/12 text-ivory border border-ivory/10'
                                : 'bg-electric text-carbon hover:bg-electric-hover shadow-xs hover:scale-[1.02]'
                            }`}
                          >
                            <span>{t('projects.viewProject')}</span>
                            <ArrowUpRight className={`w-4 h-4 ${proj.caseStudy ? 'text-ivory/60' : 'text-carbon/60'}`} />
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-ivory/8 hover:bg-ivory/12 text-ivory transition-colors border border-ivory/10 cursor-pointer"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Coluna Direita: Imagem Real com Moldura e Efeito Visual */}
                  <div className="min-w-0 lg:col-span-7">
                    <div className="relative rounded-2xl overflow-hidden border border-ivory/10 shadow-lg bg-carbon group">
                      
                      {/* Barra superior de janela estilo navegador ou terminal */}
                      <div className="bg-[#131417] px-4 py-2.5 flex items-center justify-between gap-3 border-b border-white/10 text-xs text-ivory/45">
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
                          <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
                          <span className="w-2.5 h-2.5 rounded-full bg-electric" />
                        </div>
                        <span className="min-w-0 flex-1 text-center font-mono text-[11px] text-ivory/45 truncate">
                          {proj.liveUrl ?? proj.address}
                        </span>
                        <div className="flex shrink-0 items-center gap-1.5 text-ivory/45">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Imagem Real do Projeto: 16:9, a proporção dos prints (16:10 cortava as laterais) */}
                      <div className="relative aspect-video w-full overflow-hidden bg-carbon">
                        <img
                          src={proj.image}
                          alt={transData.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-stone-950/10 pointer-events-none" />
                        {/* A imagem também abre o estudo de caso; fora do Tab, que já tem o botão */}
                        {proj.caseStudy && (
                          <Link href={proj.caseStudy} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
                        )}
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
