import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Textos da página e título da aba, que volta ao do site ao sair
export function useCaseStudy(key) {
  const { t } = useTranslation()
  const c = (path, opts) => t(`caseStudies.${key}.${path}`, opts)
  const list = (path) => c(path, { returnObjects: true })

  useEffect(() => {
    const previous = document.title
    document.title = c('docTitle')
    return () => {
      document.title = previous
    }
  })

  return { c, list }
}
