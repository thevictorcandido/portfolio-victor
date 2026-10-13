import { useState } from 'react'
import { Calendar, MapPin, ArrowUpRight, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Experience() {
  const { experiences } = portfolioData
  // Control which experience cards are expanded
  const [expandedIds, setExpandedIds] = useState(experiences.map((e) => e.id))

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 border-b border-[#232E25]/60 relative bg-[#0C0F0D]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>03</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Carreira & Trajetória</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Onde Já Atuei
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F877C] tracking-wider uppercase">
            Histórico profissional & contribuições
          </p>
        </div>

        {/* Timeline Container (Inspiração Azalim + Pedro Braga) */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12 border-l border-[#232E25]">
          <ol className="space-y-12">
            {experiences.map((exp) => {
              const isExpanded = expandedIds.includes(exp.id)

              return (
                <li key={exp.id} className="relative group">
                  {/* Timeline Glowing Node Marker */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] sm:-left-[47px] lg:-left-[55px] top-1.5 size-3 rounded-full border-2 border-[#84B18F] bg-[#142017] ring-4 ring-[#84B18F]/20 group-hover:bg-[#84B18F] group-hover:scale-125 transition-all"
                  />

                  {/* Experience Card */}
                  <div className="p-6 sm:p-8 rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] transition-colors">
                    
                    {/* Header: Cargo + Empresa + Metadados */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-[#1C261E]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                            {exp.role}
                          </h3>
                          <span className="text-[#8F877C] hidden sm:inline">·</span>
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-lg font-semibold text-[#84B18F] hover:text-[#A7CCAF] transition-colors"
                          >
                            <span>{exp.company}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>

                        <p className="text-sm text-[#B8ADA0] mt-1">
                          {exp.summary}
                        </p>
                      </div>

                      {/* Badges de Período e Localização */}
                      <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 text-xs font-mono text-[#8F877C] shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#17221A] border border-[#2B4231] text-[#ECE5D8]">
                          <Calendar className="w-3.5 h-3.5 text-[#84B18F]" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111613] border border-[#232E25] text-[#8F877C]">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo Expandível: Bullet points de impacto */}
                    <div className="mt-5 space-y-3">
                      {isExpanded && (
                        <ul className="space-y-2.5 text-sm text-[#B8ADA0] leading-relaxed">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#84B18F] mt-2 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Botão de Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(exp.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#8F877C] hover:text-[#84B18F] pt-2 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>Recolher detalhes</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Ver realizações e impacto</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Tecnologias Utilizadas */}
                    <div className="mt-6 pt-5 border-t border-[#1C261E] flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono uppercase text-[#8F877C] mr-1">
                        Stack:
                      </span>
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono rounded-sm bg-[#17221A] border border-[#2B4231] text-[#D8D1C3]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>
                </li>
              )
            })}
          </ol>
        </div>

      </div>
    </section>
  )
}
