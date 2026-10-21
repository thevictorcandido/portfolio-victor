# 08 - Bugs e Pendências

Voltar: [Portfolio Victor](README.md)

Levantamento de 2026-10-20, sobre o commit `ae0f854`. Ordenado por impacto.

## Bugs

> [!TIP]
> **variáveis do EmailJS em produção — corrigido em 2026-10-21**
>
> As 3 variáveis foram cadastradas na Vercel (tipo **Config**, não Secret — são públicas por natureza); o push de `ebc6e6e` gerou o build `index-BdQc1odO.js`, com a configuração preenchida. Envio real pelo site publicado confirmado em 2026-10-21.

> [!WARNING]
> **armadilha**
>
> O apex `victorcandido.dev` responde **308** para `www.victorcandido.dev`. `curl` sem `-L` não segue e não vê o HTML — um laço de espera de deploy ficou 10 min em timeout por isso.

> [!NOTE]
> **histórico do defeito (aberto em 2026-10-21)**
>
> **Sintoma:** no site publicado, o envio cai no aviso de erro.
> **Causa raiz:** as variáveis `VITE_EMAILJS_*` são embutidas no bundle no momento do build; elas existem só no `.env.local` (não versionado), e o projeto na Vercel não as tinha. O JS publicado (`index-C4uUlS0p.js`) traz `{SERVICE_ID:void 0,TEMPLATE_ID:void 0,PUBLIC_KEY:void 0}`.
> **Correção:** cadastrar as 3 variáveis em Vercel → Settings → Environment Variables (Production + Preview) e fazer **Redeploy** — variável nova não afeta build antigo.
> **Como conferir sem expor valores:** baixar o JS publicado e procurar o objeto `{SERVICE_ID:...}`; `void 0` = vazio.

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

> [!TIP]
> **~~README desatualizado~~ — reescrito em 2026-10-20**
>
> Antes descrevia paleta escura e uma estrutura sem `i18n/`, `config/`, `ui/`. Agora traz seções, stack, Node mínimo (20.19+ / 22.12+, do `engines` do Vite 8), setup do EmailJS, onde editar cada coisa, estrutura atual, design real e as referências. Links internos conferidos.

- ~~~4,9 MB de assets não usados~~ — removidos em 2026-10-20, ver [06 - Assets e Mídia](06-assets-e-midia.md).
- ~~Campos mortos em `portfolioData`~~ — removidos em 2026-10-20.
- Botão/link de currículo não existe (o `resumeUrl: "#"` morto foi removido; se quiser um botão de CV, é feature nova).
- ~~`main` sem upstream~~ — push feito em 2026-10-21 (`git push -u origin main`).
- ~~Deploy~~ — já existia: Vercel em https://victorcandido.dev, com deploy automático por push.

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
10. [x] Atualizar README (2026-10-20)
11. [x] Deploy — Vercel, https://victorcandido.dev (já existia)
11a. [x] Variáveis do EmailJS na Vercel + novo build (2026-10-21)
11b. [x] Teste de envio real pelo formulário em produção (2026-10-21, já com reCAPTCHA)
12. [x] reCAPTCHA v2 no formulário — código pronto e testado localmente (2026-10-21)
12a. [x] `VITE_RECAPTCHA_SITE_KEY` na Vercel + push (2026-10-21; build `index-LTq7jCEZ.js`, mesmo hash do build local)
12b. [x] reCAPTCHA V2 ativado no template do EmailJS com a Secret Key; envio com a caixa marcada chegou (2026-10-21)
