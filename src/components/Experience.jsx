import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FeaturesWithPanel } from './ui/features-with-panel'
import { MediaIllustration, OperationsIllustration, WebIllustration } from './ExperienceIllustrations'
import { portfolioData } from '../data/portfolioData'

// id do cargo em portfolioData.experiences → ilustração animada do painel
const illustrations = {
  cor: <OperationsIllustration />,
  web: <WebIllustration />,
  mkt: <MediaIllustration />,
}

export default function Experience() {
  const { t } = useTranslation()

  // Do cargo atual para o mais antigo: o atual já abre selecionado
  const items = useMemo(
    () =>
      portfolioData.experiences.map((exp) => ({
        id: exp.id,
        title: t(`experience.roles.${exp.id}.title`),
        meta: `${t(`experience.roles.${exp.id}.period`)} · ${exp.company}`,
        description: t(`experience.roles.${exp.id}.summary`),
        media: illustrations[exp.id],
        alt: t(`experience.roles.${exp.id}.mediaAlt`),
      })),
    [t],
  )

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32 relative border-t border-cream/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <FeaturesWithPanel
          items={items}
          header={
            <div className="mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cream/55 mb-3">
                <span>03</span>
                <span className="w-8 h-px bg-cream/25" />
                <span>{t('experience.tag')}</span>
              </div>
              <h2 id="experience-title" className="text-3xl sm:text-5xl font-display font-bold text-cream tracking-tight leading-tight">
                {t('experience.headline')} <br />
                <span className="font-display font-light text-moss italic inline-block mt-1">
                  {t('experience.headlineHighlight')}
                </span>
              </h2>
            </div>
          }
        />
      </div>
    </section>
  )
}
