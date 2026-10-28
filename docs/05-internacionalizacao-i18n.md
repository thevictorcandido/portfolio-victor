# 05 - Internacionalização (i18n)

Voltar: [Portfolio Victor](README.md)

## Como está montado

> [!NOTE]
> **contexto**
>
> A arquitetura segue o repositório da disciplina DIAW (Prof. João Paulo Aramuni): config separada em `src/config/i18nConfig.js`, init em `src/i18n/index.js`, um `translation.json` por idioma e um `LanguageSwitcher`.

- **Idiomas:** `pt-BR` (Português, bandeira BR) e `en` (English, bandeira US).
- **Fallback:** `import.meta.env.VITE_DEFAULT_LANGUAGE` ou `pt-BR`.
- **Detecção:** `localStorage` (chave `i18nextLng`) → idioma do navegador. A escolha fica salva no `localStorage`.
- `interpolation.escapeValue: false` (React já escapa).
- `src/main.jsx` importa `./i18n` **antes** do `App`, para o init acontecer antes do primeiro render.
- No evento `languageChanged`, `syncDocument` atualiza `<html lang>` e `document.title` (chave `meta.title`).
- Textos em lista (bio, bullets, disciplinas) usam `t(chave, { returnObjects: true })`.

## LanguageSwitcher

`src/components/LanguageSwitcher/LanguageSwitcher.jsx` — pílula com botões PT/EN, `aria-pressed` no ativo, `title` "Mudar para {{language}}", atributo `lang` em cada botão. Considera ativo por prefixo (`pt*` → pt-BR, `en*` → en), para cobrir `en-US`, `pt-PT` etc. vindos do navegador.

## Cobertura medida em 2026-10-20

> [!TIP]
> **o que ficou pronto**
>
> 113 chaves em cada idioma, nenhuma faltando em nenhum dos dois (comparação recursiva das chaves dos dois JSON).
> Em 2026-10-20 subiu para **119** com as chaves do formulário (`contact.sendingBtn`, `successTitle`, `successText`, `errorText`, `copy`, `copied`) e depois para **153** ao trazer tags, tecnologias, alts e textos fixos para o i18n — paridade mantida.

> [!TIP]
> **~~no inglês aparecem textos em português~~ — corrigido em 2026-10-20**
>
> **Causa raiz:** vários textos visíveis eram lidos de `portfolioData.js` ou estavam fixos no JSX, fora do i18next.
> **O que foi movido para os JSON:**
> | Antes | Agora |
> |---|---|
> | `projects[].title`, `projects[].tags` | `projects.<chave>Title`, `projects.<chave>Tags` (chave = `id` sem o `proj-`, ex.: `gvs`) |
> | `experiences[].technologies`, `.imageAlt` | `experience.roles.{cor,web,mkt}.technologies`, `.imageAlt` |
> | `skillsCategories[].technologies[].role` | `skills.techRoles.<key>` (cada tecnologia ganhou `key`) |
> | `education[1]` inteiro + rodapé fixo do card | `education.continuous.{course,institution,period,desc,footer}` |
> | "Navegação" fixo no menu do Hero | `nav.menuTitle` |
> | `aria-label` fixo do FloatingDock | prop `toggleLabel` ← `about.dock.toggle` |
> | "Engenharia de Software" fixo no Footer | `footer.course` |
>
> **Verificação:** build servido com `vite preview`, DOM renderizado pelo Edge headless com `--lang=en-US`; varredura de texto visível + `alt`/`aria-label`/`title`/`placeholder` sem nenhum resto em português (sobram só nomes próprios: Grupo GVS, PUC Minas, Cândido).

> [!TIP]
> **atalho que vale lembrar**
>
> Para auditar o idioma renderizado: `vite preview` + `msedge --headless --lang=en-US --user-data-dir=<pasta nova> --virtual-time-budget=4000 --dump-dom http://localhost:4173/`. A pasta nova de perfil garante que não há `i18nextLng` salvo no `localStorage`.

> [!TIP]
> **~~`<meta name="description">` não muda com o idioma~~ — corrigido em 2026-10-20**
>
> **Causa raiz:** `syncDocument` só atualizava `title` e `lang`; a chave `meta.description` existia nos JSON mas ninguém a lia.
> **Correção:** `syncDocument` também atualiza a description. O texto fixo do `index.html` (que divergia) foi alinhado ao `meta.description` pt-BR. Verificado no DOM renderizado: `en` e `pt-BR` trazem `lang`, `<title>` e description do idioma certo.

> [!WARNING]
> **armadilha**
>
> A troca é feita por JavaScript. O Google executa JS e enxerga a versão traduzida; **previews de link** (WhatsApp, LinkedIn, Discord) não executam e sempre mostram o texto fixo do `index.html`, em pt-BR. Desde 2026-10-21 o `index.html` tem tags Open Graph (em pt-BR, pelo mesmo motivo) — ver [06 - Assets e Mídia](06-assets-e-midia.md).
