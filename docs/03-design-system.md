# 03 - Design System

Voltar: [Portfolio Victor](README.md)

## Direção

Escuro, sobre a grade inclinada de `public/background-site.png`. Desde 2026-10-23 na paleta Carbon Black, Ivory, Electric Green e Baby Blue Ice, montada pelo método neutro + acento: o carbono e o marfim fazem quase todo o trabalho, o verde elétrico fica só nas ações e o azul gelo é a segunda cor (de 2026-10-22 a 2026-10-23 foi preto `#161616`, bege `#F4EFEA` e verde `#259B55`; antes disso, editorial claro com verde-musgo `#2B4636`). Seções numeradas `01 ·` a `06 ·` no estilo azal.im. Tokens definidos no bloco `@theme` de `src/index.css`.

## Paleta (tokens reais em uso)

| Token | Valor | Uso |
|---|---|---|
| `--color-carbon` | `#191A1D` (Carbon Black) | Fundo da página e base neutra (também em `index.html`, `theme-color` e favicon) |
| `--color-carbon-raised` | `#222327` | Cards e painéis, sólidos para o texto não ficar sobre a grade |
| `--color-ivory` | `#FDFFF3` (Ivory) | Texto (17,2:1 sobre o carbon), fichas dos logos de tecnologia, tooltip |
| `--color-electric` | `#3FEE3F` (Electric Green) | Só ação e estado ativo: botões principais ("Vamos conversar", "Visitar Website", "Enviar"), idioma e projeto ativos, cargo ativo, tecnologia selecionada, "disponível", seleção de texto, anel de foco. 11,2:1 sobre o carbon; sobre ele, texto `carbon` |
| `--color-electric-hover` | `#6CF46C` | Hover dos botões principais |
| `--color-ice` | `#89BBFE` (Baby Blue Ice) | Segunda cor: destaques em itálico dos títulos, links ("Ver projeto"), rótulo "Na prática", categoria Frontend, gráficos e céu das ilustrações. 8,8:1 sobre o carbon |

Tons intermediários saem por opacidade dos tokens: texto `ivory/80` e `ivory/70` (corrido, 8,9:1), `ivory/55` (secundário, 6:1), `ivory/45` só em ícones (4,4:1); bordas `ivory/10`–`ivory/15`; superfícies leves `ivory/8`. Verde nunca é decoração: com ele em tudo, deixaria de apontar o que é clicável. Scrollbar 7 px, thumb `#3A3B40`. O ícone "Engenharia de Prompt" do globo usa `#178217` (verde escuro, 4,9:1 sobre a ficha marfim).

Exceções que ficaram de propósito: logos das tecnologias com as cores das marcas (sobre fichas marfim, para o logo preto da Vercel continuar visível), o texto sobre a foto do Sobre (claro sobre o degradê da própria foto) e o vermelho das mensagens de erro do formulário (`red-200`/`red-400` sobre `red-500/10`), que precisa continuar lendo como erro. O reCAPTCHA usa `theme: 'dark'`.

### Grade de fundo

`background-site.png` tem só 390 × 360: ampliada, as linhas de 1 px borram; repetida, a grade inclinada não emenda. Por isso ela foi medida e refeita em CSS no `body::before`: linhas de 1 px a cada 52 px em marfim a 9% (`rgb(253 255 243 / .09)`), giradas 7°, `position: fixed` atrás da página (o `inset: -50%` sobra para a rotação não deixar cantos vazios). As seções não têm mais fundo próprio; a separação entre elas é a borda `ivory/10`.

### Hero

Nome em duas linhas (Fira Code bold, `BlurText` por letra) alinhado à esquerda; a foto em cápsula saiu e entrou o pato recortado (`public/pato.webp`, sem fundo), à direita no desktop e abaixo, à direita, no celular. O pato fica num `div` com os mesmos tamanhos de fonte do nome e tem `height: 2.1em`: as duas linhas do nome somam 1,8em, então o pato fica um pouco mais alto que elas (≈ 1,17×) em toda largura de tela — 378 px contra 324 px no desktop largo, 151 px contra 129 px no celular. A segunda linha tem `mt-[0.24em]`: com o nome alinhado à esquerda, o circunflexo do Â fica logo abaixo do I de VICTOR e encostava nele.

