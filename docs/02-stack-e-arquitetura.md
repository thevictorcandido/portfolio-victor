# 02 - Stack e Arquitetura

Voltar: [Portfolio Victor](README.md)

## Stack (package.json em 2026-10-20)

| Camada | Pacote | Versão |
|---|---|---|
| UI | `react`, `react-dom` | ^19.2.8 |
| Build | `vite` + `@vitejs/plugin-react` | ^8.3.0 / ^6.1.1 |
| CSS | `tailwindcss` + `@tailwindcss/vite` | ^4.3.3 |
| Animação | `motion` (ex-Framer Motion) no dock e na Trajetória; `gsap` na entrada do pato do Hero | ^14.2.0 / ^3.15.0 |
| Ícones | `lucide-react` + SVGs próprios em `TechIcons.jsx` / `Icons.jsx` | ^1.56.0 |
| i18n | `i18next`, `react-i18next`, `i18next-browser-languagedetector` | ^26.4.4 / ^17.0.16 / ^8.2.1 |
| Bandeiras | `country-flag-icons` | ^1.6.20 |
| E-mail | `@emailjs/browser` (formulário de contato) | ^4.4.1 |
| Lint | `oxlint` (plugins `react`, `oxc`) | ^1.81.0 |

Sem TypeScript (JSX puro), sem roteador, sem backend. Alias `@` → `./src` em `vite.config.js`.

## Estrutura

```
src/
  main.jsx                 importa ./i18n ANTES do App
  App.jsx                  rota: página inicial (as seções, na ordem) ou estudo de caso
  index.css                @theme do Tailwind v4, @font-face, keyframes
  i18n/index.js            init do i18next + sincroniza <html lang> e <title>
  i18n/locales/{pt-BR,en}/translation.json
  config/i18nConfig.js     idiomas, fallback, chave do localStorage
  config/emailjsConfig.js  IDs do EmailJS lidos de VITE_EMAILJS_* + isEmailjsConfigured
  config/recaptchaConfig.js  Site Key do reCAPTCHA v2 (VITE_RECAPTCHA_SITE_KEY)
  data/portfolioData.js    dados estruturados (links, imagens, tags, skills)
  lib/utils.js             cn() — join simples de classes
  lib/router.js            rotas pela History API: usePathname, navigate, <Link>
  pages/CaseStudyDegrauEduca.jsx   estudo de caso /projetos/degrau-educa (lazy)
  components/
    Navbar, Hero, About, Projects, Experience, Skills, Education, Contact, Footer
    Icons.jsx, TechIcons.jsx, SkillsGlobe.jsx
    LanguageSwitcher/LanguageSwitcher.jsx
    ui/ blur-text, floating-dock, features-with-panel   (adaptados do 21st.dev)
    ui/ recaptcha                                        (widget v2, carga explícita)
```

~2.100 linhas de JSX em 15 componentes. Maiores: `Projects` (243), `Experience` (238), `Contact` (223), `Hero` (220).

## Fluxo de dados

> [!IMPORTANT]
> **o que não pode ser esquecido**
>
> Existem **duas fontes de texto**:
> - `translation.json` → todo texto visível que foi traduzido (títulos, bios, bullets, cargos).
> - `portfolioData.js` → links, imagens, `navItems` (ids das âncoras), ids dos cards, nome/cor/`key` de cada tecnologia. Desde 2026-10-20, tags, chips, alts e títulos **não** ficam mais aqui.
>
> Desde 2026-10-20 `portfolioData.js` não tem **nenhum** texto visível: só links, caminhos de imagem e ids. Os ids ligam cada item às suas chaves de tradução (`experiences[].id` → `experience.roles.<id>`, `skills[].key` → `skills.items.<key>`, `education[].id` → `puc` / `continuous`).

Padrão usado nos componentes:

```jsx
const { t } = useTranslation()
const title = t(`experience.roles.${exp.id}.title`)
```

Navbar detecta a seção ativa por scroll usando `portfolioData.navItems[].id` — os ids das `<section>` precisam bater com essa lista.

Campos mortos (`avatarUrl`, `resumeUrl`, `stats`, bio, bullets, descrições, `category`, `accentColor`, `color` das tecnologias, `label` dos navItems) foram removidos em 2026-10-20.

## Rotas (desde 2026-10-28)

Sem biblioteca de rotas: `src/lib/router.js` (~30 linhas) lê `location.pathname` com `useSyncExternalStore` e escuta o `popstate`; `navigate()` faz `pushState`, e `<Link>` troca de página sem recarregar (Ctrl/Cmd+clique continua abrindo em outra aba).

- `/` → página inicial (as seções de sempre).
- `/projetos/<slug>` → estudo de caso. O mapa `caseStudies` em `App.jsx` liga o slug à página; cada uma é um `lazy()` e vira um chunk à parte (o do Degrau Educa tem 15,6 kB), baixado só quando a página abre. Slug desconhecido cai na página inicial.
- Ao trocar de página, `App.jsx` vai até a âncora da URL (`/#projects`) ou volta ao topo.
- Fora da página inicial a Navbar recebe `onHome={false}`: os links viram `/#secao` (voltam para a inicial já na seção) e "Projetos" fica marcado.
- `vercel.json` reescreve qualquer caminho para `/index.html`; sem ele, abrir `/projetos/degrau-educa` direto daria 404 na Vercel. O `vite` e o `vite preview` já fazem isso sozinhos.

## Build medido em 2026-10-20

- 2.371 módulos transformados, build em 1,79 s.
- JS: **512,83 kB** (gzip 159,87 kB) — acima do limite de aviso de 500 kB do Vite.
- CSS: 58,64 kB (gzip 10,66 kB).

Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md) para o aviso de tamanho.
