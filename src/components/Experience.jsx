import { Globe, Megaphone, MonitorDot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Timeline3 } from './ui/timeline-3'
import { portfolioData } from '../data/portfolioData'

// id do cargo → ícone do selo no avatar
const roleIcons = {
  cor: MonitorDot,
  web: Globe,
  mkt: Megaphone,
}

export default function Experience() {
  const { t } = useTranslation()

  // Agrupa os cargos pelo ano de início, do mais recente para o mais antigo
  const groups = []
  for (const exp of portfolioData.experiences) {
    const event = {
      id: exp.id,
      initials: exp.initials,
      icon: roleIcons[exp.id],
      actor: t(`experience.roles.${exp.id}.title`),
      action: t('experience.at'),
      target: exp.company,
      targetUrl: exp.companyUrl,
      description: t(`experience.roles.${exp.id}.summary`),
      meta: t(`experience.roles.${exp.id}.location`),
      time: t(`experience.roles.${exp.id}.period`),
    }
    const group = groups.find((g) => g.label === exp.year)
    if (group) group.events.push(event)
    else groups.push({ label: exp.year, events: [event] })
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-24 md:py-32 relative bg-[#2B4636] text-[#F4EFEA]"
    >
      <h2 id="experience-title" className="sr-only">
        {t('experience.srTitle')}
      </h2>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Timeline3 groups={groups} />
      </div>
    </section>
  )
}