> [!NOTE]
> **celular e tablet, desde 2026-10-29**
>
> Abaixo de `lg` (1024 px), nome e pato ficam centralizados no mesmo eixo, o pato embaixo (pedido do Victor: antes o nome ia à esquerda e o pato a um canto, grande demais). Fonte do nome 72 / 104 / 128 px (base / `sm` / `md`), o nome ocupando ~70–80% da largura; o pato com `h-[1.7em]` em vez de 2.1em, para não pesar mais que o nome (122 px no celular, 218 px no tablet de 768), e 40 px de espaço entre nome e pato (48 px do `sm` para cima). Primeiro foi 1,5em com 24 px; no mesmo dia o Victor pediu o pato um pouco maior e mais afastado. Medido em 320, 375, 640, 768 e 1023 px: centro do nome = centro do pato, sem rolagem horizontal. Do `lg` para cima nada mudou.

Entrada do pato com GSAP, 0,45 s depois de carregar: zoom `scale 0 → 1` em 1,6 s com `elastic.out(1, 0.4)` e, ao mesmo tempo, giro `-10° → 6°` (para a direita) em 1,9 s com `elastic.out(1, 0.6)`, mais amortecido, para o giro balançar menos que o zoom. Medido avançando a linha do tempo do GSAP: a escala passa de 1,27 e volta a 0,96 antes de assentar; o giro passa de 8,4° e assenta em 6°.

> [!NOTE]
> **contexto**
>
> A paleta escura (`#0C0F0D`, `#152218`…`#3A5742`) do projeto base não existe mais no código. O README foi corrigido em 2026-10-20.

## Tipografia

| Papel | Família | Origem |
|---|---|---|
| Texto (`font-sans`) | Montserrat 300–900 | Google Fonts |
| Títulos (`font-display`) | Hyperlegible Sans 400/500/700 + itálico | Local, `public/fonts/*.woff2` |
| Destaque (`font-special`) | Smile Moon | Local, `public/fonts/SmileMoon.otf` |
| Código | Fira Code 700/800 | Google Fonts |
| — | Antic | Google Fonts (veio com componente 21st.dev) |

`Relieve.woff2` estava em `public/fonts` sem uso e foi removida em 2026-10-20.

## Animações

Definidas em `index.css`: `skill-rise` (painel do globo de habilidades, 220 ms) e as `.illo-*` das ilustrações da Trajetória. Fora da tela, as `.illo-*` ficam pausadas (`.media-anim[data-paused="true"]`, marcado por um IntersectionObserver em `features-with-panel.jsx`). `spin-slow`, `float-gentle-1/2`, `.mask-fade-b/-all` e `.bg-warm-grain` saíram em 2026-10-23 (nenhum componente usava).

Animações em JS via `motion/react` (no `floating-dock`).

### Movimento reduzido (desde 2026-10-20)

Com "reduzir movimento" ligado no sistema (`prefers-reduced-motion: reduce`):

| Camada | Como | Efeito |
|---|---|---|
| Animações e transições CSS (inclui inline do BlurText e dos cards) | bloco `@media` no fim de `index.css`: `animation/transition-duration: 0.01ms !important`, `iteration-count: 1`, `transition-delay: 0s` | Tudo vai direto ao estado final |
| Rolagem por âncora | mesmo bloco: `scroll-behavior: auto !important` | Salto direto |
| "Voltar ao topo" (JS) | `Footer.jsx` consulta `matchMedia` antes do `scrollTo` | Salto direto |
| Globo de habilidades | `SkillsGlobe` consulta `matchMedia` | Sem giro automático nem inércia; o ícone escolhido salta direto para a frente. Arrastar continua funcionando |
| FloatingDock (motion/react) | `MotionConfig reducedMotion="user"` + `useReducedMotion()` no `IconContainer` | Tooltip sem deslocamento; ícones sem ampliação, tamanho fixo |
| Pato do Hero (GSAP) | `Hero.jsx` consulta `matchMedia` | Aparece direto no tamanho final, já inclinado 6° |
| Ilustrações da Trajetória | regra global (com `animation-delay: 0s`) | Cada cena aparece parada e completa |
| Painel da Trajetória (motion/react) | `MotionConfig reducedMotion="user"` | Troca de ilustração e abertura do item só com opacidade |

