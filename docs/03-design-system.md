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

> [!WARNING]
> **armadilha**
>
> A paleta escura (`#0C0F0D`, `#152218`…`#3A5742`) descrita no README **não existe mais no código**. Não usar o README como referência de cor.

## Tipografia

| Papel | Família | Origem |
|---|---|---|
| Texto (`font-sans`) | Montserrat 300–900 | Google Fonts |
| Títulos (`font-display`) | Hyperlegible Sans 400/500/700 + itálico | Local, `public/fonts/*.woff2` |
| Destaque (`font-special`) | Smile Moon | Local, `public/fonts/SmileMoon.otf` |
| Código | Fira Code 700/800 | Google Fonts |
| — | Antic | Google Fonts (veio com componente 21st.dev) |

`Relieve.woff2` está em `public/fonts` mas não é referenciada em lugar nenhum.

## Animações

Definidas em `index.css`: `spin-slow` (22 s), `float-gentle-1/2` (6–7 s), `border-beam`, `marquee` (pausa no hover). Utilitários de máscara: `.mask-fade-b` (fade inferior da foto) e `.mask-fade-all` (radial). Textura `.bg-warm-grain` (pontilhado 20 px).

Animações em JS via `motion/react` (no `floating-dock`).

> [!WARNING]
> **armadilha**
>
> Nenhuma animação respeita `prefers-reduced-motion` (zero ocorrências de `reduced`, `motion-safe` ou `useReducedMotion` em `src/`). Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md).

## Componentes 21st.dev adaptados (`src/components/ui/`)

- `blur-text.jsx` — texto que entra desfocando.
- `border-beam.jsx` — feixe de luz percorrendo a borda (usa `offset-distance`).
- `floating-dock.jsx` — dock estilo macOS com magnificação (usado no "Sobre").
- `marquee.jsx` — faixa rolando infinita.

> [!TIP]
> **atalho que vale lembrar**
>
> `lib/utils.js` tem um `cn()` simplificado (só `filter(Boolean).join(" ")`), **sem** `clsx`/`tailwind-merge`. Classes conflitantes não são resolvidas: ao portar outro componente do 21st.dev / shadcn que dependa de `twMerge`, o override por `className` pode não funcionar.
