import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from '../../lib/router'

// Blocos das páginas de estudo de caso (/projetos/<slug>), no formato do
// engsoftmarcelo.dev. Cada página monta as próprias seções com eles; os textos
// ficam em caseStudies.<chave> nos dois JSON, com a mesma forma para abertura,
// números e fechamento (back, kicker, title, tagline, intro, status, meta,
// coverAlt, stats, closing).

export function SectionHeader({ num, eyebrow, title, children }) {
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

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 md:py-28 border-t border-ivory/10 scroll-mt-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  )
}

// Imagem com legenda; o clique abre o arquivo inteiro em outra aba.
// frame: texto da barra de janela desenhada em cima (endereço, resolução...).
// aspect: recorte fixo (do topo), para imagens lado a lado alinharem.
export function Figure({ src, alt, caption, frame, aspect, className = '' }) {
  return (
    <figure className={className}>
      <div className="rounded-2xl overflow-hidden border border-ivory/10 bg-carbon-raised shadow-xl shadow-black/40">
        {frame && (
          <div className="bg-[#131417] px-4 py-2.5 flex items-center gap-2 border-b border-ivory/10" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-electric" />
            <span className="ml-3 font-mono text-[11px] text-ivory/45 truncate">{frame}</span>
          </div>
        )}
        <a href={src} target="_blank" rel="noopener noreferrer" className={`block overflow-hidden bg-carbon ${aspect ?? ''}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full transition-transform duration-500 ease-out hover:scale-[1.02] ${aspect ? 'h-full object-cover object-top' : 'h-auto'}`}
          />
        </a>
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ivory/55 leading-relaxed">{caption}</figcaption>}
    </figure>
  )
}

// No celular as linhas quebram em vez de rolar para o lado
export function CodeBlock({ code, label }) {
  return (
    <pre
      aria-label={label}
      className="whitespace-pre-wrap break-words sm:whitespace-pre sm:overflow-x-auto rounded-xl border border-ivory/10 bg-[#131417] p-4 text-[12.5px] leading-relaxed text-ivory/85"
      style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}
    >
      <code>{code}</code>
    </pre>
  )
}

// Abertura: volta aos projetos, título, frase, status, contexto/equipe/papel e a imagem principal
export function CaseHero({ c, list, cover, frame }) {
  return (
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
        <h1 className="mt-3 text-5xl sm:text-7xl font-display font-bold text-ivory tracking-tight leading-none">{c('title')}</h1>
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

        <Figure className="mt-12" src={cover} alt={c('coverAlt')} frame={frame} />
      </div>
    </header>
  )
}

// Faixa de números logo abaixo da abertura
export function StatStrip({ stats }) {
  return (
    <div className="border-t border-ivory/10">
      <dl className="max-w-6xl mx-auto px-6 sm:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((stat) => (
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
  )
}

// Cards numerados "o que eu faria diferente"
export function NextSteps({ items }) {
  return (
    <ol className="mt-12 grid gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
          <span className="font-mono text-xs text-ice">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 text-lg font-display font-bold text-ivory">{item.title}</h3>
          <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}

// Fechamento: frase final, volta aos projetos e contato
export function CaseClosing({ c }) {
  return (
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
  )
}

// Lista de chips agrupada (ferramentas) e nomes da equipe
export function StackAndTeam({ c, list }) {
  return (
    <>
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
        {c('stack.advisorsLabel', { defaultValue: '' }) && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('stack.advisorsLabel')}</h3>
            <ul className="mt-3 space-y-1 text-sm text-ivory/85">
              {list('stack.advisors').map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

// Tabela no celular: nada de rolar para o lado. Com duas colunas, rótulo à
// esquerda e número à direita na mesma linha; com mais, o rótulo em cima e os
// valores lado a lado embaixo, cada um com o nome da sua coluna.
function TableList({ headers, rows, highlightLast }) {
  const valueClass = (i, total) =>
    `tabular-nums ${highlightLast && i === total - 1 ? 'font-semibold text-ice' : 'text-ivory/70'}`

  return (
    <dl className="divide-y divide-ivory/10 rounded-2xl border border-ivory/10 bg-carbon-raised text-sm sm:hidden">
      {rows.map(([label, ...values]) =>
        values.length === 1 ? (
          <div key={label} className="flex items-baseline justify-between gap-4 px-4 py-3">
            <dt className="font-medium text-ivory/85">{label}</dt>
            <dd className={`max-w-[48%] text-right ${valueClass(0, 1)}`}>{values[0]}</dd>
          </div>
        ) : (
          <div key={label} className="px-4 py-3.5">
            <dt className="font-medium text-ivory/85">{label}</dt>
            <dd className="mt-2 grid gap-3" style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))` }}>
              {values.map((value, i) => (
                <div key={i}>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-ivory/45">{headers[i + 1]}</span>
                  <span className={`mt-0.5 block ${valueClass(i, values.length)}`}>{value}</span>
                </div>
              ))}
            </dd>
          </div>
        )
      )}
    </dl>
  )
}

// Tabela de duas ou mais colunas: a primeira é o rótulo da linha; highlightLast
// destaca a última coluna (o "depois", o número). No celular vira a TableList.
export function Table({ headers, rows, highlightLast = false }) {
  return (
    <>
      <TableList headers={headers} rows={rows} highlightLast={highlightLast} />
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-ivory/10">
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
    </>
  )
}