> [!TIP]
> **atalho que vale lembrar**
>
> `msedge --force-prefers-reduced-motion` simula a preferência. Para ler estilos computados no headless: uma página temporária em `dist/` com `<iframe src="/">` da mesma origem, que grava `getComputedStyle` no próprio DOM; depois `--dump-dom`. Usar polling até `#projects` existir — o `onload` do iframe não é confiável com `--virtual-time-budget`.

## Globo de habilidades (`SkillsGlobe.jsx`)

Inspirado no `skills --globo` de https://aramuni.dev. Lá é three.js (react-three-fiber, chunk de ~950 KB); aqui é feito à mão:

- 16 pontos na esfera pela espiral de Fibonacci; cada ícone é um `<button>` posicionado com `translate3d` + `scale` por projeção em perspectiva (câmera a 3,2 × o raio).
- Malha: icosaedro subdividido 2 vezes (162 vértices, 480 arestas) num `<canvas>` 2D; as arestas vão em 4 faixas de profundidade, um `stroke` por faixa.
- Opacidade e escala pela profundidade; o rótulo usa `--front` e some antes do ícone, para os do fundo não poluírem a frente. Atrás do globo, `pointer-events: none`.
- Giro automático contínuo, uma volta a cada ~45 s; com o ponteiro em cima desacelera para 35% (facilita o clique) em vez de parar. Só para durante o arrasto e com movimento reduzido. Arrasto com inércia; o clique só vira arrasto depois de 6 px, e só então o `setPointerCapture` — antes disso o clique ainda chega ao botão.
- Selecionar gira o ícone para a frente e o globo segue girando; focar com Tab segura o ícone na frente até sair do foco. `touch-action: none` desde 2026-10-29: no celular o dedo só gira o globo; a página rola fora dele. Antes era `pan-y` e o arrasto vertical rolava a página junto com o giro.
- O laço `requestAnimationFrame` para quando o globo sai da tela (`IntersectionObserver`).
- Sem seleção não há painel: o globo fica sozinho, centralizado e maior (600 px de altura no desktop). Ao selecionar, a grade `.skills-layout` anima `grid-template-columns` de `minmax(0,1fr) minmax(0,0fr)` para `1.3fr 1fr` (420 ms): o globo encolhe para 500 px e desliza para a esquerda e o painel sobe com fade depois de 160 ms. Ao fechar, o painel some em 120 ms e só então a grade recolhe. No celular é a mesma ideia em `grid-template-rows`, com o painel abaixo.
- Trocar de tecnologia com o painel aberto remonta o conteúdo por `key` e roda `.skill-rise` (fade + 8 px para cima, 220 ms). O painel fechado fica com `inert`, fora do Tab e do leitor de tela. Esc fecha.

> [!TIP]
> **verificado em 2026-10-22**
>
> Edge headless via CDP, em 1280, 375 e 320 px, pt-BR e en: clique abre o painel (opacidade 0,85 aos 90 ms), arrasto não troca a seleção, Esc fecha, Tab gira o ícone focado para a frente (opacidade 0,14 → 1) e Enter abre, sem rolagem horizontal e sem erro no console. Com `--force-prefers-reduced-motion` o painel aparece já em opacidade 1.

## Trajetória (`ui/features-with-panel.jsx`)

Desde 2026-10-22 é o "Features with Panel" do ScrollX UI (21st.dev). O registro do 21st.dev pede login para o `npx shadcn add`, então o código veio da fonte publicada pelo próprio ScrollX UI (`public/registry/features/features-with-panel.json` no repositório `Adityakishore0/ScrollX-UI`) e foi portado à mão para JSX.

