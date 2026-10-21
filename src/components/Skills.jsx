import { Server, Brain, Sparkles, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
            <span>{t('skills.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            {t('skills.headline')} <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              {t('skills.headlineHighlight')}
            </span>
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed font-normal max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Cards de Categoria inspirados no Logo Cloud 15 */}
        <div className="space-y-12">
          {skillsCategories.map((cat) => {
            const isBackend = cat.id === 'backend'
            const Icon = isBackend ? Server : Brain
            const beamColor = isBackend ? '#10B981' : '#8B5CF6'
            const badgeBg = isBackend
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
              : 'bg-purple-50 text-purple-800 border-purple-200/70'

            const categoryTitle = isBackend ? t('skills.backendCategory') : t('skills.aiCategory')
            const categoryDesc = isBackend ? t('skills.backendDesc') : t('skills.aiDesc')
            const categoryBadge = isBackend ? t('skills.backendBadge') : t('skills.aiBadge')

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
                            {categoryTitle}
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                        {categoryDesc}
                      </p>
                    </div>
                  </div>

                  {/* Badge de Destaque */}
                  <span className={`self-start md:self-auto px-3.5 py-1.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 ${badgeBg}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{categoryBadge}</span>
                  </span>
                </div>

                {/* Carrossel Infinito de Logos / Tecnologias (Marquee) */}
                <div className="relative py-4 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <Marquee pauseOnHover className="[--duration:28s]">
                    {cat.technologies.map((tech) => {
                      const TechIcon = techIconMap[tech.name] || CheckCircle2

                      return (
                        <div
                          key={tech.name}
                          className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-stone-50/80 hover:bg-stone-100/90 border border-stone-200/70 transition-all duration-300 hover:scale-105 shadow-2xs group/tech cursor-default mx-2"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center p-1.5 shadow-2xs group-hover/tech:border-stone-400 transition-colors">
                            <TechIcon className="w-full h-full" />
                          </div>
                          <div>
                            <p className="text-sm font-bold font-display text-stone-900">
                              {tech.name}
                            </p>
                            <p className="text-[11px] text-stone-500 font-medium">
                              {t(`skills.techRoles.${tech.key}`)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Marquee>
                </div>

                {/* Grid Responsivo das Tecnologias da Categoria */}
                <div className="mt-8 pt-6 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {cat.technologies.map((tech) => {
                    const TechIcon = techIconMap[tech.name] || CheckCircle2

                    return (
                      <div
                        key={tech.name}
                        className="p-3.5 rounded-xl bg-stone-50/60 hover:bg-white border border-stone-200/60 transition-all duration-200 hover:shadow-2xs text-center flex flex-col items-center justify-center gap-2 group/card"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center p-1 group-hover/card:scale-110 transition-transform">
                          <TechIcon className="w-full h-full" />
                        </div>
                        <div>
                          <p className="text-xs font-bold font-display text-stone-900">
                            {tech.name}
                          </p>
                          <p className="text-[10px] text-stone-500 line-clamp-1">
                            {t(`skills.techRoles.${tech.key}`)}
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
