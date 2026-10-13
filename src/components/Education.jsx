import { GraduationCap, Award, Calendar } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Education() {
  const { education } = portfolioData

  return (
    <section
      id="education"
      className="py-20 lg:py-28 border-b border-[#232E25]/60 relative bg-[#0C0F0D]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>05</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Educação & Aprendizado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Formação Acadêmica
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F877C] tracking-wider uppercase">
            Fundamentos & desenvolvimento contínuo
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="p-2.5 rounded bg-[#17221A] border border-[#2B4231] text-[#84B18F]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#17221A] border border-[#2B4231] text-xs font-mono text-[#D8D1C3]">
                    <Calendar className="w-3.5 h-3.5 text-[#84B18F]" />
                    {item.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#FAF7F2]">
                  {item.course}
                </h3>
                <p className="text-sm font-mono text-[#84B18F] mt-1 mb-4">
                  {item.institution}
                </p>

                <p className="text-sm text-[#B8ADA0] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C261E] flex items-center gap-2 text-xs font-mono text-[#8F877C]">
                <Award className="w-3.5 h-3.5 text-[#84B18F]" />
                <span>Base em Ciência & Engenharia de Computação</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