- Cabeçalho no padrão das outras seções (`03 · Vivência & Trajetória`) e uma lista numerada com os 3 cargos, do atual para o mais antigo; o atual já abre selecionado. Cada item mostra cargo e "período · Grupo GVS"; o escolhido abre um resumo das funções (`experience.roles.<id>.summary`).
- À direita, no desktop, um painel 4:3 preso na tela (`sticky top-28`) troca a ilustração com fade + 12 px (`AnimatePresence mode="wait"`, 350 ms). No celular o painel some e a ilustração abre dentro do próprio item, abaixo do resumo.
- Mudanças em relação ao original: itens por props (`id`, `title`, `meta`, `description`, `media`, `alt`); cada item é um `<button>` com `aria-expanded` (o original era um `<li>` clicável, fora do Tab); `<div>` no lugar do `Card` do shadcn, que o projeto não usa; `MotionConfig reducedMotion="user"`.
- O `FeatureMedia` do original continua aceitando URL de vídeo (`.mp4`/`.webm`), de imagem ou um nó React. Hoje são nós React: as ilustrações abaixo, com `role="img"` e descrição traduzida (`experience.roles.<id>.mediaAlt`).

### Ilustrações dos cargos (`ExperienceIllustrations.jsx`)

Animações em SVG desenhadas em código, em vez de vídeos: ficam nítidas em qualquer tela, pesam alguns KB, usam a paleta do site e param com "reduzir movimento". Mesma proporção do painel (viewBox 400 × 300).

| Cargo | Cena |
|---|---|
| Analista de TI — COR | Tela "SCADA · LIVE": 4 usinas solares ligadas ao centro de operações com dados correndo pelos cabos, gráfico de geração (MW) desenhando a curva solar com linha de leitura, e indicadores de disponibilidade (99.9%), telemetria, câmera (CFTV) e servidores |
| Comunicação Interna & Web | Navegador em `grupogvs.com.br` montando o site peça por peça, cursor clicando no botão, post em vídeo flutuando ao lado e selo `</>` |
| Comunicação e Marketing | Celular gravando (REC) uma usina solar, curtidas subindo, feed de 9 posts preenchendo um a um e linha do tempo de edição com a agulha correndo |

As animações são classes `.illo-*` no `index.css` (piscar, fluxo por `stroke-dashoffset`, curva com `pathLength="1"`, montagem em sequência com atraso inline e `fill-mode: backwards`). O estilo base de cada classe é a cena parada e completa: é o que sobra quando a regra global de movimento reduzido encerra as animações. Para isso a regra global passou a zerar também o `animation-delay`; sem isso as peças com atraso ficavam escondidas até o atraso passar.

> [!TIP]
> **verificado em 2026-10-22**
>
> Quadros amostrados pela Web Animations API (`getAnimations()` + `currentTime`): aos 0,9 s a curva está desenhando e o site montando; aos 4,3 s o cursor clica com o pulso, o feed está cheio e a agulha andou. Com movimento reduzido, as 3 cenas aparecem completas. A 375 px o item aberto mostra resumo + ilustração, sem rolagem horizontal; no desktop o painel troca ao clicar nos 3 cargos.

## Navbar (`Navbar.jsx`)

Desde 2026-10-23 segue o navbar-02 do shadcnui-blocks (21st.dev; o registro do 21st.dev pede login, o código veio de `shadcnui-blocks.com/r/navbar-02.json`). Antes havia duas navegações: o cabeçalho do próprio Hero e uma barra flutuante transparente que só aparecia depois de rolar 30 px, com logo e ícones soltos sobre o conteúdo — sumiam conforme a cor de fundo da seção mudava.

- Uma barra só, `sticky top-0`, 64 px, fundo sólido `carbon` e borda inferior `ivory/10`, visível desde o topo. O cabeçalho do Hero saiu (o menu, o idioma e o contato dele estão na barra) e o Hero passou a ter `min-h-[calc(100svh-4rem)]`, para a primeira tela continuar do tamanho da janela.
- Esquerda: logo "Victor" em Smile Moon e os 7 links (`h-9`, `rounded-md`, `text-sm`; hover e ativo em `ivory/8`–`ivory/10`, como o `navigationMenuTriggerStyle`). O link ativo continua vindo da rolagem, agora com `aria-current="location"`.
- Direita: seletor de idioma no formato do botão "outline" (`h-9`, `rounded-md`, borda `ivory/15`, idioma ativo em verde elétrico) e o botão principal "Vamos conversar" em verde elétrico.
- Breakpoints: links a partir de `lg` (1024 px); o botão "Vamos conversar" aparece entre `sm` e `lg` e de novo a partir de `xl` (em `lg` os 7 links não deixam espaço); abaixo de `lg`, botão de menu que abre o painel lateral.
- Painel lateral (o Sheet do shadcn, sem Radix): entra pela direita em 500 ms sobre um véu `black/60`, sai em 300 ms; `role="dialog"` com `aria-modal`, foco vai para o botão de fechar, Tab fica preso no painel, Esc e clique no véu fecham, a rolagem da página trava enquanto está aberto e o foco volta ao botão de menu. Renderizado num portal no `<body>`.
- `scroll-padding-top: 4rem` no `html`: âncoras param logo abaixo da barra.
- Rótulos do menu passaram de MAIÚSCULAS para a forma normal ("Início", "Sobre"…), como no navbar-02. `nav.contactBtn` e `hero.contactBtn` saíram dos JSON (sem uso).

