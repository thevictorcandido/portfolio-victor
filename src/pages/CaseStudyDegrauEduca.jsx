import { ArrowUpRight } from 'lucide-react'
import { FeaturesWithPanel } from '../components/ui/features-with-panel'
import {
  CaseClosing,
  CaseHero,
  CodeBlock,
  Figure,
  NextSteps,
  Section,
  SectionHeader,
  StackAndTeam,
  StatStrip,
} from '../components/case-study/blocks'
import { useCaseStudy } from '../components/case-study/useCaseStudy'

// Estudo de caso do Degrau Educa (/projetos/degrau-educa): seções numeradas do
// problema ao que faria diferente. Textos em caseStudies.degraueduca nos dois
// JSON; aqui ficam só estrutura, imagens e os trechos de código.

const IMG = '/projects/degrau-educa/'
const PROTOTYPE_URL = 'https://marvelapp.com/prototype/g85h3jb/screen/98664685'
const FRAME = 'localhost:3001/modulos/degrau-educa'

// Trechos do repositório do projeto (admin.js e login.html), como estão lá
const CODE = [
  `function moverCurso(idx, direcao) {
  const novoIdx = idx + direcao;
  if (novoIdx < 0 || novoIdx >= cursosSelecionadosOrdem.length) return;
  const temp = cursosSelecionadosOrdem[idx];
  cursosSelecionadosOrdem[idx] = cursosSelecionadosOrdem[novoIdx];
  cursosSelecionadosOrdem[novoIdx] = temp;
  renderizarOrdemCursos();
}`,
  `function gerarSlug(texto) {
  return texto.toString().toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    .replace(/\\s+/g, '-').replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}`,
  `const hoje = new Date().toISOString().split('T')[0];
const novoDia = hoje !== usuario.ultimo_acesso;
const atualizacao = {
  total_logins: (usuario.total_logins || 0) + 1,
  ultimo_acesso: hoje
};
if (novoDia) atualizacao.sequencia_login = (usuario.sequencia_login || 0) + 1;`,
]

const JOURNEY_JSON = `{
  "id": "2",
  "nome": "Introdução ao Desenvolvimento de Programas - Python",
  "slug": "introducao-ao-desenvolvimento-de-programas-python",
  "categorias_ids": [1],
  "cursos_ids": ["1", "2", "3", "4", "5"]
}`

