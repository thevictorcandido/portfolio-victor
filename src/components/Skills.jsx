import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, FolderGit2, MousePointerClick, Sparkles, Webhook, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SkillsGlobe from './SkillsGlobe'
import {
  PythonIcon,
  JavaIcon,
  SpringIcon,
  NodeIcon,
  JUnitIcon,
  GitIcon,
  HtmlIcon,
  CssIcon,
  JavaScriptIcon,
  ReactIcon,
  TailwindIcon,
  WordPressIcon,
  VercelIcon,
  HuggingFaceIcon,
} from './TechIcons'
import { portfolioData } from '../data/portfolioData'

const RestIcon = ({ className }) => <Webhook className={`${className} text-stone-700`} strokeWidth={1.75} />
const PromptIcon = ({ className }) => <Sparkles className={`${className} text-[#7C3AED]`} strokeWidth={1.75} />

// key de portfolioData.skills → logo
const techIconMap = {
  python: PythonIcon,
  java: JavaIcon,
  spring: SpringIcon,
  nodejs: NodeIcon,
  junit: JUnitIcon,
  rest: RestIcon,
  git: GitIcon,
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavaScriptIcon,
  react: ReactIcon,
  tailwind: TailwindIcon,
  wordpress: WordPressIcon,
  vercel: VercelIcon,
  huggingface: HuggingFaceIcon,
  prompt: PromptIcon,
}

const categoryStyles = {
  backend: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
  frontend: 'bg-sky-50 text-sky-800 border-sky-200/70',
  infra: 'bg-stone-100 text-stone-700 border-stone-200',
  ai: 'bg-purple-50 text-purple-800 border-purple-200/70',
}

export default function Skills() {
  const { t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState(null)
  const panelRef = useRef(null)

  const items = useMemo(
    () =>
      portfolioData.skills.map((skill) => ({
        ...skill,
        name: t(`skills.items.${skill.key}.name`),
        Icon: techIconMap[skill.key],
      })),
    [t],
  )
  const selected = items.find((item) => item.key === selectedKey)

  useEffect(() => {
    if (!selectedKey) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedKey(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedKey])

  // Em tela estreita o painel fica abaixo do globo: rola só o necessário para mostrá-lo
  useEffect(() => {
    if (!selectedKey || !panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    if (rect.bottom > window.innerHeight || rect.top < 0) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      panelRef.current.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [selectedKey])

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-12 md:mb-16">
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

        <div className="relative rounded-3xl border border-stone-200/90 bg-white/95 p-4 sm:p-8 md:p-10 shadow-xl">
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 lg:gap-10 items-center">

            {/* Globo */}
            <div>
              <SkillsGlobe
                items={items}
                selectedKey={selectedKey}
                onSelect={setSelectedKey}
                label={t('skills.globeLabel')}
              />
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <MousePointerClick className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('skills.hint')}
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                <span className="whitespace-nowrap">{t('skills.count', { count: items.length })}</span>
              </div>
            </div>

            {/* Painel: sobe com fade a cada tecnologia escolhida */}
            <div ref={panelRef} aria-live="polite" className="min-h-[300px] flex scroll-mb-6">
              {selected ? (
                <SkillDetail key={selected.key} skill={selected} onClose={() => setSelectedKey(null)} />
              ) : (
                <div key="empty" className="skill-rise m-auto max-w-xs text-center py-10">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#EBF1ED] text-[#2B4636] flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="font-display font-bold text-stone-900 text-lg">{t('skills.emptyTitle')}</p>
                  <p className="mt-2 text-sm text-stone-500 leading-relaxed">{t('skills.emptyBody')}</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

function SkillDetail({ skill, onClose }) {
  const { t } = useTranslation()
  const Icon = skill.Icon

  return (
    <article className="skill-rise w-full rounded-2xl border border-stone-200/80 bg-[#FAF8F5] p-6 sm:p-7">
      <header className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-stone-200 flex items-center justify-center p-2.5 shadow-2xs">
          <Icon className="w-full h-full" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            {skill.name}
          </h3>
          <span className={`mt-1.5 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${categoryStyles[skill.category]}`}>
            {t(`skills.categories.${skill.category}`)}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('skills.close')}
          className="-mr-2 -mt-2 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      <p className="mt-5 text-sm text-stone-600 leading-relaxed">
        {t(`skills.items.${skill.key}.about`)}
      </p>

      <div className="mt-5 pt-5 border-t border-stone-200/80">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#2B4636]">
          <span className="w-5 h-px bg-[#2B4636]" aria-hidden="true" />
          {t('skills.inPractice')}
        </p>
        <p className="mt-2.5 text-[15px] text-stone-800 leading-relaxed">
          {t(`skills.items.${skill.key}.example`)}
        </p>
      </div>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
          <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
          {t(`skills.items.${skill.key}.project`)}
        </span>
        {skill.projectUrl && (
          <a
            href={skill.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2B4636] hover:text-[#3A5C47] underline-offset-4 hover:underline"
          >
            {t('skills.viewProject')}
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </footer>
    </article>
  )
}
