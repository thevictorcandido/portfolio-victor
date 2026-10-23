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

Definidas em `index.css`: `spin-slow` (22 s), `float-gentle-1/2` (6–7 s), `skill-rise` (painel do globo de habilidades, 220 ms). Utilitários de máscara: `.mask-fade-b` (fade inferior da foto) e `.mask-fade-all` (radial). Textura `.bg-warm-grain` (pontilhado 20 px).

Animações em JS via `motion/react` (no `floating-dock`).

### Movimento reduzido (desde 2026-10-20)

Com "reduzir movimento" ligado no sistema (`prefers-reduced-motion: reduce`):

| Camada | Como | Efeito |
|---|---|---|
| Animações e transições CSS (inclui inline do BlurText e dos cards) | bloco `@media` no fim de `index.css`: `animation/transition-duration: 0.01ms !important`, `iteration-count: 1`, `transition-delay: 0s` | Tudo vai direto ao estado final |
| Rolagem por âncora | mesmo bloco: `scroll-behavior: auto !important` | Salto direto |
| "Voltar ao topo" (JS) | `Footer.jsx` consulta `matchMedia` antes do `scrollTo` | Salto direto |
| Globo de habilidades | `SkillsGlobe` consulta `matchMedia` | Sem giro automático nem inércia; o ícone escolhido salta direto para a frente. Arrastar continua funcionando |
| FloatingDock (motion/react) | `MotionConfig reducedMotion="user"` + `useReducedMotion()` no `IconContainer` | Tooltip/menu sem deslocamento; ícones sem ampliação, tamanho fixo |
| Pato do Hero (GSAP) | `Hero.jsx` consulta `matchMedia` | Aparece direto no tamanho final, já inclinado 6° |
| Ilustrações da Trajetória | regra global (com `animation-delay: 0s`) | Cada cena aparece parada e completa |
| Painel da Trajetória (motion/react) | `MotionConfig reducedMotion="user"` | Troca de ilustração e abertura do item só com opacidade |

> [!TIP]
> **atalho que vale lembrar**
>
> `msedge --force-prefers-reduced-motion` simula a preferência. Para ler estilos computados no headless: uma página temporária em `dist/` com `<iframe src="/">` da mesma origem, que grava `getComputedStyle` no próprio DOM; depois `--dump-dom`. Usar polling até `#projects` existir — o `onload` do iframe não é confiável com `--virtual-time-budget`.

> [!WARNING]
> **armadilha**
>
> `.animate-spin-slow` e `.animate-float-1/2` estão definidas no `index.css` mas nenhum componente usa.

## Globo de habilidades (`SkillsGlobe.jsx`)

Inspirado no `skills --globo` de https://aramuni.dev. Lá é three.js (react-three-fiber, chunk de ~950 KB); aqui é feito à mão:

- 16 pontos na esfera pela espiral de Fibonacci; cada ícone é um `<button>` posicionado com `translate3d` + `scale` por projeção em perspectiva (câmera a 3,2 × o raio).
- Malha: icosaedro subdividido 2 vezes (162 vértices, 480 arestas) num `<canvas>` 2D; as arestas vão em 4 faixas de profundidade, um `stroke` por faixa.
- Opacidade e escala pela profundidade; o rótulo usa `--front` e some antes do ícone, para os do fundo não poluírem a frente. Atrás do globo, `pointer-events: none`.
- Giro automático contínuo, uma volta a cada ~45 s; com o ponteiro em cima desacelera para 35% (facilita o clique) em vez de parar. Só para durante o arrasto e com movimento reduzido. Arrasto com inércia; o clique só vira arrasto depois de 6 px, e só então o `setPointerCapture` — antes disso o clique ainda chega ao botão.
- Selecionar gira o ícone para a frente e o globo segue girando; focar com Tab segura o ícone na frente até sair do foco. `touch-action: pan-y`: no celular o arrasto vertical rola a página.
- O laço `requestAnimationFrame` para quando o globo sai da tela (`IntersectionObserver`).
- Sem seleção não há painel: o globo fica sozinho, centralizado e maior (600 px de altura no desktop). Ao selecionar, a grade `.skills-layout` anima `grid-template-columns` de `minmax(0,1fr) minmax(0,0fr)` para `1.3fr 1fr` (420 ms): o globo encolhe para 500 px e desliza para a esquerda e o painel sobe com fade depois de 160 ms. Ao fechar, o painel some em 120 ms e só então a grade recolhe. No celular é a mesma ideia em `grid-template-rows`, com o painel abaixo.
- Trocar de tecnologia com o painel aberto remonta o conteúdo por `key` e roda `.skill-rise` (fade + 8 px para cima, 220 ms). O painel fechado fica com `inert`, fora do Tab e do leitor de tela. Esc fecha.

> [!TIP]
> **verificado em 2026-10-22**
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
> No celular a barra vazava 44 px para a direita. Causa: o botão principal tinha `inline-flex` na classe base e recebia `hidden` por fora; o `cn()` do projeto não resolve conflito e o `inline-flex` vencia. Correção: o `display` saiu da classe base e cada uso define o seu.

> [!TIP]
> **verificado em 2026-10-23**
> 1440 e 1024 px: links e idioma na barra, sem sobrar nada. 768 px: idioma, "Vamos conversar" e menu. 375 px: sem rolagem horizontal; o painel abre com foco no fechar e a página travada, e o link "Habilidades" fecha o painel e para a seção a 64 px do topo (logo abaixo da barra), com o foco de volta no botão de menu.

## Componentes 21st.dev adaptados (`src/components/ui/`)

- `blur-text.jsx` — texto que entra desfocando.
- `floating-dock.jsx` — dock estilo macOS com magnificação (usado no "Sobre").
- `features-with-panel.jsx` — lista numerada com painel de mídia preso na tela (Trajetória), do ScrollX UI.

> [!TIP]
> **atalho que vale lembrar**
>
> `lib/utils.js` tem um `cn()` simplificado (só `filter(Boolean).join(" ")`), **sem** `clsx`/`tailwind-merge`. Classes conflitantes não são resolvidas: ao portar outro componente do 21st.dev / shadcn que dependa de `twMerge`, o override por `className` pode não funcionar.
