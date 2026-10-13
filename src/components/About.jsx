import { Code2, Compass, Layers, Zap, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function About() {
  const { personal, stats } = portfolioData

  const principles = [
    {
      icon: Layers,
      title: 'Arquitetura Modular',
      desc: 'Componentes desacoplados, código sustentável e facilidade para escalar.',
    },
    {
      icon: Zap,
      title: 'Obsessão por Performance',
      desc: 'Carregamento instantâneo, otimização de render e métricas Core Web Vitals.',
    },
    {
      icon: Compass,
      title: 'Design & Usabilidade',
      desc: 'Interfaces que respeitam o usuário: espaçamentos equilibrados, boa tipografia e acessibilidade.',
    },
    {
      icon: Code2,
      title: 'Pragmatismo Técnico',
      desc: 'Escolha da ferramenta certa para cada desafio, priorizando valor e entrega consistente.',
    },
  ]

  return (
    <section
      id="about"
      className="py-20 lg:py-28 border-b border-[#232E25]/60 relative bg-[#0C0F0D]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>01</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Visão & Filosofia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Sobre Mim
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F877C] tracking-wider uppercase">
            Engenharia de Software com Propósito
          </p>
        </div>

        {/* Grid com Bio Editorial + Stats */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          
          {/* Coluna de Texto Editorial */}
          <div className="space-y-6 text-[#ECE5D8]/90 text-base sm:text-lg leading-relaxed">
            {personal.bio.map((paragraph, index) => (
              <p key={index} className="text-[#B8ADA0] leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Quick checklist de princípios */}
            <div className="pt-6 border-t border-[#1C261E] grid sm:grid-cols-2 gap-3">
              {[
                'Desenvolvimento com React & Vite',
                'Design responsivo mobile-first',
                'Boas práticas de acessibilidade (a11y)',
                'Versionamento rigoroso com Git',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#D8D1C3]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#84B18F] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Métricas / Números + Pilares de Trabalho */}
          <div className="space-y-8">
            
            {/* Grid de Estatísticas */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-sm bg-[#111613] border border-[#232E25] hover:border-[#3A5742] transition-colors group"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#FAF7F2] tracking-tight font-mono group-hover:text-[#A7CCAF] transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#8F877C] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Pilares / Filosofia */}
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[#84B18F]">
                Como eu trabalho:
              </p>
              <div className="grid gap-3">
                {principles.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-sm border border-[#232E25] bg-[#111613]/60 hover:bg-[#152218]/80 hover:border-[#2B4231] transition-all flex items-start gap-3.5"
                    >
                      <div className="p-2 rounded bg-[#17221A] border border-[#2B4231] text-[#84B18F] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#FAF7F2]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#B8ADA0] mt-1 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
