import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FeaturesWithPanel } from '../components/ui/features-with-panel'
import { Link } from '../lib/router'

// Estudo de caso do Degrau Educa (/projetos/degrau-educa), no formato do
// engsoftmarcelo.dev: cabeçalho com contexto, equipe e papel, números, e seções
// numeradas do problema ao que faria diferente. Textos em caseStudies.degraueduca
// nos dois JSON; aqui ficam só estrutura, imagens e os trechos de código.

const IMG = '/projects/degrau-educa/'
const PROTOTYPE_URL = 'https://marvelapp.com/prototype/g85h3jb/screen/98664685'

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

function SectionHeader({ num, eyebrow, title, children }) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-wider text-ivory/55">
        <span className="text-ice">// {num}</span> {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight leading-[1.08]">
        {title}
      </h2>
      {children && <p className="mt-5 text-base sm:text-lg text-ivory/70 leading-relaxed">{children}</p>}
    </header>
  )
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 border-t border-ivory/10 scroll-mt-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  )
}

// Imagem com legenda; o clique abre o arquivo inteiro em outra aba. Com
// aspect, o recorte fica fixo (do topo), para imagens lado a lado alinharem
function Figure({ src, alt, caption, frame = false, aspect, className = '' }) {
  const image = (
    <a href={src} target="_blank" rel="noopener noreferrer" className={`block overflow-hidden bg-carbon ${aspect ?? ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full transition-transform duration-500 ease-out hover:scale-[1.02] ${aspect ? 'h-full object-cover object-top' : 'h-auto'}`}
      />
    </a>
  )
  return (
    <figure className={className}>
      <div className="rounded-2xl overflow-hidden border border-ivory/10 bg-carbon-raised shadow-xl shadow-black/40">
        {frame && (
          <div className="bg-[#131417] px-4 py-2.5 flex items-center gap-2 border-b border-ivory/10" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-electric" />
            <span className="ml-3 font-mono text-[11px] text-ivory/45 truncate">localhost:3001/modulos/degrau-educa</span>
          </div>
        )}
        {image}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ivory/55 leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}

function CodeBlock({ code, label }) {
  return (
    <pre
      aria-label={label}
      className="overflow-x-auto rounded-xl border border-ivory/10 bg-[#131417] p-4 text-[12.5px] leading-relaxed text-ivory/85"
      style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
    >
      <code>{code}</code>
    </pre>
  )
}

export default function CaseStudyDegrauEduca() {
  const { t } = useTranslation()
  const c = (key, opts) => t(`caseStudies.degraueduca.${key}`, opts)
  const list = (key) => c(key, { returnObjects: true })

  // Título da aba: volta ao do site ao sair da página
  useEffect(() => {
    const previous = document.title
    document.title = c('docTitle')
    return () => {
      document.title = previous
    }
  })

  const screens = list('solution.screens').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))

  return (
    <article>
      {/* Abertura */}
      <header className="pt-10 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-ivory/70 hover:text-ivory transition-colors rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-electric/50"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {c('back')}
          </Link>

          <p className="mt-10 font-mono text-xs uppercase tracking-wider text-ivory/55">// {c('kicker')}</p>
          <h1 className="mt-3 text-5xl sm:text-7xl font-display font-bold text-ivory tracking-tight leading-none">
            {c('title')}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-display font-light italic text-ice">{c('tagline')}</p>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-ivory/70 leading-relaxed">{c('intro')}</p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/5 px-3.5 py-1.5 text-xs font-semibold text-ivory">
            <span className="w-2 h-2 rounded-full bg-electric" aria-hidden="true" />
            {c('status')}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-ivory/10 pt-8">
            {list('meta').map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ivory/55">{item.label}</dt>
                <dd className="mt-2 text-sm text-ivory/85 leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>

          <Figure className="mt-12" src={`${IMG}home.webp`} alt={c('coverAlt')} frame />
        </div>
      </header>

      {/* Números */}
      <div className="border-t border-ivory/10">
        <dl className="max-w-6xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {list('stats').map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-4xl sm:text-5xl font-display font-bold text-ice leading-none">{stat.value}</span>
                <span className="mt-2 block text-sm text-ivory/55 leading-snug">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

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
            <Figure src={`${IMG}jornada.webp`} alt={c('design.finalAlt')} caption={c('design.finalCaption')} frame />
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list('stack.groups').map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory/55">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="px-2.5 py-1 text-xs font-medium rounded-md bg-ivory/8 text-ivory/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 border-t border-ivory/10 pt-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('stack.teamLabel')}</h3>
            <ul className="mt-3 space-y-1 text-sm text-ivory/85">
              {list('stack.team').map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('stack.advisorsLabel')}</h3>
            <ul className="mt-3 space-y-1 text-sm text-ivory/85">
              {list('stack.advisors').map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 08 · o que faria diferente */}
      <Section id="proximos-passos">
        <SectionHeader num="08" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {list('next.items').map((item, i) => (
            <li key={item.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <span className="font-mono text-xs text-ice">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-display font-bold text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Fechamento */}
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-ivory tracking-tight leading-[1.08]">{c('closing.title')}</h2>
          <p className="mt-5 text-base sm:text-lg text-ivory/70 leading-relaxed">{c('closing.text')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ivory/8 hover:bg-ivory/12 text-ivory border border-ivory/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              {c('closing.back')}
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-electric text-carbon hover:bg-electric-hover transition-colors"
            >
              {c('closing.contact')}
              <ArrowRight className="w-4 h-4 text-carbon/60" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </article>
  )
}
