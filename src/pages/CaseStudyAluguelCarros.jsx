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

// Estudo de caso do Sistema de Aluguel de Carros (/projetos/aluguel-de-carros):
// Laboratório 02 de DIAW, Spring Boot + React. Telas capturadas com o sistema
// rodando localmente, perfil H2 e os usuários fictícios dos dados iniciais;
// diagramas da revisão v3 do repositório. Textos em caseStudies.aluguelcarros.

const IMG = '/projects/aluguel-de-carros/'
const FRAME = '127.0.0.1:5173 · Aluguel de Carros · dados de demonstração'

// Trechos do repositório, como estão lá (PedidoAluguel, ContratoService e SecurityConfig)
const CODE = {
  ciclo: `public void iniciarAnalise() {
	exigirStatus(StatusPedido.ENVIADO, "Só um pedido aguardando análise pode entrar em análise.");
	this.status = StatusPedido.EM_ANALISE;
}

public void registrarParecer(Parecer parecer) {
	exigirStatus(StatusPedido.EM_ANALISE, "O parecer só pode ser registrado com o pedido em análise.");
	this.parecer = parecer;
	this.status = parecer.isPositivo() ? StatusPedido.APROVADO : StatusPedido.REPROVADO;
}`,
  contrato: `// A empresa só continua dona de um carro que já é dela; não pode tomar o automóvel de outro agente
if (dados.tipo() == TipoContrato.PROPRIEDADE_EMPRESA
		&& !pedido.getAutomovel().getProprietario().getId().equals(agente.getId())) {
	throw CampoInvalidoException.invalido("tipo", "Só a empresa dona do automóvel fica proprietária pelo contrato.");
}
if (dados.tipo() == TipoContrato.PROPRIEDADE_BANCO && dados.credito() == null) {
	throw CampoInvalidoException.invalido("credito", "Contrato com o banco como proprietário exige crédito.");
}`,
  seguranca: `.sessionManagement(sessao -> sessao.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
.authorizeHttpRequests(rotas -> rotas
		.requestMatchers("/api/health", "/api/auth/login", "/api/auth/logout").permitAll()
		.requestMatchers("/error").permitAll()
		.requestMatchers(HttpMethod.POST, "/api/clientes").permitAll()
		.requestMatchers("/api/clientes/me/**").hasRole("CLIENTE")
		.requestMatchers(HttpMethod.POST, "/api/pedidos/*/analise", "/api/pedidos/*/parecer",
				"/api/pedidos/*/contrato")
		.hasAnyRole(AGENTES)
		.anyRequest().authenticated())
.addFilterBefore(new JwtFilter(jwtUtil, cookie), UsernamePasswordAuthenticationFilter.class)`,
}

