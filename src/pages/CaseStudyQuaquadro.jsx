import { ArrowDown, ArrowRight } from 'lucide-react'
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
  Table,
} from '../components/case-study/blocks'
import { useCaseStudy } from '../components/case-study/useCaseStudy'

// Estudo de caso da Quaquadro (/projetos/quaquadro): site do negócio próprio de
// quadros ilustrados, em Astro na Cloudflare, com repositório privado. Telas do
// site publicado, com movimento reduzido e o pedido preenchido sem enviar.
// Textos em caseStudies.quaquadro.

const IMG = '/projects/quaquadro/'
const FRAME = 'Quaquadro · site no ar na Cloudflare'

// Cores do DESIGN.md, tiradas das dobras do pato; o contraste vem dos textos
const PALETTE = ['#F7F6EE', '#D3D4CA', '#DDDAB1', '#CDC8A0', '#958A4F', '#6E6536', '#4D5048', '#36382B', '#16170F']

// Trechos do repositório, como estão lá (src/lib/pedido.ts e src/pages/api/pedido.ts)
const CODE = {
  mensagem: `export function mensagemDoPedido(pedido: Pedido): string {
  const tamanho = TAMANHOS[pedido.tamanho];
  const linhas = [
    "Olá! Quero montar um quadro Quaquadro.",
    "",
    \`Nome: \${pedido.nome.trim()}\`,
    \`Tamanho: \${tamanho.medida} (\${formatarPreco(tamanho.preco)})\`,
    \`Estilo: \${pedido.estilo}\`,
  ];
  if (pedido.pessoas.trim()) linhas.push(\`Pessoas e pets: \${pedido.pessoas.trim()}\`);
  if (pedido.ocasiao.trim()) linhas.push(\`Ocasião: \${pedido.ocasiao.trim()}\`);
  linhas.push(\`Para quando: \${formatarData(pedido.prazo)}\`);
  linhas.push(\`Cidade: \${pedido.cidade.trim()}\`, "", "Vou enviar as fotos por aqui.");
  return linhas.join("\\n");
}`,
  api: `const origem = request.headers.get("origin");
if (origem && new URL(origem).host !== new URL(request.url).host) {
  return responder(403, { erro: "origem" });
}

const ip = request.headers.get("cf-connecting-ip") ?? "local";
const limite = await env.LIMITE_PEDIDO?.limit({ key: ip });
if (limite && !limite.success) return responder(429, { erro: "limite" });

// O campo "site" é invisível: só robôs o preenchem.
if (dados.site) return responder(202, { ok: true });`,
}

// Trecho de código com título e explicação ao lado; grid-cols-1 para o código não alargar o celular
function Snippet({ title, text, code }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10 items-start">
      <div>
        <h4 className="text-base font-semibold text-ivory">{title}</h4>
        <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{text}</p>
      </div>
      <CodeBlock code={code} label={title} />
    </div>
  )
}

