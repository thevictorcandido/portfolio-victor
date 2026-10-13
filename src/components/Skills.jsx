import { Code, Database, Wrench, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Skills() {
  const { skillsCategories } = portfolioData

  const categoryIcons = {
    'Frontend & Interfaces': Code,
    'Backend & Dados': Database,
    'Ferramentas & DevOps': Wrench,
  }

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 border-b border-[#232E25]/60 relative bg-[#0C0F0D]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>04</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Conhecimento Técnico</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Stack & Habilidades
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F877C] tracking-wider uppercase">
            Tecnologias, frameworks e ferramentas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsCategories.map((group, idx) => {
            const Icon = categoryIcons[group.category] || Code

            return (
              <div
                key={idx}
                className="p-6 rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded bg-[#17221A] border border-[#2B4231] text-[#84B18F]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FAF7F2]">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#B8ADA0] mb-6 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills Pills (Estilo Azalim com Tag Dupla) */}
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <li key={sIdx}>
                        <div
                          title={`${skill.name} — ${skill.level}`}
                          className="inline-flex items-center border border-[#232E25] rounded-sm text-xs font-mono transition-transform hover:scale-105 select-none overflow-hidden"
                        >
                          <span className="bg-[#17221A] text-[#FAF7F2] px-2.5 py-1 font-medium border-r border-[#232E25]">
                            {skill.name}
                          </span>
                          <span className="bg-[#111613] text-[#A7CCAF] px-2 py-1 text-[11px]">
                            {skill.badge}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C261E] flex items-center justify-between text-[11px] font-mono text-[#8F877C]">
                  <span>{group.skills.length} competências</span>
                  <span className="text-[#84B18F]">● Atualizado</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
