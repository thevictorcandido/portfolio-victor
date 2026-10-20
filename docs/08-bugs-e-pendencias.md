# 08 - Bugs e Pendências

Voltar: [Portfolio Victor](README.md)

Levantamento de 2026-10-20, sobre o commit `ae0f854`. Ordenado por impacto.

## Bugs

> [!CAUTION]
> **formulário de contato finge que envia**
>
> `Contact.jsx` → `handleSubmit` só faz `preventDefault()` e mostra a mensagem de sucesso por 5 s. **Nenhuma mensagem chega ao Victor.** Quem preencher acha que mandou.
> **Correção:** integrar um serviço (Formspree, Web3Forms, EmailJS) ou trocar por `mailto:` com os campos preenchidos.

> [!CAUTION]
> **favicon 404**
>
> `index.html` usa `href="/vite.svg"`, arquivo que não existe em `public/`. Ver [06 - Assets e Mídia](06-assets-e-midia.md).

> [!CAUTION]
> **textos em português na versão em inglês**
>
> Tags, chips de tecnologia, `role` das skills e `alt` das imagens vêm de `portfolioData.js`, fora do i18next. Ver [05 - Internacionalização (i18n)](05-internacionalizacao-i18n.md).

> [!CAUTION]
> **linguagem do Xulambis contraditória**
>
> `portfolioData.js` → tag "Python / POO"; `translation.json` → "desenvolvido em **Java** (POO)". Os dois aparecem no mesmo card. **Confirmar com o Victor qual é a verdadeira.**

> [!CAUTION]
> **meta description fixa em pt-BR**
>
> `syncDocument` em `src/i18n/index.js` não atualiza `<meta name="description">`.

> [!CAUTION]
> **links apontando para o lugar errado**
>
> `companyUrl` dos cargos → LinkedIn do Victor (deveria ser o Grupo GVS). `githubUrl` do Xulambis → perfil, não o repositório.

## Dívida técnica

> [!WARNING]
> **duas fontes de verdade para o texto**
>
> `portfolioData.js` guarda bio, bullets e descrições antigas que não são renderizadas. Quem editar ali não vê mudança. Limpar e deixar só dados estruturais.

> [!WARNING]
> **bundle acima de 500 kB**
>
> JS de 512,83 kB (gzip 159,87 kB). Candidatos: `country-flag-icons` (importa só BR e US, conferir tree-shaking), `motion`, `lucide-react`. Alternativa: `React.lazy` nas seções abaixo da dobra.

> [!WARNING]
> **sem `prefers-reduced-motion`**
>
> Animações infinitas (`spin-slow`, `float`, `marquee`, `border-beam`) rodam sempre. Acessibilidade.

> [!WARNING]
> **README desatualizado**
>
> Paleta escura, estrutura sem `i18n/`, `config/`, `ui/`, `LanguageSwitcher`.

- ~4,9 MB de assets não usados — ver [06 - Assets e Mídia](06-assets-e-midia.md).
- Campos mortos em `portfolioData`: `avatarUrl`, `resumeUrl` (`"#"`), `stats`.
- Botão/link de currículo não existe (`resumeUrl: "#"`).
- `main` sem upstream; deploy (Vercel/Netlify/GitHub Pages) não feito.

## Backlog sugerido (ordem)

1. [ ] Formulário de contato funcional
2. [ ] Favicon próprio
3. [ ] Confirmar linguagem do Xulambis e corrigir
4. [ ] Traduzir tags/chips/alt (mover para JSON)
5. [ ] Meta description por idioma
6. [ ] Corrigir `companyUrl` e `githubUrl`
7. [ ] Limpar `portfolioData.js` e assets mortos
8. [ ] `prefers-reduced-motion`
9. [ ] Reduzir bundle
10. [ ] Atualizar README
11. [ ] Deploy
