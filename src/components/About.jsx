import { ArrowUpRight, GraduationCap, Sparkles, Briefcase, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon, LinkedinIcon } from './Icons'
import { FloatingDock } from './ui/floating-dock'
import { portfolioData } from '../data/portfolioData'

export default function About() {
  const { t } = useTranslation()
  const { personal } = portfolioData

  // Cards que restaram (sem o número de repositórios) adaptados para o formato Floating Dock com i18n
  const dockItems = [
    {
      title: t('about.dock.puc'),
      icon: <GraduationCap className="h-5 w-5 text-ivory/80" />,
      href: "#education",
    },
    {
      title: t('about.dock.ai'),
      icon: <Sparkles className="h-5 w-5 text-ivory/80" />,
      href: "#skills",
    },
    {
      title: t('about.dock.gvs'),
      icon: <Briefcase className="h-5 w-5 text-ivory/80" />,
      href: "#experience",
    },
    {
      title: t('about.dock.github'),
      icon: <GithubIcon className="h-5 w-5 text-ivory/80" />,
      href: personal.social?.github || "https://github.com/thevictorcandido",
    },
    {
      title: t('about.dock.linkedin'),
      icon: <LinkedinIcon className="h-5 w-5 text-ivory/80" />,
      href: personal.social?.linkedin || "https://www.linkedin.com/in/victorcandidoleite/",
    },
    {
      title: t('about.dock.email'),
      icon: <Mail className="h-5 w-5 text-ivory/80" />,
      href: `mailto:${personal.social?.email || "victorcandidoleite@gmail.com"}`,
    },
  ]

  const bioParagraphs = t('about.bioParagraphs', { returnObjects: true })

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative border-t border-b border-ivory/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ivory/55 mb-3">
            <span>01</span>
            <span className="w-8 h-px bg-ivory/25" />
            <span>{t('about.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight leading-tight">
            {t('about.headline')} <br />
            <span className="font-display font-light text-ice italic inline-block mt-1">
              {t('about.headlineHighlight')}
            </span>
          </h2>
        </div>

        {/* Adaptação no estilo Shatlyk1011/team-member-card */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-14">
          
          {/* Card da Foto com moldura editorial. Quadrada: a foto é 3:4 e o terço de
              cima é o forro do ponto de ônibus; com object-bottom o corte sai todo do
              topo e o rosto fica no meio, com o queixo acima da etiqueta */}
          <div className="relative w-full max-w-[320px] lg:w-[360px] lg:max-w-none lg:self-start shrink-0 aspect-square rounded-3xl overflow-hidden border border-ivory/10 shadow-md group bg-ivory/8">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            <img
              src="/vitin ponto de onibus estilo.jpeg"
              alt="Victor Cândido Leite"
              className="h-full w-full object-cover object-bottom duration-700 ease-out group-hover:scale-105"
            />
            {/* Cidade no canto de cima, sobre o fundo; nome e cargo embaixo, com a largura
                toda: lado a lado, no quadrado, os dois quebravam linha e cobriam o queixo */}
            <span className="absolute top-4 right-4 z-20 whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 font-medium text-stone-100 pointer-events-none">
              {t('about.photoCity')}
            </span>
            <div className="absolute bottom-4 left-5 right-5 z-20 text-stone-100 pointer-events-none">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-300 font-sans">
                {t('about.photoRole')}
              </p>
              <p className="text-sm font-bold font-display text-white">
                Victor Cândido Leite
              </p>
            </div>
          </div>

          {/* Coluna de Texto, Frase & Detalhes */}
          <div className="flex-1 flex flex-col justify-between py-2">
            
            {/* Bloco Superior: Nome e Biografia */}
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-ivory/45 uppercase font-sans mb-3">
                {t('about.roleCategory')}
              </p>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-display font-light tracking-tight text-ivory">
                {t('about.nameLight')} <br />
                <span className="font-bold text-ivory">{t('about.nameBold')}</span>
              </h3>

              {/* Texto sobre mim (Biografia) */}
              <div className="mt-6 space-y-4 text-ivory/70 text-sm sm:text-base leading-relaxed font-normal">
                {Array.isArray(bioParagraphs) &&
                  bioParagraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Rodapé do Card: Botão de Ação Circular + Floating Dock dos Cards Restantes */}
            {/* No celular, os dois em coluna e centralizados; a seta tem a altura das duas linhas de texto */}
            <div className="mt-10 pt-6 border-t border-ivory/10 flex flex-col items-center sm:flex-row sm:items-center justify-between gap-6">

              {/* Botão de Conexão Circular no padrão Shatlyk1011 */}
              <a
                href={`mailto:${personal.social?.email || "victorcandidoleite@gmail.com"}`}
                className="group flex items-center gap-3 sm:gap-4 text-ivory/85 hover:text-ivory transition-colors"
              >
                <div className="flex size-8 sm:size-16 shrink-0 items-center justify-center rounded-full border border-ivory/20 bg-carbon-raised group-hover:border-electric group-hover:bg-electric transition-all duration-300 shadow-2xs">
                  <ArrowUpRight
                    className="size-4 sm:size-5 text-ivory/80 transition-all duration-300 group-hover:-rotate-45 group-hover:text-carbon"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold font-display uppercase tracking-wider text-ivory">
                    {t('about.ctaTalk')}
                  </p>
                  <p className="text-xs text-ivory/55 font-sans">
                    {personal.social?.email || "victorcandidoleite@gmail.com"}
                  </p>
                </div>
              </a>

              {/* Floating Dock com os cards que restaram */}
              <div className="self-center sm:self-auto">
                <FloatingDock items={dockItems} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