// Caminho do pedido: do formulário ao WhatsApp, com o lembrete em paralelo
function OrderFlow({ list }) {
  const steps = list('order.steps')
  return (
    <ol className="mt-10 flex flex-col lg:flex-row lg:items-stretch gap-2">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col lg:flex-row lg:flex-1 items-stretch gap-2">
          <div className={`flex-1 rounded-xl border px-4 py-3 bg-carbon-raised ${i === steps.length - 1 ? 'border-electric/50' : 'border-ivory/15'}`}>
            <p className="text-sm font-semibold text-ivory">{step.title}</p>
            <p className="mt-1 text-xs text-ivory/60 leading-relaxed">{step.text}</p>
          </div>
          {i < steps.length - 1 && (
            <>
              <ArrowRight className="hidden lg:block self-center w-4 h-4 shrink-0 text-ivory/40" aria-hidden="true" />
              <ArrowDown className="lg:hidden mx-auto w-4 h-4 text-ivory/40" aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ol>
  )
}

export default function CaseStudyQuaquadro() {
  const { c, list } = useCaseStudy('quaquadro')

  const screens = list('screens.items').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))
  const colors = list('identity.colors')

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}hero.webp`} frame={FRAME} />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 -mt-8 pb-12">
        <p className="max-w-3xl text-xs text-ivory/45 leading-relaxed">{c('demoNote')}</p>
      </div>
      <StatStrip stats={list('stats')} />
      <p className="max-w-6xl mx-auto px-6 sm:px-8 -mt-6 pb-10 text-xs text-ivory/45">{c('statsNote')}</p>

      {/* 01 · o negócio e o problema */}
      <Section id="problema">
        <SectionHeader num="01" eyebrow={c('problem.eyebrow')} title={c('problem.title')}>
          {c('problem.body')}
        </SectionHeader>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {list('problem.options').map((option) => (
            <li key={option.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-lg font-display font-bold text-ivory">{option.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{option.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl border-l-2 border-electric pl-5 text-lg text-ivory leading-relaxed">
          <strong className="font-semibold">{c('problem.goalLabel')}:</strong> {c('problem.goal')}
        </p>
      </Section>

      {/* 02 · decisões */}
      <Section id="decisoes">
        <SectionHeader num="02" eyebrow={c('decisions.eyebrow')} title={c('decisions.title')}>
          {c('decisions.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list('decisions.items').map((item) => (
            <div key={item.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-lg font-display font-bold text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 · identidade */}
      <Section id="identidade">
        <SectionHeader num="03" eyebrow={c('identity.eyebrow')} title={c('identity.title')}>
          {c('identity.body')}
        </SectionHeader>
        <ul className="mt-12 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {PALETTE.map((hex, i) => (
            <li key={hex}>
              <span className="block aspect-square rounded-xl border border-ivory/15" style={{ backgroundColor: hex }} aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold text-ivory leading-tight">{colors[i]?.name}</p>
              <p className="font-mono text-[11px] text-ivory/55" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
                {hex}
              </p>
              <p className="text-[11px] text-ivory/55 leading-snug">{colors[i]?.use}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-ivory/55 leading-relaxed">{c('identity.note')}</p>
      </Section>

      {/* 04 · as telas */}
      <Section id="telas">
        <FeaturesWithPanel
          items={screens}
          mediaAspect="aspect-video"
          layout="select"
          header={
            <div className="mb-10">
              <SectionHeader num="04" eyebrow={c('screens.eyebrow')} title={c('screens.title')}>
                {c('screens.body')}
              </SectionHeader>
            </div>
          }
        />
        <div className="mt-20 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
          <Figure className="max-w-xs mx-auto md:mx-0 w-full" src={`${IMG}celular.webp`} alt={c('screens.mobileAlt')} />
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('screens.mobileTitle')}</h3>
            <p className="mt-3 text-sm sm:text-base text-ivory/70 leading-relaxed">{c('screens.mobileText')}</p>
          </div>
        </div>
      </Section>

      {/* 05 · o pedido */}
      <Section id="pedido">
        <SectionHeader num="05" eyebrow={c('order.eyebrow')} title={c('order.title')}>
          {c('order.body')}
        </SectionHeader>
        <OrderFlow list={list} />
        <div className="mt-16 space-y-10">
          <Snippet title={c('order.codeMessageTitle')} text={c('order.codeMessageText')} code={CODE.mensagem} />
          <Snippet title={c('order.codeApiTitle')} text={c('order.codeApiText')} code={CODE.api} />
        </div>
      </Section>

      {/* 06 · verificação */}
      <Section id="verificacao">
        <SectionHeader num="06" eyebrow={c('quality.eyebrow')} title={c('quality.title')}>
          {c('quality.body')}
        </SectionHeader>
        <div className="mt-12 max-w-4xl">
          <Table headers={list('quality.headers')} rows={list('quality.rows')} highlightLast />
        </div>
        <h3 className="mt-16 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('quality.findingsTitle')}</h3>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {list('quality.findings').map((finding, i) => (
            <li key={finding.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <span className="font-mono text-xs text-ice">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-2 text-lg font-display font-bold text-ivory">{finding.title}</h4>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{finding.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 07 · aprendizados */}
      <Section id="aprendizados">
        <SectionHeader num="07" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <NextSteps items={list('next.items')} />
      </Section>

      {/* 08 · antes de divulgar */}
      <Section id="proximos-passos">
        <SectionHeader num="08" eyebrow={c('roadmap.eyebrow')} title={c('roadmap.title')}>
          {c('roadmap.body')}
        </SectionHeader>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {list('roadmap.items').map((item) => (
            <li key={item} className="flex gap-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-ivory/40" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
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
