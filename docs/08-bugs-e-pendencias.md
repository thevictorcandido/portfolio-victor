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

> [!TIP]
> **~~textos em português na versão em inglês~~ — corrigido em 2026-10-20**
>
> Tags, chips, funções das skills, alts, títulos dos projetos, card de estudo contínuo, "Navegação", `aria-label` do dock e rodapé foram para o i18n. Verificado no DOM renderizado em inglês. Ver [05 - Internacionalização (i18n)](05-internacionalizacao-i18n.md).

> [!TIP]
> **~~linguagem do Xulambis contraditória~~ — tag corrigida em 2026-10-20**
>
> Confirmado: o Xulambis foi feito em **Java**. A tag em `portfolioData.js` era "Python / POO" e virou "Java / POO", batendo com a descrição traduzida.

> [!TIP]
> **~~print do Xulambis mostra Python~~ — refeito em 2026-10-20**
>
> `public/projects/xulambis-terminal.png` era um mockup com `python3 main.py --env production`, contradizendo o card. **Causa raiz:** a imagem foi gerada quando o projeto ainda era descrito como Python. Não existe print real; o mockup foi recriado (mesma composição, 1200×850) com `java -cp bin Main` e o comentário "Sistema Orientado a Objetos em Java". Fonte em `docs/mockups/xulambis-terminal.html` — ver [09 - Como Rodar e Manter](09-como-rodar-e-manter.md).

> [!TIP]
> **~~meta description fixa em pt-BR~~ — corrigido em 2026-10-20**
>
> `syncDocument` em `src/i18n/index.js` agora atualiza a description. Ver [05 - Internacionalização (i18n)](05-internacionalizacao-i18n.md).

> [!TIP]
> **~~links apontando para o lugar errado~~ — corrigido em 2026-10-20**
>
> `companyUrl` dos 3 cargos apontava para o LinkedIn do Victor; agora `https://grupogvs.com.br`. `githubUrl` do Xulambis apontava para o perfil; o repositório não é público, então virou `null` e o botão sumiu. Conferido no DOM renderizado.
> **Consequência:** o card do Xulambis ficou sem nenhum botão de ação (também não tem `liveUrl`).

## Dívida técnica

> [!TIP]
> **~~duas fontes de verdade para o texto~~ — resolvido em 2026-10-20**
>
> `portfolioData.js` reescrito só com links, imagens e ids; fallbacks `roleData.x || exp.x` e `|| personal.bio` removidos; mapa `roleKeys` eliminado (o id do cargo já é a chave). Texto renderizado em pt-BR idêntico antes/depois (378 itens comparados no DOM).

> [!WARNING]
> **bundle acima de 500 kB**
>
> JS de 512,83 kB (gzip 159,87 kB) em `ae0f854`; 518,53 kB (gzip 162,16 kB) após o EmailJS (+5,7 kB); 520,82 kB após o i18n completo; **514,35 kB (gzip 161,74 kB)** após a limpeza do `portfolioData`. Candidatos: `country-flag-icons` (importa só BR e US, conferir tree-shaking), `motion`, `lucide-react`. Alternativa: `React.lazy` nas seções abaixo da dobra.

> [!TIP]
> **~~sem `prefers-reduced-motion`~~ — resolvido em 2026-10-20**
>
> CSS global + BorderBeam oculto + dock sem ampliação + "voltar ao topo" sem rolagem suave. Verificado no Edge com e sem `--force-prefers-reduced-motion`: marquee `25s ×infinite` → `0.01ms ×1`; transição dos cards `0.7s` → `0.01ms`; BlurText `0.55s` → `0.01ms`; beam `block` → `none`; scroll `smooth` → `auto`. A ampliação do dock não foi testada (depende de mouse). Detalhes em [03 - Design System](03-design-system.md).

> [!WARNING]
> **README desatualizado**
>
> Paleta escura, estrutura sem `i18n/`, `config/`, `ui/`, `LanguageSwitcher`.

- ~~~4,9 MB de assets não usados~~ — removidos em 2026-10-20, ver [06 - Assets e Mídia](06-assets-e-midia.md).
- ~~Campos mortos em `portfolioData`~~ — removidos em 2026-10-20.
- Botão/link de currículo não existe (o `resumeUrl: "#"` morto foi removido; se quiser um botão de CV, é feature nova).
- `main` sem upstream; deploy (Vercel/Netlify/GitHub Pages) não feito.

## Backlog sugerido (ordem)

1. [x] Formulário de contato funcional (2026-10-20, validado com envio real)
2. [x] Favicon próprio (2026-10-20)
3. [x] Confirmar linguagem do Xulambis e corrigir a tag (2026-10-20: Java)
3a. [x] Refazer o print do terminal do Xulambis com comando Java (2026-10-20)
4. [x] Traduzir tags/chips/alt (mover para JSON) (2026-10-20)
5. [x] Meta description por idioma (2026-10-20)
5a. [ ] Tags Open Graph (`og:title`, `og:description`, `og:image`) para preview de link
6. [x] Corrigir `companyUrl` e `githubUrl` (2026-10-20)
7. [x] Limpar `portfolioData.js` e assets mortos (2026-10-20)
8. [x] `prefers-reduced-motion` (2026-10-20)
9. [ ] Reduzir bundle
10. [ ] Atualizar README
11. [ ] Deploy