> [!CAUTION]
> **defeito, com causa raiz**
>
> No celular a barra vazava 44 px para a direita. Causa: o botão principal tinha `inline-flex` na classe base e recebia `hidden` por fora; o `cn()` do projeto não resolve conflito e o `inline-flex` vencia. Correção: o `display` saiu da classe base e cada uso define o seu.

> [!TIP]
> **verificado em 2026-10-23**
>
> 1440 e 1024 px: links e idioma na barra, sem sobrar nada. 768 px: idioma, "Vamos conversar" e menu. 375 px: sem rolagem horizontal; o painel abre com foco no fechar e a página travada, e o link "Habilidades" fecha o painel e para a seção a 64 px do topo (logo abaixo da barra), com o foco de volta no botão de menu.

## Estudo de caso (`pages/CaseStudyDegrauEduca.jsx`)

Página `/projetos/degrau-educa`, no formato de https://engsoftmarcelo.dev/pt/projetos/clickseguro: cabeçalho com contexto, equipe, papel e status, faixa de números e seções numeradas (`// 01 o problema` … `// 08 olhando de novo`) com fechamento.

- Mesma paleta e tipografia do site; os blocos ficam em `components/case-study/` (ver Blocos compartilhados, abaixo).
- Números da faixa em `ice` (informação); verde elétrico só no status e no botão "Vamos conversar".
- `Figure`: imagem com borda, legenda e clique que abre o arquivo inteiro em outra aba; `frame` desenha a barra de navegador falsa; `aspect` fixa o recorte (do topo), usado nos quatro prints do painel para os títulos alinharem.
- Seção 04 reaproveita o `FeaturesWithPanel` da Trajetória com prints no lugar das ilustrações; o componente ganhou a prop `mediaAspect` (`aspect-[16/10]` aqui, `aspect-4/3` na Trajetória) e imagens com `loading="lazy"` e `object-top`.
- Os trechos de código são cópias literais do repositório do projeto (`admin.js` e `login.html`), sem tradução; o resto do texto vem de `caseStudies.degraueduca` nos dois JSON.
- `document.title` vira "Degrau Educa, estudo de caso | Victor Cândido Leite" e volta ao título do site ao sair.

O card na seção Projetos ganhou `caseStudy` (botão "Ler estudo de caso" e a imagem viram links para a página) e `address` (texto da barra de navegador quando não há `liveUrl`). A pilha de cards passou a usar uma grade com todos na mesma célula (`[grid-area:1/1]`): a altura segue o card mais alto. Antes era `min-h` fixo com cards `absolute`, e a 1024 px o texto do Degrau Educa vazava 74 px e escondia os botões (o do GVS já vazava 7 px).

Desde 2026-10-29 (pedido do Victor) o card de Projetos não tem subtítulo nem chips de tecnologia: a descrição curta já resume, e cada estudo de caso lista a stack. Saíram `projects.<id>Tagline` e `projects.<id>Tags` dos dois idiomas (8 chaves em cada). O card fica com selo, título, descrição, botões e imagem; no celular, o do Sentinela foi de 833 para 697 px de altura. O Site Institucional do GVS, sem estudo de caso, também perdeu os chips.

