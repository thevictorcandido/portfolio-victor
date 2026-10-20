# 02 - Stack e Arquitetura

Voltar: [Portfolio Victor](README.md)

## Stack (package.json em 2026-10-20)

| Camada | Pacote | Versão |
|---|---|---|
| UI | `react`, `react-dom` | ^19.2.8 |
| Build | `vite` + `@vitejs/plugin-react` | ^8.3.0 / ^6.1.1 |
| CSS | `tailwindcss` + `@tailwindcss/vite` | ^4.3.3 |
| Animação | `motion` (ex-Framer Motion) | ^14.2.0 |
| Ícones | `lucide-react` + SVGs próprios em `TechIcons.jsx` / `Icons.jsx` | ^1.56.0 |
| i18n | `i18next`, `react-i18next`, `i18next-browser-languagedetector` | ^26.4.4 / ^17.0.16 / ^8.2.1 |
| Bandeiras | `country-flag-icons` | ^1.6.20 |
| Lint | `oxlint` (plugins `react`, `oxc`) | ^1.81.0 |

Sem TypeScript (JSX puro), sem roteador, sem backend. Alias `@` → `./src` em `vite.config.js`.

## Estrutura

```
src/
  main.jsx                 importa ./i18n ANTES do App
  App.jsx                  só compõe as seções, na ordem
  index.css                @theme do Tailwind v4, @font-face, keyframes
  i18n/index.js            init do i18next + sincroniza <html lang> e <title>
  i18n/locales/{pt-BR,en}/translation.json
  config/i18nConfig.js     idiomas, fallback, chave do localStorage
  data/portfolioData.js    dados estruturados (links, imagens, tags, skills)
  lib/utils.js             cn() — join simples de classes
  components/
    Navbar, Hero, About, Projects, Experience, Skills, Education, Contact, Footer
    Icons.jsx, TechIcons.jsx
    LanguageSwitcher/LanguageSwitcher.jsx
    ui/ blur-text, border-beam, floating-dock, marquee   (adaptados do 21st.dev)
```

~2.100 linhas de JSX em 15 componentes. Maiores: `Projects` (243), `Experience` (238), `Contact` (223), `Hero` (220).

## Fluxo de dados

> [!IMPORTANT]
> **o que não pode ser esquecido**
>
> Existem **duas fontes de texto**:
> - `translation.json` → todo texto visível que foi traduzido (títulos, bios, bullets, cargos).
> - `portfolioData.js` → links, imagens, `navItems` (ids das âncoras), `skillsCategories`, `experiences[].technologies`, `projects[].tags`.
>
> Os componentes leem as duas. `portfolioData.js` ainda guarda versões antigas em pt-BR dos textos (bio, bullets, descrições) que hoje **não são renderizadas** — são só fallback ou peso morto. Editar texto ali não muda o site.

Padrão usado nos componentes:

```jsx
const { t } = useTranslation()
const { experiences } = portfolioData
const roleData = t(`experience.roles.${rKey}`, { returnObjects: true }) || {}
```

Navbar detecta a seção ativa por scroll usando `portfolioData.navItems[].id` — os ids das `<section>` precisam bater com essa lista.

Campos de `portfolioData` que **nenhum componente lê**: `personal.avatarUrl`, `personal.resumeUrl`, `stats`.

## Build medido em 2026-10-20

- 2.371 módulos transformados, build em 1,79 s.
- JS: **512,83 kB** (gzip 159,87 kB) — acima do limite de aviso de 500 kB do Vite.
- CSS: 58,64 kB (gzip 10,66 kB).

Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md) para o aviso de tamanho.
