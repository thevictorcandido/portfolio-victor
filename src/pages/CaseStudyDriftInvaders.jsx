import { FeaturesWithPanel } from '../components/ui/features-with-panel'
import {
  CaseClosing,
  CaseHero,
  CodeBlock,
  NextSteps,
  Section,
  SectionHeader,
  StackAndTeam,
  StatStrip,
} from '../components/case-study/blocks'
import { useCaseStudy } from '../components/case-study/useCaseStudy'

// Estudo de caso do Drift Invaders (/projetos/drift-invaders): o jogo, as
// telas, as regras em funções puras e os testes. Textos em
// caseStudies.driftinvaders nos dois JSON; aqui ficam estrutura, imagens e os
// trechos de código, copiados de src/funcoes.py e tests/test_logica.py.

const IMG = '/projects/drift-invaders/'
const FRAME = 'pygame · 1280×720 · python main.py'

const RULES_CODE = [
  `def verificar_colisao(ret_1, ret_2):
    """Verifica sobreposição entre dois retângulos representados por dicionários."""
    return (
        ret_1["x"] < ret_2["x"] + ret_2["largura"]
        and ret_1["x"] + ret_1["largura"] > ret_2["x"]
        and ret_1["y"] < ret_2["y"] + ret_2["altura"]
        and ret_1["y"] + ret_1["altura"] > ret_2["y"]
    )`,
  `def calcular_dano_protegido(dano, invulnerabilidade):
    """Limita o dano simultâneo e inicia proteção quando uma vida é perdida."""
    if dano <= 0 or invulnerabilidade > 0:
        return 0, invulnerabilidade
    return 1, DURACAO_INVULNERABILIDADE`,
  `def processar_tiros_acertando_por_jogador(tiros, invasores, margem_acerto=0):
    pontos_por_jogador = {}
    destruidos = []

    for invasor in invasores[:]:
        for tiro in tiros[:]:
            area_tiro = expandir_retangulo(tiro, margem_acerto)
            if verificar_colisao(area_tiro, invasor):
                jogador = tiro.get("jogador", 1)
                invasor["destruido_por"] = jogador
                pontos_por_jogador[jogador] = (
                    pontos_por_jogador.get(jogador, 0) + invasor["pontos"]
                )
                destruidos.append(invasor)
                tiros.remove(tiro)
                invasores.remove(invasor)
                break

    return pontos_por_jogador, destruidos`,
]

const TESTS_CODE = [
  `def test_dano_simultaneo_remove_no_maximo_uma_vida():
    """Vários impactos no mesmo quadro não podem encerrar a partida de uma vez."""
    dano, protecao = calcular_dano_protegido(4, 0)

    assert dano == 1
    assert protecao == 90`,
  `def test_processar_tiros_separa_pontos_por_jogador():
    """No cooperativo, cada invasor pontua para quem disparou."""
    invasor_1 = criar_invasor("data_drift", 100)
    invasor_2 = criar_invasor("schema_break", 300)
    invasor_1["y"] = invasor_2["y"] = 100
    tiros = [
        {"x": 105, "y": 105, "largura": 5, "altura": 14, "jogador": 1},
        {"x": 305, "y": 105, "largura": 5, "altura": 14, "jogador": 2},
    ]
    invasores = [invasor_1, invasor_2]

    pontos, destruidos = processar_tiros_acertando_por_jogador(tiros, invasores)

    assert pontos == {1: 10, 2: 20}
    assert destruidos == [invasor_1, invasor_2]
    assert tiros == []
    assert invasores == []`,
]

// Texto à esquerda, código à direita (um trecho por linha)
function CodeRows({ items, code }) {
  return (
    <div className="mt-8 space-y-10">
      {items.map((snippet, i) => (
        <div key={snippet.title} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10 items-start">
          <div>
            <h4 className="text-base font-semibold text-ivory">{snippet.title}</h4>
            <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{snippet.text}</p>
          </div>
          <CodeBlock code={code[i]} label={snippet.title} />
        </div>
      ))}
    </div>
  )
}

