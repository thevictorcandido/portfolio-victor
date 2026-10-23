import { GraduationCap, Calendar, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { portfolioData } from '../data/portfolioData'

export default function Education() {
  const { t } = useTranslation()
  const { education } = portfolioData

  return (
    <section
      id="education"
      className="py-24 md:py-32 relative border-t border-b border-cream/10"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cream/55 mb-3">
            <span>05</span>
            <span className="w-8 h-px bg-cream/25" />
            <span>{t('education.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-cream tracking-tight leading-tight">
            {t('education.headline')} <br />
            <span className="font-display font-light text-moss italic inline-block mt-1">
              {t('education.headlineHighlight')}
            </span>
          </h2>
        </div>

        {/* Grid de Formação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {education.map((item) => {
            const isPuc = item.id === 'puc'
            const courseTitle = isPuc ? t('education.degree') : t('education.continuous.course')
            const institution = isPuc ? t('education.institution') : t('education.continuous.institution')
            const period = isPuc ? t('education.period') : t('education.continuous.period')
            const description = isPuc ? t('education.desc') : t('education.continuous.desc')

            return (
              <div
                key={item.id}
                className="p-8 sm:p-10 rounded-3xl bg-ink-raised/90 border border-cream/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cream/8 flex items-center justify-center text-cream">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/8 text-xs font-semibold text-cream/80">
                      <Calendar className="w-3.5 h-3.5 text-cream/55" />
                      {period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-cream mb-1">
                    {courseTitle}
                  </h3>
                  <p className="text-sm font-semibold text-cream/70 mb-4">
                    {institution}
                  </p>

                  <p className="text-sm text-cream/70 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-cream/10 flex items-center gap-2 text-xs text-cream/55 font-medium">
                  <BookOpen className="w-4 h-4 text-cream/45" />
                  <span>
                    {isPuc ? t('education.coursesTitle') : t('education.continuous.footer')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
