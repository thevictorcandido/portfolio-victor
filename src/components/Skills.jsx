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

const RestIcon = ({ className }) => <Webhook className={`${className} text-ink`} strokeWidth={1.75} />
const PromptIcon = ({ className }) => <Sparkles className={`${className} text-[#1E7A46]`} strokeWidth={1.75} />

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
  backend: 'bg-moss/15 text-moss border-moss/40',
  frontend: 'bg-cream/10 text-cream border-cream/25',
  infra: 'bg-transparent text-cream/70 border-cream/15',
  ai: 'bg-cream text-ink border-cream',
}

export default function Skills() {
  const { t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState(null)
  // Última tecnologia aberta: o painel continua mostrando-a enquanto se fecha
  const [shownKey, setShownKey] = useState(null)
  const panelRef = useRef(null)
  const open = Boolean(selectedKey)

  const select = (key) => {
    setSelectedKey(key)
    if (key) setShownKey(key)
  }

  const items = useMemo(
    () =>
      portfolioData.skills.map((skill) => ({
        ...skill,
        name: t(`skills.items.${skill.key}.name`),
        Icon: techIconMap[skill.key],
      })),
    [t],
  )
  const shown = items.find((item) => item.key === shownKey)

  useEffect(() => {
    if (!selectedKey) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedKey(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedKey])

  // Em tela estreita o painel abre abaixo do globo: quando termina de abrir,
  // rola só o necessário para mostrá-lo
  useEffect(() => {
    if (!selectedKey) return
    const timer = setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const rect = panel.getBoundingClientRect()
      if (rect.bottom > window.innerHeight || rect.top < 0) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        panel.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' })
      }
    }, 480)
    return () => clearTimeout(timer)
  }, [selectedKey])

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">

        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cream/55 mb-3">
            <span>04</span>
            <span className="w-8 h-px bg-cream/25" />
            <span>{t('skills.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-cream tracking-tight leading-tight">
            {t('skills.headline')} <br />
            <span className="font-display font-light text-moss italic inline-block mt-1">
              {t('skills.headlineHighlight')}
            </span>
          </h2>
          <p className="mt-4 text-base text-cream/70 leading-relaxed font-normal max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="relative rounded-3xl border border-cream/10 bg-ink-raised/95 p-4 sm:p-8 md:p-10 shadow-xl">
          {/* Sem seleção: só o globo, centralizado e maior. Com seleção: o globo
              encolhe para a esquerda e o painel entra ao lado (abaixo, no celular). */}
          <div className="skills-layout" data-open={open}>

            {/* Globo */}
            <div className="min-w-0">
              <SkillsGlobe
                items={items}
                selectedKey={selectedKey}
                onSelect={select}
                expanded={!open}
                label={t('skills.globeLabel')}
              />
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-cream/55">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <MousePointerClick className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('skills.hint')}
                </span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-cream/25" aria-hidden="true" />
                <span className="whitespace-nowrap">{t('skills.count', { count: items.length })}</span>
              </div>
            </div>

            {/* Painel: só existe na tela com uma tecnologia escolhida */}
            <div
              ref={panelRef}
              aria-live="polite"
              aria-hidden={!open}
              inert={!open}
              className="skills-panel scroll-mb-6"
            >
              <div className="pt-6 lg:pt-0 lg:min-w-[340px]">
                {shown && (
                  <SkillDetail key={shown.key} skill={shown} onClose={() => select(null)} />
                )}
              </div>
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
    <article className="skill-rise w-full rounded-2xl border border-cream/10 bg-ink p-6 sm:p-7">
      <header className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-cream border border-cream flex items-center justify-center p-2.5 shadow-2xs">
          <Icon className="w-full h-full" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-cream tracking-tight leading-tight">
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
          className="-mr-2 -mt-2 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-cream/45 hover:text-cream hover:bg-cream/12 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      <p className="mt-5 text-sm text-cream/70 leading-relaxed">
        {t(`skills.items.${skill.key}.about`)}
      </p>

      <div className="mt-5 pt-5 border-t border-cream/10">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-moss">
          <span className="w-5 h-px bg-moss" aria-hidden="true" />
          {t('skills.inPractice')}
        </p>
        <p className="mt-2.5 text-[15px] text-cream leading-relaxed">
          {t(`skills.items.${skill.key}.example`)}
        </p>
      </div>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cream/55">
          <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
          {t(`skills.items.${skill.key}.project`)}
        </span>
        {skill.projectUrl && (
          <a
            href={skill.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-moss hover:text-moss-hover underline-offset-4 hover:underline"
          >
            {t('skills.viewProject')}
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </footer>
    </article>
  )
}
