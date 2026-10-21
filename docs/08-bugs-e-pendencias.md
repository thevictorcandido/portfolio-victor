# 08 - Bugs e Pendências

Voltar: [Portfolio Victor](README.md)

Levantamento de 2026-10-20, sobre o commit `ae0f854`. Ordenado por impacto.

## Bugs

> [!TIP]
> **~~formulário de contato finge que envia~~ — corrigido em 2026-10-20**
>
> **Causa raiz:** `handleSubmit` só fazia `preventDefault()` e mostrava sucesso por 5 s; nenhuma mensagem saía do navegador.
> **Correção:** envio real via EmailJS (`@emailjs/browser` 4.4.1), com estados `idle → sending → success | error`. No erro, mostra o e-mail do Victor como alternativa. Textos de sucesso/erro/copiar passaram para o i18n.
> **Validado em 2026-10-20:** service Gmail + template criados, `.env.local` preenchido, mensagem enviada pelo site chegou no Gmail. Configuração em [09 - Como Rodar e Manter](09-como-rodar-e-manter.md).

> [!TIP]
> **~~favicon 404~~ — corrigido em 2026-10-20**
>
> **Causa raiz:** `index.html` apontava para `/vite.svg`, que não existe em `public/`; o `public/favicon.svg` era o raio roxo do template Vite e não era referenciado.
> **Correção:** `public/favicon.svg` virou monograma "V" (bege `#FAF8F5` sobre musgo `#2B4636`, cantos 14/64, traço 7/64) e o `index.html` aponta para ele. Conferido renderizado a 16/32/64 px em aba clara e escura. Adicionado `<meta name="theme-color" content="#FAF8F5">`.

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
> JS de 512,83 kB (gzip 159,87 kB) em `ae0f854`; 518,53 kB (gzip 162,16 kB) após o EmailJS (+5,7 kB). Candidatos: `country-flag-icons` (importa só BR e US, conferir tree-shaking), `motion`, `lucide-react`. Alternativa: `React.lazy` nas seções abaixo da dobra.

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

1. [x] Formulário de contato funcional (2026-10-20, validado com envio real)
2. [x] Favicon próprio (2026-10-20)
3. [ ] Confirmar linguagem do Xulambis e corrigir
4. [ ] Traduzir tags/chips/alt (mover para JSON)
5. [ ] Meta description por idioma
6. [ ] Corrigir `companyUrl` e `githubUrl`
7. [ ] Limpar `portfolioData.js` e assets mortos
8. [ ] `prefers-reduced-motion`
9. [ ] Reduzir bundle
10. [ ] Atualizar README
11. [ ] Deploy
