# 06 - Assets e Mídia

Voltar: [Portfolio Victor](README.md)

Tudo em `public/`, servido na raiz (`/arquivo`). Levantamento feito em 2026-10-20 com `grep` em `src/` e `index.html` + `md5sum` nos PNGs.

## Em uso

| Arquivo | Onde |
|---|---|
| `victor-sem-fundo.png` | Foto recortada do Hero |
| `vitin ponto de onibus estilo.jpeg` | Foto da seção Sobre |
| `victor-agora.jpeg` | Cargo atual (Analista de TI — COR) |
| `victor-meio.jpeg` | Cargo Comunicação & Web |
| `victor-inicio.jpeg` | Cargo Assistente de Comunicação |
| `projects/grupogvs-hero.png` | Card do projeto GVS |
| `projects/xulambis-terminal.png` | Card do projeto Xulambis |
| `fonts/HyperlegibleSans-*.woff2`, `fonts/SmileMoon.otf` | `index.css` |

## Peso morto (~4,9 MB)

| Arquivo | Situação |
|---|---|
| `avatar.png` | Nunca referenciado |
| `victor curriculo.png` | Só em `personal.avatarUrl`, campo que nenhum componente lê |
| `experience/exp-ti-cor.png` | Byte a byte igual a `victor curriculo.png`; não referenciado |
| `experience/exp-comunicacao-web.png` | Igual a `projects/grupogvs-hero.png`; não referenciado |
| `experience/exp-comunicacao-mkt.png` | Igual a `projects/grupogvs-full.png`; não referenciado |
| `projects/grupogvs-full.png` | Não referenciado |
| `fonts/Relieve.woff2` | Não referenciada no CSS |
| `favicon.svg`, `icons.svg` | Restos do template Vite; não referenciados |

`src/assets/` (`hero.png`, `react.svg`, `vite.svg`) também são restos do template.

> [!WARNING]
> **armadilha**
>
> Nomes de arquivo com espaço (`victor curriculo.png`, `vitin ponto de onibus estilo.jpeg`) funcionam no Vite, mas exigem cuidado em links, scripts e deploys. Preferir `kebab-case` em arquivos novos.

> [!CAUTION]
> **defeito, com causa raiz**
>
> **Favicon quebrado.** `index.html` aponta para `/vite.svg`, que não existe em `public/` (só existe `src/assets/vite.svg`, que não é servido na raiz). Resultado: 404 e aba sem ícone. Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md).