export default function CaseStudyDriftInvaders() {
  const { c, list } = useCaseStudy('driftinvaders')

  const screens = list('screens.items').map((screen) => ({
    ...screen,
    media: `${IMG}${screen.id}.webp`,
  }))
  const headers = list('game.headers')
  const testGroups = list('tests.groups')
  const maxGroup = Math.max(...testGroups.map((group) => Number(group.count)))

  return (
    <article>
      <CaseHero c={c} list={list} cover={`${IMG}menu.webp`} frame={FRAME} />
      <StatStrip stats={list('stats')} />

      {/* 01 · problema: a analogia com MLOps */}
      <Section id="problema">
        <SectionHeader num="01" eyebrow={c('problem.eyebrow')} title={c('problem.title')}>
          {c('problem.body')}
        </SectionHeader>
        <h3 className="mt-12 text-xs font-semibold uppercase tracking-wider text-ivory/55">{c('problem.mapTitle')}</h3>
        <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {list('problem.map').map(([game, meaning]) => (
            <div key={game} className="bg-carbon-raised p-5">
              <dt className="text-lg font-display font-bold text-ivory">{game}</dt>
              <dd className="mt-1 text-sm text-ivory/70">{meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-ivory/45">{c('problem.note')}</p>
      </Section>

      {/* 02 · o jogo: ameaças, bônus e acessibilidade */}
      <Section id="jogo">
        <SectionHeader num="02" eyebrow={c('game.eyebrow')} title={c('game.title')}>
          {c('game.body')}
        </SectionHeader>

        <h3 className="mt-12 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('game.threatsTitle')}</h3>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ivory/10">
          <table className="w-full min-w-[640px] text-left text-sm">
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
              {list('game.threats').map(([code, name, points, inGame, response]) => (
                <tr key={code}>
                  <td className="px-4 py-3 font-mono font-bold text-ice" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
                    {code}
                  </td>
                  <th scope="row" className="px-4 py-3 font-semibold text-ivory">
                    {name}
                  </th>
                  <td className="px-4 py-3 tabular-nums text-ivory/85">{points}</td>
                  <td className="px-4 py-3 text-ivory/70">{inGame}</td>
                  <td className="px-4 py-3 text-ivory/85">{response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-display font-bold text-ivory tracking-tight">{c('game.bonusTitle')}</h3>
            <ul className="mt-6 space-y-3">
              {list('game.bonus').map((bonus) => (
                <li key={bonus.name} className="rounded-2xl border border-ivory/10 bg-carbon-raised px-5 py-4">
                  <span className="block font-semibold text-ivory">{bonus.name}</span>
                  <span className="mt-1 block text-sm text-ivory/70">{bonus.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-ivory tracking-tight">{c('game.accessTitle')}</h3>
            <ul className="mt-6 space-y-4">
              {list('game.access').map((item) => (
                <li key={item} className="flex gap-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
                  <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-ice" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 03 · telas */}
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
      </Section>

      {/* 04 · regras em funções puras */}
      <Section id="regras">
        <SectionHeader num="04" eyebrow={c('rules.eyebrow')} title={c('rules.title')}>
          {c('rules.body')}
        </SectionHeader>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {list('rules.points').map((point) => (
            <div key={point.title} className="rounded-2xl border border-ivory/10 bg-carbon-raised p-6">
              <h3 className="text-lg font-display font-bold text-ivory">{point.title}</h3>
              <p className="mt-2 text-sm text-ivory/70 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-20 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('rules.codeTitle')}</h3>
        <CodeRows items={list('rules.code')} code={RULES_CODE} />
      </Section>

      {/* 05 · testes */}
      <Section id="testes">
        <SectionHeader num="05" eyebrow={c('tests.eyebrow')} title={c('tests.title')}>
          {c('tests.body')}
        </SectionHeader>
        <ul className="mt-12 max-w-3xl space-y-3">
          {testGroups.map((group) => (
            <li key={group.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
              <span className="text-sm text-ivory/85">{group.name}</span>
              <span className="text-sm font-semibold tabular-nums text-ice">{group.count}</span>
              <span className="col-span-2 h-1.5 rounded-full bg-ivory/8" aria-hidden="true">
                <span className="block h-full rounded-full bg-ice/70" style={{ width: `${(Number(group.count) / maxGroup) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ivory/45">{c('tests.groupsNote')}</p>
        <h3 className="mt-20 text-2xl sm:text-3xl font-display font-bold text-ivory tracking-tight">{c('tests.codeTitle')}</h3>
        <CodeRows items={list('tests.code')} code={TESTS_CODE} />
      </Section>

      {/* 06 · organização do código */}
      <Section id="organizacao">
        <SectionHeader num="06" eyebrow={c('architecture.eyebrow')} title={c('architecture.title')}>
          {c('architecture.body')}
        </SectionHeader>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2">
          {list('architecture.modules').map((module) => (
            <div key={module.name} className="bg-carbon-raised px-5 py-4">
              <dt className="text-sm text-ice" style={{ fontFamily: "'Fira Code', ui-monospace, monospace" }}>
                {module.name}
              </dt>
              <dd className="mt-1 text-sm text-ivory/70">{module.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 07 · ferramentas e equipe */}
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