export default function CaseStudyDegrauEduca() {
  const { c, list } = useCaseStudy('degraueduca')

  const screens = list('solution.screens').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}home.webp`} frame={FRAME} />
      <StatStrip stats={list('stats')} />

      {/* 01 · problema */}
      <Section id="problema">
        <SectionHeader num="01" eyebrow={c('problem.eyebrow')} title={c('problem.title')}>
          {c('problem.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {list('problem.quotes').map((quote) => (
            <blockquote key={quote.label} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ice">{quote.label}</p>
              <p className="mt-3 text-base text-ivory/85 leading-relaxed">{quote.text}</p>
            </blockquote>
          ))}
        </div>
        <p className="mt-3 text-xs text-ivory/45">{c('problem.note')}</p>
        <p className="mt-10 max-w-3xl border-l-2 border-electric pl-5 text-lg text-ivory leading-relaxed">
          <strong className="font-semibold">{c('problem.goalLabel')}:</strong> {c('problem.goal')}
        </p>
      </Section>

      {/* 02 · pesquisa */}
      <Section id="pesquisa">
        <SectionHeader num="02" eyebrow={c('research.eyebrow')} title={c('research.title')}>
          {c('research.body')}
        </SectionHeader>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {list('research.csd').map((column) => (
            <div key={column.label} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ivory">{column.label}</h3>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ivory/75 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-ice" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Figure src={`${IMG}matriz-csd.webp`} alt={c('research.csdAlt')} caption={c('research.csdCaption')} />
          <Figure src={`${IMG}mapa-stakeholders.webp`} alt={c('research.stakeholdersAlt')} caption={c('research.stakeholdersCaption')} />
        </div>

        <h3 className="mt-20 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('research.personasTitle')}</h3>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {list('research.personas').map((persona) => (
            <article key={persona.name} className="flex flex-col rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h4 className="text-xl font-display font-bold text-ivory">{persona.name}</h4>
              <p className="mt-1 text-sm text-ivory/55">{persona.role}</p>
              <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-ivory/55">{c('research.wantLabel')}</dt>
                  <dd className="mt-1 text-ivory/85">{persona.want}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-ivory/55">{c('research.painLabel')}</dt>
                  <dd className="mt-1 text-ivory/85">{persona.pain}</dd>
                </div>
                <div className="border-t border-ivory/10 pt-4">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-ice">{c('research.designLabel')}</dt>
                  <dd className="mt-1 text-ivory">{persona.design}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      {/* 03 · do papel à tela */}
      <Section id="design">
        <SectionHeader num="03" eyebrow={c('design.eyebrow')} title={c('design.title')}>
          {c('design.body')}
        </SectionHeader>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
          <div className="space-y-8">
            <Figure src={`${IMG}wireframe-jornada.webp`} alt={c('design.wireframeAlt')} caption={c('design.wireframeCaption')} />
            <Figure src={`${IMG}historias-usuario.webp`} alt={c('design.storiesAlt')} caption={c('design.storiesCaption')} />
          </div>
          <div className="space-y-8">
            <Figure src={`${IMG}jornada.webp`} alt={c('design.finalAlt')} caption={c('design.finalCaption')} frame={FRAME} />
            <Figure src={`${IMG}user-flow.webp`} alt={c('design.flowAlt')} caption={c('design.flowCaption')} />
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ivory/8 hover:bg-ivory/12 text-ivory border border-ivory/10 transition-colors"
            >
              {c('design.prototype')}
              <ArrowUpRight className="w-4 h-4 text-ivory/60" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Section>

      {/* 04 · solução: galeria das telas */}
      <Section id="solucao">
        <FeaturesWithPanel
          items={screens}
          mediaAspect="aspect-[16/10]"
          header={
            <div className="mb-10">
              <SectionHeader num="04" eyebrow={c('solution.eyebrow')} title={c('solution.title')}>
                {c('solution.body')}
              </SectionHeader>
            </div>
          }
        />
      </Section>

      {/* 05 · painel administrativo */}
      <Section id="painel">
        <SectionHeader num="05" eyebrow={c('admin.eyebrow')} title={c('admin.title')}>
          {c('admin.body')}
        </SectionHeader>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {list('admin.modules').map((module) => (
            <article key={module.id}>
              <Figure src={`${IMG}${module.id}.webp`} alt={module.alt} aspect="aspect-[16/10]" />
              <h3 className="mt-5 text-xl font-display font-bold text-ivory">{module.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-ivory/70 leading-relaxed">{module.text}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-20 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('admin.codeTitle')}</h3>
        <div className="mt-8 space-y-10">
          {list('admin.code').map((snippet, i) => (
            <div key={snippet.title} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10 items-start">
              <div>
                <h4 className="text-base font-semibold text-ivory">{snippet.title}</h4>
                <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{snippet.text}</p>
              </div>
              <CodeBlock code={CODE[i]} label={snippet.title} />
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-ice pl-5 text-base text-ivory/85 leading-relaxed">{c('admin.loginNote')}</p>
      </Section>

      {/* 06 · dados */}
      <Section id="dados">
        <SectionHeader num="06" eyebrow={c('data.eyebrow')} title={c('data.title')}>
          {c('data.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <dl className="divide-y divide-ivory/10 rounded-2xl border border-ivory/10 bg-carbon-raised">
            {list('data.collections').map((collection) => (
              <div key={collection.name} className="px-5 py-4">
                <dt className="font-mono text-sm text-ice" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
                  /{collection.name}
                </dt>
                <dd className="mt-1 text-sm text-ivory/70">{collection.text}</dd>
              </div>
            ))}
          </dl>
          <figure className="min-w-0">
            <CodeBlock code={JOURNEY_JSON} label={c('data.exampleCaption')} />
            <figcaption className="mt-3 text-sm text-ivory/55">{c('data.exampleCaption')}</figcaption>
          </figure>
        </div>
      </Section>

      {/* 07 · ferramentas, processo e equipe */}
      <Section id="ferramentas">
        <SectionHeader num="07" eyebrow={c('stack.eyebrow')} title={c('stack.title')}>
          {c('stack.process')}
        </SectionHeader>
        <StackAndTeam c={c} list={list} />
      </Section>

      {/* 08 · o que faria diferente */}
      <Section id="proximos-passos">
        <SectionHeader num="08" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <NextSteps items={list('next.items')} />
      </Section>

      <CaseClosing c={c} />
    </article>
  )
}
