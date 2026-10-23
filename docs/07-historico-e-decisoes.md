# 07 - Histórico e Decisões

Voltar: [Portfolio Victor](README.md)

## Linha do tempo

| Data | Commit | Marco |
|---|---|---|
| 2026-10-13 18:22 | `d30b8f0` | **Projeto base** — template Vite + React, oxlint, README com as referências e a paleta escura |
| 2026-10-13 23:07 | `319f11f` | **Site completo sem tradução** — todas as seções, fotos, fontes locais, componentes 21st.dev, visual claro bege |
| 2026-10-13 23:51 | `ae0f854` | **i18n pt-BR / en** — i18next, LanguageSwitcher, textos movidos para `translation.json` |
| 2026-10-20 | `315d191` | Documentação criada (vault Obsidian + `docs/` no repo) |
| 2026-10-20 | `92fe65d` | Formulário de contato com envio real via EmailJS (validado com envio real no mesmo dia) |
| 2026-10-20 | `e0f734a` | Favicon próprio: monograma "V" |
| 2026-10-20 | `83ce283` / `b726079` | Xulambis corrigido para Java (tag + mockup refeito) |
| 2026-10-20 | `d2cd10d` | Todo texto visível passa pelo i18n (tags, chips, alts, card de estudo contínuo) |
| 2026-10-20 | `fbca446` | Meta description acompanha o idioma |
| 2026-10-20 | `5115006` | Cargos apontam para grupogvs.com.br; Xulambis sem botão GitHub |
| 2026-10-20 | `5e29a93` | Limpeza: `portfolioData.js` só com estrutura; 12 arquivos sem uso removidos |
| 2026-10-20 | `607aba0` | Respeita `prefers-reduced-motion` |
| 2026-10-20 | `4b4f036` | README reescrito |
| 2026-10-21 | `a6d50b8` | Primeiro push: `origin/main` vai de `ae0f854` a `a6d50b8` (14 commits) |
| 2026-10-21 | `d5b7d5c` | Push que gerou o build de produção com as variáveis do EmailJS |
| 2026-10-21 | `7d9038f` | reCAPTCHA v2 no formulário de contato |
| 2026-10-21 | `4718272` | Push com o reCAPTCHA; no ar em ~20 s como `index-LTq7jCEZ.js` |
| 2026-10-21 | `30c9830` | Prévia de link (Open Graph) com captura do Hero |
| 2026-10-22 | `a425e0a` | Habilidades viram um globo 3D com 16 tecnologias e exemplos reais |
| 2026-10-22 | `58c3e8f` | Globo gira sem parar, uma volta a cada ~45 s |
| 2026-10-22 | `7ec8c0b` | Painel só com tecnologia escolhida; sem seleção, globo centralizado e maior |
| 2026-10-22 | `7ec8c0b` | Push `4718272..7ec8c0b` (6 commits); no ar em ~20 s como `index-Dyv5IByl.js` |
| 2026-10-22 | `595bac5` | Trajetória vira timeline por ano em fundo verde-musgo, sem título e sem fotos |
| 2026-10-22 | `6f3bfb3` | Trajetória vira timeline horizontal com GSAP, no fundo bege; o verde-musgo sai |

## Decisões

> [!IMPORTANT]
> **Trajetória sem título e sem fotos, em timeline horizontal**
> Em 2026-10-22 a Trajetória perdeu o cabeçalho ("03 · Vivência & Trajetória") e as fotos: a seção se explica pelo conteúdo. A primeira versão, no mesmo dia, foi o `timeline-3` em fundo verde-musgo; foi descartada (cor e componente) em favor da timeline horizontal da Hyperiux Vault, no fundo bege das outras seções e com acento laranja vivo `#FF5F00`. Dependência nova: `gsap` 3.15 (ScrollTrigger e SplitText vêm no pacote); o JS foi de 538 kB para 651 kB (gzip +45 kB). Resumo, local, bullets e chips de cada cargo saíram (recuperáveis pelo histórico): ficaram período, cargo e empresa.

> [!IMPORTANT]
> **globo de habilidades sem three.js**
> Em 2026-10-22 os dois cards (Backend, IA) viraram um globo como o `skills --globo` de aramuni.dev; no clique aparece um texto com exemplo real em vez de um link para o site da tecnologia. O original usa react-three-fiber (~950 KB só no chunk do globo); aqui é projeção à mão + `<canvas>` 2D, e o JS total foi de 512,83 kB para 538,02 kB. Detalhes em [03 - Design System](03-design-system.md).

> [!IMPORTANT]
> **só entra tecnologia com projeto real**
> Saíram PostgreSQL, Docker, Redis, LangChain, PyTorch, Pandas & NumPy, Ollama e Scikit-Learn e OpenAI API (sem projeto real). Entraram Spring Boot, React, Vercel, HTML, CSS, JavaScript, Tailwind, JUnit e WordPress, que têm projeto no grafo de repositórios do vault. Os exemplos vêm das notas de tecnologias do vault; ao mudar um, atualizar os dois `translation.json`.

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

> [!IMPORTANT]
> **reCAPTCHA v2 com componente próprio, sem dependência**
>
> Adicionado em 2026-10-21 para barrar robôs no formulário. v2 porque é a única versão que o EmailJS valida. Componente próprio (`ui/recaptcha.jsx`, ~70 linhas) em vez de `react-google-recaptcha`: carrega o script uma vez, escolhe `compact` em tela estreita e não adiciona pacote. O token vai pelo campo oculto que o próprio widget põe no `<form>` — nenhuma mudança na chamada ao EmailJS além de checar se ele existe.

> [!IMPORTANT]
> **imagem de prévia = captura do próprio Hero**
>
> Escolha de 2026-10-21 (em vez de uma arte separada): quem recebe o link vê exatamente a primeira tela do site. Gerada por captura automatizada, reproduzível — o comando está em [06 - Assets e Mídia](06-assets-e-midia.md).

> [!IMPORTANT]
> **tema escuro sobre a grade, com três cores**
>
> Desde 2026-10-22 o site usa o preto de `background-site.png` (`#161616`), o branco bege `#F4EFEA` e o verde `#259B55`, em vez do editorial claro. Os tons intermediários saem por opacidade dos tokens, não por uma escala nova. A grade é refeita em CSS em vez de usar a imagem, que é pequena demais para ampliar e não emenda ao repetir. Só a aparência mudou: nenhum componente perdeu função.

> [!IMPORTANT]
> **Trajetória em lista com painel, ilustrada em código**
>
> Em 2026-10-22 a timeline horizontal com GSAP deu lugar ao "Features with Panel" do ScrollX UI: lista dos cargos com resumo das funções e um painel com uma ilustração animada por cargo. As ilustrações são SVG desenhado em código, não vídeo: nítidas em qualquer tela, leves, na paleta do site e com movimento reduzido de graça. `ui/timeline.jsx` saiu com `git rm`.

> [!NOTE]
> **contexto**
>
> `scrape_linkedin.py` está no `.gitignore`: houve um script local para puxar dados do LinkedIn (provavelmente para montar a trajetória). Ele não está versionado.
