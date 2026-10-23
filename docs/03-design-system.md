# 03 - Design System

Voltar: [Portfolio Victor](README.md)

## Direção

Escuro desde 2026-10-22: preto da grade de `public/background-site.png`, branco bege e um verde vivo como acento (antes era editorial claro, bege quente, com verde-musgo `#2B4636`). Seções numeradas `01 ·` a `06 ·` no estilo azal.im. Tokens definidos no bloco `@theme` de `src/index.css`.

## Paleta (tokens reais em uso)

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#161616` | Fundo da página, o preto de `background-site.png` (também em `index.html` e no `theme-color`) |
| `--color-ink-raised` | `#1C1C1C` | Cards, sólidos para o texto não ficar sobre a grade |
| `--color-cream` | `#F4EFEA` | Texto e botão principal (texto `ink` sobre ele) |
| `--color-moss` | `#259B55` | Acento: item ativo do menu, idioma, destaques dos títulos, timeline, globo. 5,1:1 sobre o `ink`, serve para texto; sobre ele, texto em `ink` |
| `--color-moss-hover` | `#2EAD60` | Hover de links verdes |

Tons intermediários saem por opacidade dos tokens: texto `cream/70` (corrido), `cream/55` (secundário, ainda 5,7:1), `cream/45` só em ícones; bordas `cream/10`; superfícies leves `cream/8`. A escala `stone-*` do Tailwind não é mais usada. Seleção de texto: fundo `moss`, texto `ink`. Scrollbar 7 px, thumb `#3A3A3A`.

Exceções que ficaram de propósito: logos das tecnologias com as cores das marcas (sobre fichas bege, para o logo preto da Vercel continuar visível), o texto sobre a foto do Sobre (claro sobre o degradê da própria foto) e o vermelho das mensagens de erro do formulário (`red-200`/`red-400` sobre `red-500/10`), que precisa continuar lendo como erro. O reCAPTCHA usa `theme: 'dark'`.

### Grade de fundo

`background-site.png` tem só 390 × 360: ampliada, as linhas de 1 px borram; repetida, a grade inclinada não emenda. Por isso ela foi medida e refeita em CSS no `body::before`: linhas de 1 px a cada 52 px em `rgb(244 239 234 / .12)`, giradas 7°, `position: fixed` atrás da página (o `inset: -50%` sobra para a rotação não deixar cantos vazios). As seções não têm mais fundo próprio; a separação entre elas é a borda `cream/10`.

### Hero

Nome em duas linhas (Fira Code bold, `BlurText` por letra) alinhado à esquerda; a foto em cápsula saiu e entrou `public/pato.png`, à direita no desktop e abaixo, à direita, no celular. A segunda linha tem `mt-[0.24em]`: com o nome alinhado à esquerda, o circunflexo do Â fica logo abaixo do I de VICTOR e encostava nele.

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

## Trajetória (`ui/timeline.jsx`)

Adaptada da timeline horizontal da Hyperiux Vault (21st.dev). A seção fica presa na tela (`position: sticky`) enquanto se rola, o trilho anda para o lado e cada cargo desenha a haste e o ponto e revela o texto linha a linha.

- Sem fundo próprio, sobre a grade escura. Texto `#F4EFEA` (secundário a 70%) e acento verde `#259B55` na linha, nas hastes, nos pontos e no nome da empresa; as cores entram por props em `Experience.jsx` (até 2026-10-22: fundo bege, acento laranja `#FF5F00`).
- Abertura com "Grupo GVS" acima da linha e "2025 — hoje" abaixo. Os 3 cargos, do mais antigo para o mais recente, alternam acima e abaixo: período em destaque e "cargo · Grupo GVS".
- Uma só timeline do GSAP com `scrub`, de `top top` a `bottom bottom` da seção: o trilho anda `scrollWidth − largura da janela`, a linha cresce com `scaleX` e cada cargo aparece quando a linha chega até ele (`offsetLeft` do cargo ÷ largura da linha).
- A altura da seção é calculada em JS (altura da janela + 1,4 × o deslocamento) e refeita no `refreshInit` do ScrollTrigger.
- SplitText com `mask: "lines"` só depois de `document.fonts.ready`, senão as linhas saem medidas com a fonte errada. Trocar de idioma remonta a timeline (`key={i18n.language}`), porque o SplitText reescreve o texto no DOM.
- Movimento reduzido: o trilho continua acompanhando a rolagem, mas linha, hastes e textos já aparecem prontos.
- Sem título visível: um `h2` só para leitor de tela ("Trajetória profissional").

> [!CAUTION]
> **defeito, com causa raiz**
> Linhas do texto já apareciam antes da hora. Causa: `fromTo` com `stagger` adicionado no meio de uma timeline com `scrub` só aplicava o estado inicial ao primeiro elemento. Correção: `gsap.set` explícito do estado inicial e animação com `.to`.

> [!TIP]
> **verificado em 2026-10-22**
> Edge headless via CDP, 1280 e 375 px: a seção fica presa durante todo o trecho, o trilho anda 461 px (desktop) e 690 px (celular), a linha vai de 0 a 100% e os 3 pontos aparecem em ordem. No fim, o último cargo fica inteiro na tela (x = 11 px no celular). Troca de idioma no meio da seção: texto em inglês e animação no ponto certo. Sem rolagem horizontal e sem erro no console.

## Componentes 21st.dev adaptados (`src/components/ui/`)

- `blur-text.jsx` — texto que entra desfocando.
- `floating-dock.jsx` — dock estilo macOS com magnificação (usado no "Sobre").
- `timeline.jsx` — timeline horizontal presa na tela, com GSAP (Trajetória).

> [!TIP]
> **atalho que vale lembrar**
>
> `lib/utils.js` tem um `cn()` simplificado (só `filter(Boolean).join(" ")`), **sem** `clsx`/`tailwind-merge`. Classes conflitantes não são resolvidas: ao portar outro componente do 21st.dev / shadcn que dependa de `twMerge`, o override por `className` pode não funcionar.