// Ciclo de vida do pedido: o caminho feliz em linha e as saídas laterais
function Lifecycle({ c, list }) {
  const steps = list('lifecycle.steps')
  return (
    <div className="mt-10 rounded-2xl border border-ivory/10 bg-carbon-raised p-5 sm:p-6">
      <ol className="flex flex-col lg:flex-row lg:items-stretch gap-2">
        {steps.map((step, i) => (
          <li key={step.status} className="flex flex-col lg:flex-row lg:flex-1 items-stretch gap-2">
            <div className={`flex-1 rounded-xl border px-4 py-3 ${i === steps.length - 1 ? 'border-electric/50' : 'border-ivory/15'} bg-carbon`}>
              <p className="font-mono text-[11px] text-ice" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
                {step.status}
              </p>
              <p className="mt-1 text-sm font-semibold text-ivory">{step.title}</p>
              <p className="mt-1 text-xs text-ivory/60 leading-relaxed">{step.who}</p>
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
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 border-t border-ivory/10 pt-5">
        {list('lifecycle.exits').map((exit) => (
          <li key={exit.status} className="rounded-xl border border-dashed border-ivory/20 px-4 py-3">
            <p className="font-mono text-[11px] text-ivory/55" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
              {exit.status}
            </p>
            <p className="mt-1 text-xs text-ivory/70 leading-relaxed">{exit.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-ivory/55 leading-relaxed">{c('lifecycle.note')}</p>
    </div>
  )
}

// Trecho de código com título e explicação ao lado, como no Degrau Educa.
// grid-cols-1: sem ele, a coluna crescia até a linha de código mais longa no celular
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

function Bullets({ items, dot = 'bg-ice' }) {
  return (
    <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
          <span className={`mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function CaseStudyAluguelCarros() {
  const { c, list } = useCaseStudy('aluguelcarros')

  const screens = list('screens.items').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}analise.webp`} frame={FRAME} />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 -mt-8 pb-12">
        <p className="max-w-3xl text-xs text-ivory/45 leading-relaxed">{c('demoNote')}</p>
      </div>
      <StatStrip stats={list('stats')} />
      <p className="max-w-6xl mx-auto px-6 sm:px-8 -mt-6 pb-10 text-xs text-ivory/45">{c('statsNote')}</p>

      {/* 01 · o enunciado */}
      <Section id="problema">
        <SectionHeader num="01" eyebrow={c('problem.eyebrow')} title={c('problem.title')}>
          {c('problem.body')}
        </SectionHeader>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {list('problem.actors').map((actor) => (
            <li key={actor.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-lg font-display font-bold text-ivory">{actor.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{actor.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl border-l-2 border-electric pl-5 text-lg text-ivory leading-relaxed">
          <strong className="font-semibold">{c('problem.goalLabel')}:</strong> {c('problem.goal')}
        </p>
      </Section>

      {/* 02 · arquitetura e modelagem */}
      <Section id="arquitetura">
        <SectionHeader num="02" eyebrow={c('architecture.eyebrow')} title={c('architecture.title')}>
          {c('architecture.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-8 md:grid-cols-2 items-start">
          <Figure src={`${IMG}pacotes.webp`} alt={c('architecture.packagesAlt')} caption={c('architecture.packagesCaption')} />
          <Figure src={`${IMG}casos-de-uso.webp`} alt={c('architecture.useCasesAlt')} caption={c('architecture.useCasesCaption')} />
        </div>
        <Figure className="mt-8" src={`${IMG}classes.webp`} alt={c('architecture.classesAlt')} caption={c('architecture.classesCaption')} />
        <h3 className="mt-16 mb-4 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('architecture.tableTitle')}</h3>
        <Table headers={list('architecture.headers')} rows={list('architecture.rows')} />
      </Section>

      {/* 03 · o ciclo do pedido e as regras */}
      <Section id="regras">
        <SectionHeader num="03" eyebrow={c('lifecycle.eyebrow')} title={c('lifecycle.title')}>
          {c('lifecycle.body')}
        </SectionHeader>
        <Lifecycle c={c} list={list} />
        <h3 className="mt-16 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('lifecycle.rulesTitle')}</h3>
        <div className="mt-8">
          <Bullets items={list('lifecycle.rules')} />
        </div>
        <div className="mt-16 space-y-10">
          <Snippet title={c('lifecycle.codeCycleTitle')} text={c('lifecycle.codeCycleText')} code={CODE.ciclo} />
          <Snippet title={c('lifecycle.codeContractTitle')} text={c('lifecycle.codeContractText')} code={CODE.contrato} />
        </div>
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
      </Section>

      {/* 05 · segurança */}
      <Section id="seguranca">
        <SectionHeader num="05" eyebrow={c('security.eyebrow')} title={c('security.title')}>
          {c('security.body')}
        </SectionHeader>
        <div className="mt-12">
          <Snippet title={c('security.codeTitle')} text={c('security.codeText')} code={CODE.seguranca} />
        </div>
        <h3 className="mt-16 mb-4 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('security.tableTitle')}</h3>
        <Table headers={list('security.headers')} rows={list('security.rows')} highlightLast />
      </Section>

      {/* 06 · testes e verificação */}
      <Section id="verificacao">
        <SectionHeader num="06" eyebrow={c('quality.eyebrow')} title={c('quality.title')}>
          {c('quality.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {list('quality.suites').map((suite) => (
            <div key={suite.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <p className="text-4xl font-display font-bold text-ice leading-none">{suite.value}</p>
              <h3 className="mt-3 text-lg font-display font-bold text-ivory">{suite.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{suite.text}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-16 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('quality.findingsTitle')}</h3>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-ivory/70 leading-relaxed">{c('quality.findingsBody')}</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {list('quality.findings').map((finding, i) => (
            <li key={finding.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <span className="font-mono text-xs text-ice">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-2 text-lg font-display font-bold text-ivory">{finding.title}</h4>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{finding.text}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-16 mb-4 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('quality.tableTitle')}</h3>
        <div className="max-w-4xl">
          <Table headers={list('quality.headers')} rows={list('quality.rows')} highlightLast />
        </div>
      </Section>

      {/* 07 · aprendizados */}
      <Section id="aprendizados">
        <SectionHeader num="07" eyebrow={c('next.eyebrow')} title={c('next.title')} />
        <NextSteps items={list('next.items')} />
      </Section>

      {/* 08 · limitações e próximos passos */}
      <Section id="proximos-passos">
        <SectionHeader num="08" eyebrow={c('roadmap.eyebrow')} title={c('roadmap.title')}>
          {c('roadmap.body')}
        </SectionHeader>
        <div className="mt-10">
          <Bullets items={list('roadmap.items')} dot="bg-ivory/40" />
        </div>
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
