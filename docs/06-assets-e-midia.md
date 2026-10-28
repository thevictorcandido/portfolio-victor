# 06 - Assets e Mídia

Voltar: [Portfolio Victor](README.md)

Tudo em `public/`, servido na raiz (`/arquivo`). Levantamento feito em 2026-10-20 com `grep` em `src/` e `index.html` + `md5sum` nos PNGs.

## Em uso

| Arquivo | Onde |
|---|---|
| `pato.webp` | Pato do Hero, recortado do fundo, 664 × 788, 30 KB (desde 2026-10-22) |
| `background-site.png` | Referência da grade de fundo; não é carregada, a grade é refeita em CSS (ver [03 - Design System](03-design-system.md)) |
| `vitin ponto de onibus estilo.jpeg` | Foto da seção Sobre |
| `projects/grupogvs-hero.webp` | Card do projeto GVS — 1440 × 900, WebP qualidade 85, 179 KB (o PNG tinha 1,4 MB; trocado em 2026-10-23) |
| `projects/degrau-educa/*.webp` | Estudo de caso do Degrau Educa (19 imagens, 817 KB); `home.webp` também é a imagem do card (desde 2026-10-28) |
| `fonts/HyperlegibleSans-*.woff2`, `fonts/SmileMoon.otf` | `index.css` |
| `favicon.svg` | Favicon — monograma "V" verde elétrico `#3FEE3F` sobre carbono `#191A1D` (desde 2026-10-20; cores desde 2026-10-23) |
| `og-image.png` | Prévia de link (Open Graph) — captura do Hero, 1200×630, 197 KB sem redução de cores (desde 2026-10-21; refeita em 2026-10-23 com a paleta nova) |

> [!TIP]
> **removidas em 2026-10-22**
> `victor-agora.jpeg`, `victor-meio.jpeg` e `victor-inicio.jpeg` (uma foto por cargo na Trajetória) saíram com `git rm` quando a seção trocou de componente.

## Prints do Degrau Educa (`projects/degrau-educa/`)

19 imagens em WebP qualidade 80, 817 KB no total, carregadas só no estudo de caso (`loading="lazy"`): 13 telas do app a 1440 px de largura e 6 artefatos de Design Thinking do repositório do projeto (Matriz CSD, mapa de stakeholders, user flow, histórias de usuário e dois wireframes).

Como as telas foram feitas, em 2026-10-28:

1. Repositório da disciplina (zip) extraído no scratchpad; o app rodou com `npx json-server@0.17.4 --watch db.json --static codigo/public --port 3401`, sobre uma cópia do banco.
2. O app guarda o usuário logado em `localStorage.usuarioLogado`. Uma página auxiliar, criada só na cópia extraída, busca `/usuarios/<id>` (usuário 1 = aluno, 2 = admin, do próprio banco de exemplo), grava a sessão e redireciona; as capturas seguintes usam o mesmo perfil do Edge.
3. Os módulos do painel admin trocam pela função global `abrirModulo()`. Outra página auxiliar abre o `admin.html` num iframe e chama `abrirModulo`, `editarCurso` ou `editarJornada` antes da captura.
4. Edge headless em 1440 × 900 (1440 × 1000 para os formulários do admin), um processo por tela com tempo-limite de 35 s.

> [!WARNING]
> **armadilha**
>
> `Start-Process -ArgumentList @(...)` não põe aspas: um caminho com espaço ("Victor Leite") quebra o `--screenshot` e o Edge sai sem gerar nada. Usar o caminho curto (`C:\Users\VICTOR~1\...`). E telas de celular saem cortadas no headless, que não encolhe a janela abaixo de ~500 px.

## Recorte do pato (`pato.webp`)

A ilustração original (341 × 417, `pato.png`, no histórico do git) vinha num papel bege quadriculado, com um "?", uma seta e uma curva soltos em volta. O recorte foi automatizado em Python/Pillow:

1. Fundo = tudo que se alcança a partir da borda passando só por cores próximas do papel `(235, 233, 220)` ou das linhas da grade `(220, 220, 208)` (distância RGB < 28). O contorno escuro do pato segura a inundação.
2. Do que sobra, fica só o maior pedaço conexo, o pato; o "?", a seta e a curva saem.
3. O vão de papel entre as pernas fica preso dentro do contorno e é tirado à parte. Só ali: as faces brancas do pato têm quase a cor do papel e sumiriam junto.
4. Ampliado 2× (LANCZOS + leve nitidez) para telas de alta densidade; a máscara é suavizada e encolhida 1 px para não deixar franja bege na borda.

Exportado em WebP (qualidade 92, alfa sem perda): 30 KB. Em PNG eram 380 KB, e reduzir a paleta para 256 cores manchava as faces.

## Prévia de link (Open Graph)

`og-image.png` é uma captura do Hero real em 1200×630, feita no Edge headless com `--force-prefers-reduced-motion` (o BlurText já sai no estado final, sem desfoque no meio):

```bash
msedge --headless --disable-gpu --force-prefers-reduced-motion --lang=pt-BR --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 --user-data-dir=<pasta nova> \
  --virtual-time-budget=8000 --screenshot=og-image.png http://localhost:4173/
```

> [!WARNING]
> **armadilha**
>
> Não reduzir as cores da `og-image.png`: com 128 cores (corte mediano) o verde elétrico do botão de idioma virou cinza-esverdeado, e com 256 (cobertura máxima) o halo do Hero ganhou faixas. Salva sem perda, fica em ~200 KB, abaixo do limite de 300 KB das prévias.

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
