import { GraduationCap, Calendar, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { portfolioData } from '../data/portfolioData'

export default function Education() {
  const { t } = useTranslation()
  const { education } = portfolioData

  return (
    <section
      id="education"
      className="py-24 md:py-32 relative bg-[#F7F4EE] border-t border-b border-stone-200/50"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            <span>05</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>{t('education.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            {t('education.headline')} <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              {t('education.headlineHighlight')}
            </span>
          </h2>
        </div>

        {/* Grid de Formação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {education.map((item, idx) => {
            const isPuc = idx === 0
            const courseTitle = isPuc ? t('education.degree') : item.course
            const institution = isPuc ? t('education.institution') : item.institution
            const period = isPuc ? t('education.period') : item.period
            const description = isPuc ? t('education.desc') : item.description

            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-stone-200/70 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-xs font-semibold text-stone-700">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      {period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-stone-900 mb-1">
                    {courseTitle}
                  </h3>
                  <p className="text-sm font-semibold text-stone-600 mb-4">
                    {institution}
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <BookOpen className="w-4 h-4 text-stone-400" />
                  <span>
                    {isPuc ? t('education.coursesTitle') : 'Base sólida em Ciência e Engenharia de Computação'}
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
