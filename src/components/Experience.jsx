import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Timeline from './ui/timeline'
import { portfolioData } from '../data/portfolioData'

export default function Experience() {
  const { t, i18n } = useTranslation()

  // Do cargo mais antigo para o mais recente, como se lê a linha do tempo
  const items = useMemo(
    () =>
      [...portfolioData.experiences].reverse().map((exp) => ({
        id: exp.id,
        title: t(`experience.roles.${exp.id}.period`),
        text: t(`experience.roles.${exp.id}.title`),
        highlight: exp.company,
        highlightColor: '#259B55',
      })),
    [t],
  )

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative">
      <h2 id="experience-title" className="sr-only">
        {t('experience.srTitle')}
      </h2>
      {/* key: o SplitText reescreve o texto no DOM; trocar de idioma remonta a timeline */}
      <Timeline
        key={i18n.language}
        title="Grupo GVS"
        periodLabel={t('experience.periodLabel')}
        items={items}
        textColor="#F4EFEA"
        mutedTextColor="rgb(244 239 234 / 0.7)"
        activeColor="#259B55"
      />
    </section>
  )
}
