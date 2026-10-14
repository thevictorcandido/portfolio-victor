import { Server, Brain, Sparkles, CheckCircle2 } from 'lucide-react'
import { BorderBeam } from './ui/border-beam'
import { Marquee } from './ui/marquee'
import {
  PythonIcon,
  JavaIcon,
  NodeIcon,
  PostgresIcon,
  DockerIcon,
  RedisIcon,
  GitIcon,
  OpenAiIcon,
  PyTorchIcon,
  HuggingFaceIcon,
  LangChainIcon,
} from './TechIcons'
import { portfolioData } from '../data/portfolioData'

// Mapeamento de ícones oficiais para cada tecnologia
const techIconMap = {
  Python: PythonIcon,
  Java: JavaIcon,
  'Node.js': NodeIcon,
  PostgreSQL: PostgresIcon,
  Docker: DockerIcon,
  Redis: RedisIcon,
  'Git & GitHub': GitIcon,
  'OpenAI API': OpenAiIcon,
  LangChain: LangChainIcon,
  PyTorch: PyTorchIcon,
  'Hugging Face': HuggingFaceIcon,
}

export default function Skills() {
  const { skillsCategories } = portfolioData

  return (
    <section
      id="skills"
      className="py-24 md:py-32 relative bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            <span>04</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>Habilidades & Repertório</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            Backend no centro, <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              potencializado por inteligência artificial.
            </span>
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed font-normal max-w-2xl">
            Minha atuação é concentrada no desenvolvimento de sistemas sólidos de backend, microsserviços e APIs, combinados à aplicação estratégica de modelos de IA generativa e análise de dados.
          </p>
        </div>

        {/* Cards de Categorias no Modelo 21st.dev (Logo Cloud 15 + BorderBeam + Marquee) */}
        <div className="space-y-12 md:space-y-16">
          {skillsCategories.map((cat) => {
            const isBackend = cat.id === 'backend'
            const Icon = isBackend ? Server : Brain
            const beamColor = isBackend ? '#10B981' : '#8B5CF6'
            const badgeBg = isBackend
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
              : 'bg-purple-50 text-purple-800 border-purple-200/70'

            return (
              <div
                key={cat.id}
                className="relative rounded-3xl border border-stone-200/90 bg-white/95 backdrop-blur-md p-8 sm:p-10 md:p-12 shadow-xl overflow-hidden group"
              >
                {/* BorderBeam animado contornando o card (Modelo Logo Cloud 15) */}
                <BorderBeam
                  duration={isBackend ? 8 : 10}
                  size={140}
                  colorFrom="#1c1917"
                  colorTo={beamColor}
                  borderWidth={2}
                />

                {/* Cabeçalho do Card com Light-Sweep no Título */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isBackend ? 'bg-emerald-100/70 text-emerald-800' : 'bg-purple-100/70 text-purple-800'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 tracking-tight">
                          <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900"
                            style={{
                              backgroundImage: isBackend
                                ? 'linear-gradient(90deg, #1c1917 0%, #10B981 50%, #1c1917 100%)'
                                : 'linear-gradient(90deg, #1c1917 0%, #8B5CF6 50%, #1c1917 100%)',
                              backgroundSize: '200% auto',
                            }}
                          >
                            {cat.category}
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Badge de Destaque de Foco */}
                  <div className="self-start md:self-auto">
                    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${badgeBg}`}>
                      <span className={`w-2 h-2 rounded-full ${isBackend ? 'bg-emerald-500 animate-pulse' : 'bg-purple-500 animate-pulse'}`} />
                      <span>{cat.focusBadge}</span>
                    </span>
                  </div>
                </div>

                {/* Marquee Contínuo de Logos (Modelo Logo Cloud 15) */}
                <div className="mb-8 py-3 bg-stone-50/70 rounded-2xl border border-stone-200/50 overflow-hidden">
                  <Marquee duration={isBackend ? 22 : 26} pauseOnHover={true} gap="2.5rem">
                    {cat.technologies.map((tech) => {
                      const TechIconComp = techIconMap[tech.name] || Sparkles

                      return (
                        <div
                          key={tech.name}
                          className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-stone-200/70 shadow-2xs text-stone-800 shrink-0 select-none hover:shadow-xs transition-shadow"
                        >
                          <TechIconComp className="w-5 h-5 shrink-0" />
                          <span className="text-xs font-bold font-mono tracking-tight text-stone-900">
                            {tech.name}
                          </span>
                        </div>
                      )
                    })}
                  </Marquee>
                </div>

                {/* Grid Interno Detalhado das Tecnologias & Papéis */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {cat.technologies.map((tech) => {
                    const TechIconComp = techIconMap[tech.name] || CheckCircle2

                    return (
                      <div
                        key={tech.name}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-stone-200/70 hover:border-stone-300 hover:bg-white hover:shadow-sm transition-all group/item flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                          <TechIconComp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                            {tech.name}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {tech.role}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
