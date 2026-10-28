import { ArrowDown, ArrowRight } from 'lucide-react'
import { FeaturesWithPanel } from '../components/ui/features-with-panel'
import {
  CaseClosing,
  CaseHero,
  NextSteps,
  Section,
  SectionHeader,
  StackAndTeam,
  StatStrip,
} from '../components/case-study/blocks'
import { useCaseStudy } from '../components/case-study/useCaseStudy'

// Estudo de caso do Sentinela GVS (/projetos/sentinela-gvs): sistema corporativo,
// sem demo pública nem código aberto. Telas e vídeo vêm de uma instância de
// demonstração com dados fictícios; textos em caseStudies.sentinelagvs.

const IMG = '/projects/sentinela-gvs/'
const FRAME = 'Sentinela GVS · painel interno · dados de demonstração'

function Table({ headers, rows, highlightLast = false }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ivory/10">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-[#131417] text-[11px] uppercase tracking-wider text-ivory/55">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory/10 bg-carbon-raised">
          {rows.map(([label, ...values]) => (
            <tr key={label}>
              <th scope="row" className="px-4 py-3 font-medium text-ivory/85">
                {label}
              </th>
              {values.map((value, i) => (
                <td
                  key={i}
                  className={`px-4 py-3 tabular-nums ${
                    highlightLast && i === values.length - 1 ? 'font-semibold text-ice' : 'text-ivory/70'
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Fluxo da ocorrência: o Mermaid do estudo original, em caixas
function Flow({ c, list }) {
  const box = 'rounded-xl border border-ivory/15 bg-carbon px-4 py-3 text-sm text-ivory/85 leading-snug'
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
      <div className="rounded-2xl border border-ivory/10 bg-carbon-raised p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ivory/55">{c('solution.flowPlant')}</p>
        <div className="mt-4 space-y-2">
          <div className={box}>{c('solution.flow.cameras')}</div>
          <ArrowDown className="mx-auto w-4 h-4 text-ivory/40" aria-hidden="true" />
          <div className={`${box} border-electric/50`}>{c('solution.flow.ai')}</div>
          <ArrowDown className="mx-auto w-4 h-4 text-ivory/40" aria-hidden="true" />
          <div className={box}>{c('solution.flow.event')}</div>
          <div className={`${box} mt-4 border-dashed text-ivory/60`}>
            {c('solution.flow.recorder')}
            <span className="mt-1 block text-xs text-ivory/45">→ {c('solution.flow.recorderNote')}</span>
          </div>
        </div>
      </div>
      <ArrowRight className="hidden lg:block w-6 h-6 text-ivory/40" aria-hidden="true" />
      <ArrowDown className="lg:hidden mx-auto w-6 h-6 text-ivory/40" aria-hidden="true" />
      <div className="rounded-2xl border border-ice/40 bg-carbon-raised p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ice">{c('solution.flowCentral')}</p>
        <ul className="mt-4 space-y-2">
          {list('solution.flow.outputs').map((output) => (
            <li key={output} className={box}>
              {output}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function CaseStudySentinelaGvs() {
  const { c, list } = useCaseStudy('sentinelagvs')

  const screens = list('screens.items').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}cameras.webp`} frame={FRAME} />
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
        <h3 className="mt-12 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('problem.constraintsTitle')}</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list('problem.constraints').map((item) => (
            <li key={item} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-5 text-base text-ivory leading-snug">
              {item}
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
        <Flow c={c} list={list} />
      </Section>

      {/* 03 · telas e vídeo */}
      <Section id="telas">
        <FeaturesWithPanel
          items={screens}
          mediaAspect="aspect-video"
          header={
            <div className="mb-10">
              <SectionHeader num="03" eyebrow={c('screens.eyebrow')} title={c('screens.title')}>
                {c('screens.body')}
              </SectionHeader>
            </div>
          }
        />
        <div id="video" className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start scroll-mt-24">
          <div>
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

      {/* 04 · desafio técnico */}
      <Section id="desafio">
        <SectionHeader num="04" eyebrow={c('challenge.eyebrow')} title={c('challenge.title')}>
          {c('challenge.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('challenge.tableTitle')}</h3>
            <Table headers={list('challenge.headers')} rows={list('challenge.rows')} highlightLast />
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
            <h3 className="text-lg font-display font-bold text-ivory">{c('challenge.dogsTitle')}</h3>
            <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{c('challenge.dogs')}</p>
            <p className="mt-5 flex items-baseline gap-3 font-display font-bold">
              <span className="text-3xl text-ivory/45 line-through decoration-2">8</span>
              <ArrowRight className="w-5 h-5 text-ivory/40 self-center" aria-hidden="true" />
              <span className="text-4xl text-ice">2</span>
              <span className="text-sm font-sans font-normal text-ivory/55">/ 17</span>
            </p>
          </div>
        </div>
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

      {/* 06 · próximos passos */}
      <Section id="proximos-passos">
        <SectionHeader num="06" eyebrow={c('roadmap.eyebrow')} title={c('roadmap.title')}>
          {c('roadmap.body')}
        </SectionHeader>
        <p className="mt-10 max-w-3xl border-l-2 border-ice pl-5 text-base text-ivory/85 leading-relaxed">{c('roadmap.pilot')}</p>
      </Section>

      {/* 07 · aprendizados */}
      <Section id="aprendizados">
        <SectionHeader num="07" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <NextSteps items={list('next.items')} />
      </Section>

      {/* 08 · tecnologia */}
      <Section id="tecnologia">
        <SectionHeader num="08" eyebrow={c('stack.eyebrow')} title={c('stack.title')}>
          {c('stack.process')}
        </SectionHeader>
        <StackAndTeam c={c} list={list} />
      </Section>

      <CaseClosing c={c} />
    </article>
  )
}