> [!NOTE]
> **arrastar o card troca de projeto, desde 2026-10-29**
>
> Pedido do Victor: menos rolagem e menos toques. O card da frente segue o dedo ou o mouse na horizontal (com um giro leve) e, solto além de 60 px, vai para o próximo (arrastando para a esquerda) ou o anterior (para a direita), com a volta circular das setas. Eventos de ponteiro no card, sem biblioteca: `touch-action: pan-y` deixa a rolagem vertical com o navegador; o sentido só é decidido depois de 8 px; um arraste nunca vira clique (`onClickCapture`); `onDragStart` bloqueado para o mouse não puxar o link ou a imagem. Entre as pílulas e o card, a dica "Arraste o card para o lado para trocar de projeto." (`projects.swipeHint`). A pílula ativa rola para o centro da barra quando o projeto muda, sem mover a página.
> Testado com toque real (CDP) a 375 px e com mouse a 1280 px: esquerda, de novo esquerda, direita, arraste curto de 35 px (não troca), deslizar vertical de 300 px sobre o card (a página rola, o projeto não muda), arraste começando no botão (troca e não abre) e toque simples no botão (abre o estudo de caso). A pílula ativa ficou visível em todos.

> [!TIP]
> **verificado em 2026-10-28**
>
> Edge headless a 1440 px (página inteira) e navegador embutido a 1024 e 375 px: card → estudo de caso sem recarregar, título da aba e "Projetos" ativo na barra; 375 px sem rolagem horizontal; inglês sem chave faltando; "Todos os projetos" e os links da barra voltam para a inicial com a seção a 64 px do topo.

## Blocos compartilhados (`components/case-study/`)

Com o segundo estudo de caso, os blocos saíram da página do Degrau Educa para `components/case-study/blocks.jsx` (`SectionHeader`, `Section`, `Figure`, `CodeBlock`, `CaseHero`, `StatStrip`, `NextSteps`, `StackAndTeam`, `CaseClosing`) e o hook `useCaseStudy(chave)` foi para `useCaseStudy.js` (devolve `c()` e `list()` e cuida do título da aba). `Figure` passou a receber em `frame` o texto da barra de janela. O Degrau Educa ficou idêntico, conferido por captura.

## Estudo de caso do Sentinela GVS (`pages/CaseStudySentinelaGvs.jsx`)

Página `/projetos/sentinela-gvs`, desde 2026-10-28: sistema corporativo de vigilância com IA do Grupo GVS (projeto individual, em produção), sem demo pública nem código aberto. O conteúdo veio de um pacote preparado para portfólio (estudo de caso em PT/EN, 12 telas, vídeo de 60 s, relatório PDF e créditos), todo gravado numa instância de demonstração com usinas, câmeras, usuário e ocorrências fictícios e pessoas de vídeos do Pexels.

- Abertura com "Empresa / Escala / Meu papel" (em vez de "Equipe") e uma nota sobre os dados de demonstração logo abaixo da imagem; faixa de 8 números com o período dos resultados.
- `// 02` traz o fluxo da ocorrência (usina → central → alerta, painel, relatórios, TVs) em caixas HTML, feito a partir do diagrama Mermaid do pacote.
- `// 03` galeria de 11 telas (16:9), desde 2026-10-29 com `layout="select"` e o vídeo da demonstração (`<video controls muted preload="none">`, com pôster: só baixa quando alguém dá play), os dois na largura toda. Desde 2026-10-28 o `FeaturesWithPanel` tem esse modo empilhado: tópicos numa grade no alto (até 4 colunas), o texto do escolhido e uma mídia só, grande, embaixo. No modo lado a lado, os prints ficavam na metade da largura e pequenos demais para ler a interface. A Trajetória e os outros estudos continuam lado a lado.
- Sem "Autoria" (2026-10-29, pedido do Victor): o bloco saiu dos estudos do Sentinela GVS e do WISP TV, os dois projetos individuais (`stack.teamLabel`/`stack.team` removidos nos dois idiomas). O `StackAndTeam` só desenha equipe e orientação quando o texto existe; o Degrau Educa, trabalho em grupo, mantém "Equipe" e "Orientação".
- Modo `select` (2026-10-29, só no Sentinela): a grade de 11 tópicos ocupava a tela antes da imagem, então virou uma caixa única com a tela escolhida (número, título, a linha `meta` embaixo e "n/11"), que abre a lista das outras por cima da mídia (até 26rem ou 60vh, com rolagem). É um `listbox`: setas, Home/End, Enter/Espaço escolhe, Esc fecha e devolve o foco à caixa, clique fora fecha. O WISP TV, com 6 telas, segue no `stacked`.
- `// 04` desafio com a tabela antes/depois da otimização e o caso dos cães (8 → 2 em 17); `// 05` a tabela de resultados; `// 06` próximos passos; `// 07` aprendizados; `// 08` tecnologia (o bloco "Autoria" saiu em 2026-10-29).
- O relatório em PDF do pacote ficou de fora: mesmo sendo de demonstração, cada página leva "Confidencial — Uso Interno". A tela "Dados para relatório" mostra o mesmo conteúdo.

