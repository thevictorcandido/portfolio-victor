# 08 - Bugs e Pendências

Voltar: [Portfolio Victor](README.md)

Levantamento de 2026-10-20, sobre o commit `ae0f854`. Ordenado por impacto.

## Bugs

> [!TIP]
> **texto do Sobre passando da borda no desktop — corrigido em 2026-10-29**
>
> **Sintoma:** escondido pelo `overflow-hidden` da seção: a 1024 px a coluna de texto passava 156 px da borda (o fim das linhas sumia); com a foto maior, passou a acontecer também a 1280 px.
> **Causa raiz:** a coluna de texto era `flex-1` sem `min-w-0` e não encolhia abaixo de ~634 px, a largura de "Vamos conversar" (264 px) + barra de ícones (346 px) + espaço numa linha só, que não quebrava.
> **Correção:** `min-w-0` na coluna, `sm:flex-wrap` e `sm:gap-x-4` na linha de baixo, foto em 380 px (`lg`) / 400 px (`xl`). Medido de 375 a 1920 px: nada passa da borda; de 1280 px para cima a linha de baixo cabe numa linha, a 1024 a barra de ícones desce.

> [!TIP]
> **girar o globo de Habilidades rolava a página no celular — corrigido em 2026-10-29**
>
> **Sintoma:** no celular, arrastar o globo para girar subia ou descia a página junto.
> **Causa raiz:** o palco do globo tinha `touch-action: pan-y`, que entrega ao navegador todo arrasto com componente vertical: a página rolava e o giro perdia o gesto.
> **Correção:** `touch-none` no palco (`SkillsGlobe.jsx`). Fora do globo a página rola normalmente; o palco tem no máximo 82vw de altura, então sempre sobra área para rolar.
> **Teste com toque real (CDP, 375 px):** arrasto vertical, horizontal e diagonal no globo: página parada e globo girando; deslizar no título da seção rola a página; tocar num ícone abre o painel. Controle: forçando `pan-y` de volta, o mesmo arrasto vertical rolou a página 145 px.

> [!TIP]
> **texto e imagem estourando o card de Projetos no celular — corrigido em 2026-10-29**
>
> **Sintoma:** no celular, o texto e a imagem de cada card de Projetos batiam na borda direita e eram cortados, sem respiro.
> **Causa raiz:** a grade interna do card não tinha colunas definidas, então a coluna única cresceu até o min-content do conteúdo. Quem mandava era a barra de janela em cima da imagem: o endereço tinha `truncate max-w-[240px]`, e a barra inteira pedia 334 px num card com 218 px úteis (320 px de tela) ou 273 px (375 px). O `overflow-hidden` do card cortava o excesso. No tablet (768) cabia por 2 px.
> **Correção:** `grid-cols-1` (`minmax(0, 1fr)`) na grade do card, `min-w-0` nas duas colunas e o endereço com `flex-1 min-w-0 truncate`, que encolhe e ganha reticências. A moldura da imagem passou de 16:10 para 16:9, a proporção de 3 dos 4 prints (16:10 cortava as laterais dos painéis). Medido nos 4 cards em 320, 375, 640, 768, 1024 e 1440 px: nenhum elemento passa da área útil do card.

> [!TIP]
> **rolagem travando depois de visitar o Contato (Zen/Firefox) — corrigido em 2026-10-28**
>
> **Sintoma:** no Zen Browser (Firefox), com touchpad: descer a página, voltar ao topo e descer de novo engasgava; recarregando, a primeira descida era lisa.
> **Causa raiz:** o script do reCAPTCHA carregava quando o formulário chegava a 800 px da tela e, uma vez na página, roda tarefas de 60 a 104 ms na thread principal durante a rolagem (173 a 293 ms bloqueados em ~1 s de rolagem; sem ele, 0 a 32 ms). Quem passava pelo Contato levava o peso para o resto da visita. Ele não registra listener de `wheel`/`scroll`/`touch`, e esconder o iframe não muda nada: o custo é o script, não o widget.
> **Como foi achado:** Zen automatizado por WebDriver BiDi (`--remote-debugging-port`, perfil novo com `layout.css.devPixelsPerPx` 1,5), roda do mouse de 100 px a cada 40 ms. O roteiro "descer até o fim, voltar ao topo, descer" reproduz em 5 de 5 rodadas, com ou sem insistir acima do topo; a insistência não importa. Esconder Habilidades ou Trajetória não muda; esconder o Contato, ou trocar `window.grecaptcha` por um stub antes do script, zera os quadros ruins. No Chrome o mesmo roteiro era liso: só aparece no motor do Firefox.
> **Correção:** `ui/recaptcha.jsx` carrega o script no primeiro `focusin` ou `pointerdown` dentro do `<form>` (o clique em "Enviar" sem marcar a caixa também conta). Medido depois, no Zen: 10 de 10 rodadas lisas (p95 16,7 ms, 0 quadros > 25 ms; antes, 7 a 11 por rodada). Conferido: passar pelo Contato não carrega nada; focar um campo carrega script e widget.

> [!WARNING]
> **armadilha: testar só no Chrome**
>
> O motor do Firefox (Zen, Firefox) tem custos diferentes. Um defeito de rolagem pode existir só nele. `zen.exe` fica em `C:\Program Files\Zen Browser\`; dá para automatizar por WebDriver BiDi em `ws://127.0.0.1:<porta>/session`, com `browsingContext.activate` antes de medir, senão o `requestAnimationFrame` fica estrangulado.

