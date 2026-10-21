# 03 - Design System

Voltar: [Portfolio Victor](README.md)

## Direção

Editorial claro, bege quente, com acento verde-musgo. Seções numeradas `01 ·` a `06 ·` no estilo azal.im. Tokens definidos no bloco `@theme` de `src/index.css`.

## Paleta (tokens reais em uso)

| Token | Valor | Uso |
|---|---|---|
| `--color-warm-bg` | `#FAF8F5` | Fundo da página (também hardcoded em `index.html` e em várias seções) |
| `--color-warm-surface` / `-card` | `#FFFFFF` | Cards |
| `--color-warm-card-subtle` | `#F4EFEA` | Card secundário |
| `--color-warm-border` | `rgba(0,0,0,.06)` | Bordas (hover `.14`) |
| `--color-warm-dark` | `#151515` | Texto principal |
| `--color-warm-charcoal` | `#2A2A2A` | |
| `--color-warm-body` | `#4C4842` | Texto corrido |
| `--color-warm-muted` | `#7E7870` | Texto secundário |
| `--color-moss-accent` | `#2B4636` | Acento (hover `#3A5C47`, fundo suave `#EBF1ED`) |

Os componentes usam muito a escala `stone-*` do Tailwind direto, além dos tokens. Seleção de texto: fundo `stone-900`, texto `stone-50`. Scrollbar customizada (7 px, thumb `#D8D2C6`).

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

Definidas em `index.css`: `spin-slow` (22 s), `float-gentle-1/2` (6–7 s), `border-beam`, `marquee` (pausa no hover). Utilitários de máscara: `.mask-fade-b` (fade inferior da foto) e `.mask-fade-all` (radial). Textura `.bg-warm-grain` (pontilhado 20 px).

Animações em JS via `motion/react` (no `floating-dock`).

### Movimento reduzido (desde 2026-10-20)

Com "reduzir movimento" ligado no sistema (`prefers-reduced-motion: reduce`):

| Camada | Como | Efeito |
|---|---|---|
| Animações e transições CSS (inclui inline do BlurText e dos cards) | bloco `@media` no fim de `index.css`: `animation/transition-duration: 0.01ms !important`, `iteration-count: 1`, `transition-delay: 0s` | Tudo vai direto ao estado final |
| Rolagem por âncora | mesmo bloco: `scroll-behavior: auto !important` | Salto direto |
| "Voltar ao topo" (JS) | `Footer.jsx` consulta `matchMedia` antes do `scrollTo` | Salto direto |
| BorderBeam | `motion-reduce:hidden` | Some (decorativo; parado viraria um traço solto) |
| FloatingDock (motion/react) | `MotionConfig reducedMotion="user"` + `useReducedMotion()` no `IconContainer` | Tooltip/menu sem deslocamento; ícones sem ampliação, tamanho fixo |

> [!TIP]
> **atalho que vale lembrar**
>
> `msedge --force-prefers-reduced-motion` simula a preferência. Para ler estilos computados no headless: uma página temporária em `dist/` com `<iframe src="/">` da mesma origem, que grava `getComputedStyle` no próprio DOM; depois `--dump-dom`. Usar polling até `#projects` existir — o `onload` do iframe não é confiável com `--virtual-time-budget`.

> [!WARNING]
> **armadilha**
>
> `.animate-spin-slow` e `.animate-float-1/2` estão definidas no `index.css` mas nenhum componente usa. O `Marquee` das Skills recebe `[--duration:28s]` por classe, mas o `style` inline do componente (`duration` padrão 25) vence — a duração real é 25 s.

## Componentes 21st.dev adaptados (`src/components/ui/`)

- `blur-text.jsx` — texto que entra desfocando.
- `border-beam.jsx` — feixe de luz percorrendo a borda (usa `offset-distance`).
- `floating-dock.jsx` — dock estilo macOS com magnificação (usado no "Sobre").
- `marquee.jsx` — faixa rolando infinita.

> [!TIP]
> **atalho que vale lembrar**
>
> `lib/utils.js` tem um `cn()` simplificado (só `filter(Boolean).join(" ")`), **sem** `clsx`/`tailwind-merge`. Classes conflitantes não são resolvidas: ao portar outro componente do 21st.dev / shadcn que dependa de `twMerge`, o override por `className` pode não funcionar.