> [!NOTE]
> **contexto**
>
> O estudo de caso que veio com o material diz "publicar só depois da aprovação de compliance". A aprovação veio em 2026-10-28 e a página foi publicada no mesmo dia. Material novo do Sentinela passa pela mesma aprovação antes do push.

## Estudo de caso do WISP TV (`pages/CaseStudyWispTv.jsx`)

Página `/projetos/wisp-tv`, desde 2026-10-28: app Android TV do Centro de Operações do Grupo GVS (projeto individual, em produção), sem demo pública nem código aberto. O conteúdo veio de um pacote para portfólio (estudo de caso em PT/EN, 6 capturas, vídeo de 70 s e créditos), gerado com o próprio app v1.8 no emulador oficial do Android TV apontado para um servidor de demonstração; a página de comandos é uma maquete com o mesmo contrato de API.

- Mesma estrutura do Sentinela: abertura com Empresa / Escala / Meu papel, nota sobre os dados de demonstração, 8 números com período.
- `// 02` features e o diagrama "quem fala com quem" (escritório ↔ rede interna) em caixas HTML, a partir do Mermaid do pacote; `// 03` galeria de 6 telas com `layout="stacked"` e o vídeo na largura toda; `// 04` os 4 desafios de uma TV doméstica e a tabela antes/depois; `// 05` resultados; `// 06` a parte individual (lista); `// 07` próximos passos; `// 08` aprendizados; `// 09` tecnologia.
- O material original cita a ferramenta de IA pelo nome; por escolha do autor, a página diz só "com apoio de IA" (no papel e no aprendizado "IA acelera, o aparelho decide").
- A `Table` do Sentinela foi para `components/case-study/blocks.jsx` e passou a ser usada pelas duas páginas.
- Celular sem rolagem lateral (desde 2026-10-29, pedido do Victor: menos toques e menos ida e volta). Abaixo de `sm` (640 px), a `Table` vira uma lista (`TableList`, um `<dl>`): com duas colunas, rótulo à esquerda e número à direita, na mesma linha; com três, o rótulo em cima e Antes | Depois lado a lado embaixo, cada valor com o nome da coluna. Do `sm` para cima, a tabela de sempre. O `CodeBlock` quebra as linhas no celular em vez de rolar. Medido a 320 e 375 px nos três estudos de caso: nenhum elemento com rolagem horizontal (antes: 4 tabelas e 4 trechos de código).

## Componentes 21st.dev adaptados (`src/components/ui/`)

- `blur-text.jsx` — texto que entra desfocando.
- `floating-dock.jsx` — dock estilo macOS com magnificação (usado no "Sobre"). No celular (abaixo de `md`), desde 2026-10-29: os 6 ícones lado a lado numa barra sempre visível, cada link com `aria-label`. O original abria uma coluna vertical por cima do texto a partir de um botão de grade: um toque a mais, texto escondido e espaço vazio desproporcional (pedido do Victor). Cabe numa linha até 320 px, sem rolagem horizontal. O "Vamos conversar" acima dela fica centralizado no mesmo eixo, e a seta tem 32 px no celular, a altura das duas linhas de texto (64 px do `sm` para cima). Medido a 320 e 375 px: centro do bloco = centro da barra.
- `features-with-panel.jsx` — lista numerada com painel de mídia preso na tela (Trajetória), do ScrollX UI.

> [!TIP]
> **atalho que vale lembrar**
>
> `lib/utils.js` tem um `cn()` simplificado (só `filter(Boolean).join(" ")`), **sem** `clsx`/`tailwind-merge`. Classes conflitantes não são resolvidas: ao portar outro componente do 21st.dev / shadcn que dependa de `twMerge`, o override por `className` pode não funcionar.