> [!TIP]
> **rolagem travando até Projetos por animações do Hero — corrigido em 2026-10-28**
>
> **Sintoma:** depois das correções de 2026-10-23 e 2026-10-26, a rolagem do topo até Projetos ainda engasgava, com ou sem a animação de entrada já terminada.
> **Causa raiz:** qualquer animação rodando no Hero durante a rolagem faz a GPU perder quadros inteiros (intervalos de 50, 67 e 83 ms, múltiplos exatos de 16,7). Fora da intro, a culpada é a seta "rolar para baixo" (`animate-bounce`, infinita). Durante a intro, também as transições do `BlurText` (letras do nome e frase). A thread principal fica ociosa (0 tarefas longas, ~18 ms de script em 2 s): o custo é de composição e rasterização na GPU.
> **Como foi achado:** Chrome real com GPU (1920 × 1080, escala 1,5) via CDP, roda do mouse de 100 px a cada 40 ms do topo até `#projects`, 5 a 8 rodadas por variante, desligando um suspeito por CSS injetado. Rolando 4 s após carregar: com tudo ligado, 5 de 5 rodadas com 8 a 10 quadros > 25 ms; só sem o bounce, 5 de 5 lisas. Rolando 300 ms após carregar, mesmo sem o bounce, só o Hero sem transições ficou liso.
> **Inocentes:** o pato (sem ele, a travada fica igual), a sombra dele, `will-change`, `backdrop-blur`, as seções abaixo de Projetos e os `animate-pulse` dos Projetos. O halo com `blur-3xl` reduz em parte, mas o resultado varia demais para concluir. Isolar o Hero (`isolation`, `contain: paint`) não resolve.
> **Correção:** ao primeiro scroll, `Hero.jsx` marca a seção com `data-settled`; o CSS (`index.css`) para o bounce e tira a transição das letras, que vão direto ao estado final. Medido depois, rolando 300 ms após carregar: p95 entre quadros ~17 ms em todas as rodadas (antes, 50 a 83 ms na maioria) e 0 a 5 quadros > 25 ms (antes, 9 a 22).

> [!WARNING]
> **armadilha ao medir rolagem**
>
> A primeira rodada medida após o aquecimento sai ruim em quase toda variante, inclusive com tudo desligado: descartar. O painel do navegador embutido, quando oculto, não desenha quadros nem dispara `scroll`/IntersectionObserver; conferir comportamento num Chrome visível.

> [!TIP]
> **rolagem travando na animação inicial — corrigido em 2026-10-26**
>
> **Sintoma:** mesmo depois da correção de 2026-10-23, a rolagem do topo até Projetos ainda engasgava, principalmente durante a animação de entrada.
> **Causa raiz:** o script do reCAPTCHA (`recaptcha__*.js`, do formulário de Contato) carregava junto com a página e executava tarefas longas de JS (~50 ms cada) bem durante a intro e a primeira rolagem.
> **Como foi achado:** trace do Chrome com GPU real (1920 × 1080, escala 1,5), rolando do topo até Projetos logo após carregar, desligando um suspeito por vez. Bloquear o reCAPTCHA levou o p95 do intervalo entre quadros de 33 ms para 17 ms; grade de fundo, halo, sombra do pato, `backdrop-blur` e o desfoque das letras do nome não mudaram nada mensurável. Com o cache de shaders frio (primeira visita) há travadas de GPU de até ~190 ms que aparecem com qualquer combinação de efeitos: custo único de compilação, não corrigível pelo site.
> **Correção:** `ui/recaptcha.jsx` só carrega o script quando o widget fica a 800 px da tela (IntersectionObserver; trocado em 2026-10-28 por carga no primeiro uso do formulário). Medido depois: nenhuma função do reCAPTCHA no trecho, script e iframe ausentes no topo e presentes ao chegar em Contato.

> [!TIP]
> **rolagem travando desde o topo — corrigido em 2026-10-23**
>
> **Sintoma:** a página engasgava ao rolar, já saindo do Hero.
> **Causa raiz:** as animações CSS infinitas das ilustrações SVG da Trajetória (`.illo-*`) rodavam o tempo todo, mesmo com a seção fora da tela. Animação em elemento SVG não vai para o compositor: cada quadro recalcula estilo e repinta, disputando o quadro com a rolagem.
> **Como foi achado:** trace do Chrome rolando do topo até Projetos, desligando um suspeito por vez. Só desligar as animações do SVG mudou o resultado: quadros perdidos 32 → 16, recálculo de estilo ~190 ms → ~70 ms. Grade de fundo, halo do Hero, sombra do pato e `backdrop-blur` não mudaram nada mensurável.
> **Correção:** `features-with-panel.jsx` observa a mídia com IntersectionObserver e marca `data-paused`; o CSS aplica `animation-play-state: paused`. Medido depois: ~17 quadros perdidos no mesmo trecho.
> **Junto:** imagens dos projetos em WebP (o PNG do GVS tinha 1,4 MB) e CSS/arquivo sem uso removidos.

> [!TIP]
> **variáveis do EmailJS em produção — corrigido em 2026-10-21**
>
> As 3 variáveis foram cadastradas na Vercel (tipo **Config**, não Secret — são públicas por natureza); o push de `d5b7d5c` gerou o build `index-BdQc1odO.js`, com a configuração preenchida. Envio real pelo site publicado confirmado em 2026-10-21.

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
5a. [x] Tags Open Graph + `og-image.png` (captura do Hero) (2026-10-21)
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
