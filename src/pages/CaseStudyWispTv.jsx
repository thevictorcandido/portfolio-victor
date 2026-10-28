import { ArrowDown, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { FeaturesWithPanel } from '../components/ui/features-with-panel'
import {
  CaseClosing,
  CaseHero,
  NextSteps,
  Section,
  SectionHeader,
  StackAndTeam,
  StatStrip,
  Table,
} from '../components/case-study/blocks'
import { useCaseStudy } from '../components/case-study/useCaseStudy'

// Estudo de caso do WISP TV (/projetos/wisp-tv): app Android TV corporativo,
// sem demo pública nem código aberto. Telas e vídeo vêm do próprio app no
// emulador, com dados fictícios; textos em caseStudies.wisptv.

const IMG = '/projects/wisp-tv/'
const FRAME = 'WISP TV · Android TV · emulador com dados fictícios'

// Quem fala com quem: o Mermaid do estudo original, em caixas
function Flow({ c }) {
  const box = 'rounded-xl border border-ivory/15 bg-carbon px-4 py-3 text-sm text-ivory/85 leading-snug'
  return (
    <>
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
        <div className="rounded-2xl border border-ivory/10 bg-carbon-raised p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ivory/55">{c('solution.flowOffice')}</p>
          <div className="mt-4 space-y-2">
            <div className={box}>{c('solution.flow.remote')}</div>
            <ArrowDown className="mx-auto w-4 h-4 text-ivory/40" aria-hidden="true" />
            <div className={`${box} border-electric/50`}>{c('solution.flow.tv')}</div>
          </div>
        </div>
        <ArrowLeftRight className="hidden lg:block w-6 h-6 text-ivory/40" aria-hidden="true" />
        <ArrowDown className="lg:hidden mx-auto w-6 h-6 text-ivory/40" aria-hidden="true" />
        <div className="rounded-2xl border border-ice/40 bg-carbon-raised p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ice">{c('solution.flowNetwork')}</p>
          <div className="mt-4 space-y-2">
            <div className={box}>{c('solution.flow.dashboards')}</div>
            <div className={box}>
              {c('solution.flow.alerts')}
              <span className="mt-1 flex items-center gap-1.5 text-xs text-ivory/55">
                <ArrowRight className="w-3 h-3 rotate-180" aria-hidden="true" />
                {c('solution.flow.operator')}
              </span>
            </div>
            <div className={`${box} border-dashed text-ivory/60`}>{c('solution.flow.external')}</div>
          </div>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm text-ivory/55 leading-relaxed">{c('solution.flow.poll')}</p>
    </>
  )
}

export default function CaseStudyWispTv() {
  const { c, list } = useCaseStudy('wisptv')

  const screens = list('screens.items').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}menu.webp`} frame={FRAME} />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 -mt-8 pb-12">
        <p className="max-w-3xl text-xs text-ivory/45 leading-relaxed">{c('demoNote')}</p>
      </div>
      <StatStrip stats={list('stats')} />
      <p className="max-w-6xl mx-auto px-6 sm:px-8 -mt-6 pb-10 text-xs text-ivory/45">{c('statsNote')}</p>

      {/* 01 · problema */}
      <Section id="problema">
        <SectionHeader num="01" eyebrow={c('problem.eyebrow')} title={c('problem.title')}>
          {c('problem.body')}
        </SectionHeader>
        <h3 className="mt-12 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('problem.optionsTitle')}</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {list('problem.options').map((option) => (
            <li key={option.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h4 className="text-lg font-display font-bold text-ivory">{option.title}</h4>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{option.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 02 · solução */}
      <Section id="solucao">
        <SectionHeader num="02" eyebrow={c('solution.eyebrow')} title={c('solution.title')}>
          {c('solution.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list('solution.features').map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-lg font-display font-bold text-ivory">{feature.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-20 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('solution.flowTitle')}</h3>
        <Flow c={c} />
      </Section>

      {/* 03 · telas e vídeo: tópicos em cima, mídia grande embaixo */}
      <Section id="telas">
        <FeaturesWithPanel
          items={screens}
          mediaAspect="aspect-video"
          layout="stacked"
          header={
            <div className="mb-10">
              <SectionHeader num="03" eyebrow={c('screens.eyebrow')} title={c('screens.title')}>
                {c('screens.body')}
              </SectionHeader>
            </div>
          }
        />
        <div id="video" className="mt-20 scroll-mt-24">
          <div className="mb-6 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('screens.videoTitle')}</h3>
            <p className="mt-3 text-sm sm:text-base text-ivory/70 leading-relaxed">{c('screens.videoText')}</p>
          </div>
          <video
            src={`${IMG}demo.mp4`}
            poster={`${IMG}demo-poster.webp`}
            aria-label={c('screens.videoLabel')}
            controls
            muted
            playsInline
            preload="none"
            className="w-full rounded-2xl border border-ivory/10 bg-carbon shadow-xl shadow-black/40"
          />
        </div>
      </Section>

      {/* 04 · desafio */}
      <Section id="desafio">
        <SectionHeader num="04" eyebrow={c('challenge.eyebrow')} title={c('challenge.title')}>
          {c('challenge.body')}
        </SectionHeader>
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {list('challenge.items').map((item, i) => (
            <li key={item.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <span className="font-mono text-xs text-ice">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-display font-bold text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-16 mb-4 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('challenge.tableTitle')}</h3>
        <Table headers={list('challenge.headers')} rows={list('challenge.rows')} highlightLast />
      </Section>

      {/* 05 · resultados */}
      <Section id="resultados">
        <SectionHeader num="05" eyebrow={c('results.eyebrow')} title={c('results.title')}>
          {c('results.body')}
        </SectionHeader>
        <div className="mt-12 max-w-4xl">
          <Table headers={list('results.headers')} rows={list('results.rows')} highlightLast />
        </div>
      </Section>

      {/* 06 · minha parte */}
      <Section id="minha-parte">
        <SectionHeader num="06" eyebrow={c('role.eyebrow')} title={c('role.title')} />
        <ul className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {list('role.items').map((item) => (
            <li key={item} className="flex gap-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-ice" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 · próximos passos */}
      <Section id="proximos-passos">
        <SectionHeader num="07" eyebrow={c('roadmap.eyebrow')} title={c('roadmap.title')} />
        <ul className="mt-10 max-w-3xl space-y-4">
          {list('roadmap.items').map((item) => (
            <li key={item} className="flex gap-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-ivory/40" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* 08 · aprendizados */}
      <Section id="aprendizados">
        <SectionHeader num="08" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <NextSteps items={list('next.items')} />
      </Section>

      {/* 09 · tecnologia */}
      <Section id="tecnologia">
        <SectionHeader num="09" eyebrow={c('stack.eyebrow')} title={c('stack.title')}>
          {c('stack.process')}
        </SectionHeader>
        <StackAndTeam c={c} list={list} />
      </Section>

      <CaseClosing c={c} />
    </article>
  )
}
