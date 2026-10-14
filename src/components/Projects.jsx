import { useState } from 'react'
import { ArrowUpRight, ChevronUp, ChevronDown, ExternalLink, Terminal, Globe, Users } from 'lucide-react'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export default function Projects() {
  const { projects } = portfolioData
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
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
              <span>Portfólio & Criações</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
              Projetos selecionados, <br />
              <span className="font-display font-light text-stone-700 italic inline-block mt-1">
                código vivo & vivência real.
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
                aria-label="Projeto anterior"
                className="p-2 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo projeto"
                className="p-2 rounded-full bg-white border border-stone-200/80 text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Apresentação de Cards Verticais em Perspectiva 3D (Skiper49 Adaptado) */}
        <div
          className="relative min-h-[580px] sm:min-h-[540px] md:min-h-[500px] lg:min-h-[530px]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {projects.map((proj, idx) => {
            const isCurrent = activeIndex === idx
            const isBehind = !isCurrent

            // Cálculo da profundidade vertical para efeito de pilha (3D Inverted Perspective)
            const translateY = isCurrent ? 0 : 42
            const translateZ = isCurrent ? 0 : -75
            const scale = isCurrent ? 1 : 0.94
            const zIndex = isCurrent ? 30 : 10
            const opacity = isCurrent ? 1 : 0.85

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isBehind) setActiveIndex(idx)
                }}
                style={{
                  transform: `translate3d(0px, ${translateY}px, ${translateZ}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`w-full rounded-3xl border border-stone-200/90 bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                  isCurrent ? 'relative pointer-events-auto' : 'absolute top-0 left-0 cursor-pointer hover:opacity-95'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 md:p-10">
                  
                  {/* Coluna Esquerda: Informações e Metadados do Projeto */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Badges de Categoria & Status Real */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200/60">
                          {proj.id === 'proj-gvs' ? (
                            <Globe className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Terminal className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          <span>{proj.category}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                          {proj.id === 'proj-gvs' ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ) : (
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                          <span>{proj.badge}</span>
                        </span>
                      </div>

                      {/* Título do Projeto */}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 tracking-tight leading-snug mb-2">
                        {proj.title}
                      </h3>

                      {/* Tagline / Subtítulo */}
                      <p className="text-xs sm:text-sm font-medium text-stone-500 mb-4">
                        {proj.tagline}
                      </p>

                      {/* Descrição Detalhada */}
                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                        {proj.description}
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
                            <span>Acessar Website Oficial</span>
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
                            <span>Ver no GitHub</span>
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
                        <div className="w-8" />
                      </div>

                      {/* Screenshot Real de Alta Resolução */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>

                      {/* Botão de Abertura Rápida Flutuante */}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md transition-all shadow-md hover:scale-110"
                          title="Abrir em nova aba"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Dica de Interação */}
        <div className="mt-8 text-center text-xs text-stone-400 flex items-center justify-center gap-2">
          <span>✦</span>
          <span>Clique no card de trás ou nos números acima para alternar entre os projetos</span>
          <span>✦</span>
        </div>

      </div>
    </section>
  )
}
