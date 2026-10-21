# 07 - Histórico e Decisões

Voltar: [Portfolio Victor](README.md)

## Linha do tempo

| Data | Commit | Marco |
|---|---|---|
| 2026-10-13 18:22 | `d30b8f0` | **Projeto base** — template Vite + React, oxlint, README com as referências e a paleta escura |
| 2026-10-13 23:07 | `319f11f` | **Site completo sem tradução** — todas as seções, fotos, fontes locais, componentes 21st.dev, visual claro bege |
| 2026-10-13 23:51 | `ae0f854` | **i18n pt-BR / en** — i18next, LanguageSwitcher, textos movidos para `translation.json` |
| 2026-10-20 | `cd4e1ec` | Documentação criada (vault Obsidian + `docs/` no repo) |
| 2026-10-20 | `5b63243` | Formulário de contato com envio real via EmailJS (validado com envio real no mesmo dia) |
| 2026-10-20 | `cc37d83` | Favicon próprio: monograma "V" |
| 2026-10-20 | `1a7037c` / `7bd9a6c` | Xulambis corrigido para Java (tag + mockup refeito) |
| 2026-10-20 | `b2ad3d8` | Todo texto visível passa pelo i18n (tags, chips, alts, card de estudo contínuo) |
| 2026-10-20 | `2fceddb` | Meta description acompanha o idioma |
| 2026-10-20 | `3ab3bb4` | Cargos apontam para grupogvs.com.br; Xulambis sem botão GitHub |
| 2026-10-20 | `038a3df` | Limpeza: `portfolioData.js` só com estrutura; 12 arquivos sem uso removidos |
| 2026-10-20 | `9dd5241` | Respeita `prefers-reduced-motion` |
| 2026-10-20 | `18c6ce8` | README reescrito |

## Decisões

> [!IMPORTANT]
> **tema claro em vez de escuro**
>
> O projeto base (README) previa fundo quase preto e verde-musgo. No commit `319f11f` o visual virou **bege claro editorial** (`#FAF8F5`) com o verde-musgo só como acento (`#2B4636`). O motivo não está registrado; o resultado conversa com as referências editoriais (pedrobragadev) e com o tom "criativo" do texto. O README só foi atualizado em 2026-10-20.

> [!IMPORTANT]
> **i18n no padrão da disciplina**
>
> A estrutura de i18n copia a do repositório de DIAW do professor, para facilitar a avaliação e manter a mesma convenção (`config/i18nConfig.js`, `i18n/index.js`, `locales/<lng>/translation.json`, `LanguageSwitcher`).

> [!IMPORTANT]
> **conteúdo centralizado em dados**
>
> Desde o projeto base, textos e links ficam fora dos componentes (`portfolioData.js`). Com o i18n, o texto migrou para os JSON, mas os dados estruturais (links, imagens, tags) ficaram em `portfolioData.js` — ver [02 - Stack e Arquitetura](02-stack-e-arquitetura.md).

> [!IMPORTANT]
> **componentes 21st.dev copiados, não instalados**
>
> `blur-text`, `border-beam`, `floating-dock`, `marquee` foram trazidos como código para `src/components/ui/`, com um `cn()` próprio, sem adicionar `clsx`/`tailwind-merge`.

> [!IMPORTANT]
> **lint com oxlint em vez de ESLint**
>
> Mais rápido e com zero configuração extra; regras ativas: `react/rules-of-hooks` (erro) e `react/only-export-components` (aviso).

> [!IMPORTANT]
> **EmailJS para o formulário de contato**
>
> Escolhido em 2026-10-20, entre Formspree, EmailJS e `mailto:`. Funciona 100% no front (sem backend), cabe num site estático e o template de e-mail é editável no painel. Credenciais ficam em `VITE_EMAILJS_*` (`.env.local`, já ignorado pelo `*.local` do `.gitignore`).

> [!IMPORTANT]
> **favicon em SVG com traço, sem fonte**
>
> O "V" é um `path` com `stroke`, não um `<text>`: favicons SVG não carregam as fontes do site, e o texto cairia numa fonte do sistema diferente em cada navegador. Só SVG, sem `.ico`/PNG: todos os navegadores atuais aceitam favicon SVG.

> [!IMPORTANT]
> **texto visível só no JSON; portfolioData só com estrutura**
>
> Ao mover um texto para o i18n, o campo correspondente sai do `portfolioData.js` no mesmo commit, para não haver duas fontes. Os textos antigos que já não eram lidos (bio, bullets, descrições) ficam para o item de limpeza do backlog. Tecnologias das skills usam `key` estável (`python`, `git`, `rest`…) em vez do nome, porque nomes como "Git & GitHub" não servem como chave.

> [!IMPORTANT]
> **movimento reduzido por regra global, não classe a classe**
>
> Um bloco `@media (prefers-reduced-motion: reduce)` com `!important` cobre todas as animações e transições, inclusive as inline, sem precisar marcar cada componente com `motion-safe:`. Só o que o CSS não alcança (springs do motion, `scrollTo` em JS) e o que fica feio parado (BorderBeam) foi tratado à parte. Transições viram 0,01 ms em vez de `none` para que `transitionend`/`animationend` ainda disparem.

> [!NOTE]
> **contexto**
>
> `scrape_linkedin.py` está no `.gitignore`: houve um script local para puxar dados do LinkedIn (provavelmente para montar a trajetória). Ele não está versionado.
