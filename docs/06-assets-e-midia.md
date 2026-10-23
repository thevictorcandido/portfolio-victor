# 06 - Assets e Mídia

Voltar: [Portfolio Victor](README.md)

Tudo em `public/`, servido na raiz (`/arquivo`). Levantamento feito em 2026-10-20 com `grep` em `src/` e `index.html` + `md5sum` nos PNGs.

## Em uso

| Arquivo | Onde |
|---|---|
| `pato.png` | Ilustração do Hero (341 × 417), desde 2026-10-22 |
| `background-site.png` | Referência da grade de fundo; não é carregada, a grade é refeita em CSS (ver [03 - Design System](03-design-system.md)) |
| `victor-sem-fundo.png` | **Sem uso** desde 2026-10-22, quando o Hero trocou a foto pelo pato |
| `vitin ponto de onibus estilo.jpeg` | Foto da seção Sobre |
| `projects/grupogvs-hero.png` | Card do projeto GVS |
| `projects/xulambis-terminal.png` | Card do projeto Xulambis — **mockup**, não print real; recriado em 2026-10-20 a partir de `docs/mockups/xulambis-terminal.html` |
| `fonts/HyperlegibleSans-*.woff2`, `fonts/SmileMoon.otf` | `index.css` |
| `favicon.svg` | Favicon — monograma "V" musgo/bege (desde 2026-10-20) |
| `og-image.png` | Prévia de link (Open Graph) — captura do Hero, 1200×630, 94 KB em 128 cores (desde 2026-10-21; refeita em 2026-10-22 com o tema escuro) |

> [!TIP]
> **removidas em 2026-10-22**
> `victor-agora.jpeg`, `victor-meio.jpeg` e `victor-inicio.jpeg` (uma foto por cargo na Trajetória) saíram com `git rm` quando a seção trocou de componente.

## Prévia de link (Open Graph)

`og-image.png` é uma captura do Hero real em 1200×630, feita no Edge headless com `--force-prefers-reduced-motion` (o BlurText já sai no estado final, sem desfoque no meio):

```bash
msedge --headless --disable-gpu --force-prefers-reduced-motion --lang=pt-BR --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 --user-data-dir=<pasta nova> \
  --virtual-time-budget=8000 --screenshot=og-image.png http://localhost:4173/
```

As tags ficam no `<head>` do `index.html`: `og:title`, `og:description`, `og:image` (URL **absoluta**), `og:image:width/height/alt`, `og:url`, `og:locale` + `twitter:card=summary_large_image` e `<link rel="canonical">`.

> [!WARNING]
> **armadilha**
>
> Se o Hero mudar (texto, foto, layout), a imagem de prévia **não** acompanha — refazer a captura. E WhatsApp/LinkedIn guardam a prévia em cache por URL: depois de trocar a imagem, forçar a atualização no **LinkedIn Post Inspector** (linkedin.com/post-inspector); no WhatsApp a prévia antiga pode persistir por dias.

> [!TIP]
> **limpeza feita em 2026-10-20**
>
> Os 12 arquivos abaixo (+ `src/App.css`, `src/assets/*`) foram removidos com `git rm` — recuperáveis pelo histórico. `public/` caiu para **2,9 MB**. Conferido: todas as imagens referenciadas no DOM renderizado respondem 200.

## Peso morto removido (~5,3 MB contando `src/assets` e `App.css`)

| Arquivo | Situação |
|---|---|
| `avatar.png` | Nunca referenciado |
| `victor curriculo.png` | Só em `personal.avatarUrl`, campo que nenhum componente lê |
| `experience/exp-ti-cor.png` | Byte a byte igual a `victor curriculo.png`; não referenciado |
| `experience/exp-comunicacao-web.png` | Igual a `projects/grupogvs-hero.png`; não referenciado |
| `experience/exp-comunicacao-mkt.png` | Igual a `projects/grupogvs-full.png`; não referenciado |
| `projects/grupogvs-full.png` | Não referenciado |
| `fonts/Relieve.woff2` | Não referenciada no CSS |
| `icons.svg` | Resto do template Vite; não referenciado |

`src/assets/` (`hero.png`, `react.svg`, `vite.svg`) e `src/App.css` também eram restos do template, nunca importados.

> [!WARNING]
> **armadilha**
>
> Nomes de arquivo com espaço (`victor curriculo.png`, `vitin ponto de onibus estilo.jpeg`) funcionam no Vite, mas exigem cuidado em links, scripts e deploys. Preferir `kebab-case` em arquivos novos.

> [!TIP]
> **favicon corrigido em 2026-10-20**
>
> Antes, `index.html` apontava para `/vite.svg`, inexistente em `public/` (404, aba sem ícone). Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md).
