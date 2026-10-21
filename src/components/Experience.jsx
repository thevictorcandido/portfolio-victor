import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { portfolioData } from '../data/portfolioData'

export default function Experience() {
  const { t } = useTranslation()
  const { experiences } = portfolioData
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Mapeamento das chaves de tradução para cada uma das 3 experiências
  const roleKeys = {
    'exp-1': 'cor',
    'exp-2': 'web',
    'exp-3': 'mkt',
  }

  // Acompanhamento suave do progresso do scroll na timeline (padrão timeline-01)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalHeight = rect.height

      const current = windowHeight / 2 - rect.top
      const progress = Math.min(Math.max(current / totalHeight, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative bg-[#F7F4EE] border-t border-b border-stone-200/60 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho da Seção no Estilo Editorial */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            <span>03</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>{t('experience.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            {t('experience.headline')} <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              {t('experience.headlineHighlight')}
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Container da Timeline (padrão shadcnspace/timeline-01) */}
        <div ref={containerRef} className="relative">
          
          {/* Linha vertical base de fundo */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-stone-200/90"
          />

          {/* Linha vertical animada de progresso por scroll */}
          <div
            aria-hidden="true"
            style={{ height: `${scrollProgress * 100}%` }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 bg-stone-900 origin-top transition-all duration-75"
          />

          {/* Marcador flutuante que desce junto do scroll */}
          <div
            aria-hidden="true"
            style={{ top: `${scrollProgress * 100}%` }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 h-4 w-4 rounded-full border-4 border-[#F7F4EE] bg-stone-900 shadow-md md:block hidden transition-all duration-75"
          />

          {/* Lista de itens alternados */}
          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              const rKey = roleKeys[exp.id] || 'cor'
              const roleData = t(`experience.roles.${rKey}`, { returnObjects: true }) || {}

              const roleTitle = roleData.title || exp.role
              const rolePeriod = roleData.period || exp.period
              const roleLocation = roleData.location || exp.location
              const roleSummary = roleData.summary || exp.summary
              const roleCaption = roleData.caption || exp.imageCaption
              const roleBullets = roleData.bullets || exp.bullets
              const roleTechnologies = roleData.technologies || []

              return (
                <div
                  key={exp.id}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 pl-14 md:pl-0"
                >
                  {/* Marcador circular fixo na linha para cada marco */}
                  <span
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 size-3.5 rounded-full bg-white border-2 border-stone-900 ring-4 ring-[#F7F4EE] shadow-xs"
                  />

                  {/* Coluna de Texto & Conteúdo */}
                  <div
                    className={`flex flex-col justify-center z-10 ${
                      isEven ? 'md:items-end md:text-right' : 'md:order-2 md:items-start md:text-left'
                    }`}
                  >
                    <div className="flex flex-col gap-3 max-w-xl">
                      
                      {/* Metadados: Período e Localização */}
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/70 text-xs font-semibold text-stone-800">
                          <Calendar className="w-3.5 h-3.5 text-stone-500" />
                          {rolePeriod}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200/50 text-[11px] font-medium text-stone-600">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {roleLocation}
                        </span>
                      </div>

                      {/* Cargo e Empresa */}
                      <div className="space-y-1 mt-1">
                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight leading-snug">
                          {roleTitle}
                        </h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-stone-950 transition-colors group/link ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span className="underline decoration-stone-300 underline-offset-4 group-hover/link:decoration-stone-900 transition-colors">
                            {exp.company}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/link:text-stone-900 transition-colors" />
                        </a>
                      </div>

                      {/* Resumo da Atuação */}
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal mt-1">
                        {roleSummary}
                      </p>

                      {/* Bullets de Impacto e Responsabilidades */}
                      <ul
                        className={`mt-2 space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed ${
                          isEven ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        {Array.isArray(roleBullets) &&
                          roleBullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className={`flex items-start gap-2.5 ${
                                isEven ? 'md:flex-row-reverse' : 'flex-row'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                      </ul>

                      {/* Tags de Tecnologias & Competências */}
                      <div
                        className={`mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-stone-200/60 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {roleTechnologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white border border-stone-200/80 text-stone-700 shadow-2xs hover:border-stone-400 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Coluna de Imagem */}
                  <div
                    className={`flex items-center justify-center z-10 ${
                      isEven ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-500 bg-stone-100 group">
                      <img
                        src={exp.image}
                        alt={roleData.imageAlt || roleTitle}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          exp.objectPosition || 'object-center'
                        }`}
                        loading="lazy"
                      />

                      {/* Overlay sutil ao passar o cursor */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Badge com legenda da imagem */}
                      {roleCaption && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-[11px] font-medium text-stone-100 border border-white/10 shadow-sm">
                            {roleCaption}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
