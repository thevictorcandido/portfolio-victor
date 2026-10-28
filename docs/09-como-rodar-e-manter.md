# 09 - Como Rodar e Manter

Voltar: [Portfolio Victor](README.md)

## Comandos

```bash
npm install        # dependências
npm run dev        # servidor local (Vite)
npm run lint       # oxlint
npm run build      # gera dist/
npm run preview    # serve o dist/ localmente
```

`dist/` está no `.gitignore`.

## Formulário de contato (EmailJS)

1. Criar conta em https://dashboard.emailjs.com.
2. **Email Services** → adicionar o Gmail `victorcandidoleite@gmail.com` → anotar o *Service ID*.
3. **Email Templates** → criar template e anotar o *Template ID*:
   - Subject: `Nova mensagem do portfólio — {{name}}`
   - Content: `Nome: {{name}}` / `E-mail: {{email}}` / `Mensagem: {{message}}`
   - To Email: `victorcandidoleite@gmail.com` · From Name: `Portfólio Victor` · From Email: *Use Default Email Address*
   - **Reply To: `{{email}}`** — assim "Responder" no Gmail vai para quem escreveu.
   - Testar com **Test It** antes de usar no site.
4. **Account → General** → copiar a *Public Key*.
5. `cp .env.example .env.local` e preencher `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Reiniciar o `npm run dev`.
6. No deploy, cadastrar as mesmas três variáveis no painel da hospedagem — na Vercel: **Settings → Environment Variables** (Production + Preview) e depois **Deployments → ⋯ → Redeploy**.

## reCAPTCHA no formulário

> [!IMPORTANT]
> **o que não pode ser esquecido**
>
> O EmailJS **só aceita reCAPTCHA v2** (caixa "Não sou um robô"). O Google oferece primeiro o **Enterprise** (`enterprise.js?render=<chave>`, invisível por pontuação) — essa chave **não funciona** com o EmailJS. Criar em https://www.google.com/recaptcha/admin/create → *reCAPTCHA v2* → *Caixa de seleção*.

- Chave v2 criada em 2026-10-21. Domínios: `victorcandido.dev`, `www.victorcandido.dev`, `localhost`.
- **Site Key** (pública) → `VITE_RECAPTCHA_SITE_KEY` no `.env.local` e na Vercel (Config).
- **Secret Key** → **só** no EmailJS: template → *Settings* → *Enable reCAPTCHA V2 verification*. Nunca em código, chat ou variável `VITE_*`.
- Sem `VITE_RECAPTCHA_SITE_KEY`, o formulário envia sem CAPTCHA (útil na transição).

**Ordem de ativação (senão o formulário quebra):**
1. Site Key na Vercel → push → site novo no ar com a caixa.
2. Só então ativar o reCAPTCHA no template do EmailJS e colar a Secret Key. Antes disso, o EmailJS recusaria todo envio feito pelo site antigo, sem caixa.

**Como funciona no código:** `src/components/ui/recaptcha.jsx` carrega `api.js?render=explicit&hl=<idioma>` uma única vez e renderiza o widget; ele cria o campo oculto `g-recaptcha-response` dentro do `<form>`, que o `FormData` já manda ao EmailJS. Sem token → aviso `contact.captchaRequired` e nenhuma chamada ao EmailJS. Depois de cada tentativa o widget é resetado (token vale um envio). Abaixo de 304 px de largura usa o tamanho `compact`.

> [!WARNING]
> **armadilha**
>
> O idioma do widget é fixado na primeira carga do script (`hl`). Trocar PT/EN depois não traduz a caixa — só recarregando a página.

> [!TIP]
> **atalho que vale lembrar**
>
> Verificado em 2026-10-21 com uma página de diagnóstico no `dist/` (iframe da mesma origem + `fetch` interceptado): widget com a Site Key, 304×78 em desktop e 164×144 num iframe de 340 px, aviso nos dois idiomas, 0 chamadas ao EmailJS sem a caixa marcada. O Edge headless no Windows **não abre janela com menos de ~496 px** de largura útil (`--window-size=390,…` dá `innerWidth` 496) — para testar celular, usar iframe com largura fixa.

## Deploy (Vercel)

- Domínio: https://www.victorcandido.dev (o apex `victorcandido.dev` faz 308 para o `www` — usar `curl -L`)
- Variáveis `VITE_EMAILJS_*` cadastradas como **Config** (Production + Preview) em 2026-10-21.
- Publica sozinho a cada push na `main` (preset Vite: `npm run build`, saída `dist/`).
- `vercel.json` reescreve todo caminho para `/index.html`, para as rotas de estudo de caso (`/projetos/<slug>`) abrirem direto.
- Variável de ambiente nova ou alterada só vale a partir do **próximo build** — sempre fazer Redeploy depois de mexer nelas.

> [!WARNING]
> **armadilha**
>
> Variáveis `VITE_*` são embutidas no bundle **na hora do build**. Mudou o `.env.local`, precisa reiniciar o dev server / refazer o build. A Public Key é pública por design. Restringir domínios (*domain whitelisting*) **só existe nos planos pagos**; no Free a única barreira é a cota de 200 envios/mês.

> [!CAUTION]
> **erro 402 ao criar o service (2026-10-20)**
>
> Ao clicar em *Create Service* com o Gmail, o painel do EmailJS devolveu HTTP 402 (Payment Required). Causa não documentada pelo EmailJS; o Victor conseguiu configurar em seguida. Se voltar a acontecer: conferir serviços já existentes, verificação do e-mail da conta e a permissão de envio na tela de OAuth do Google.

> [!CAUTION]
> **`412 Gmail_API: Request had insufficient authentication scopes` no Test It (2026-10-20)**
>
> **Causa raiz:** ao conectar o Gmail, a caixa *"Enviar e-mail em seu nome"* da tela de consentimento do Google ficou desmarcada. O service é criado, mas o token não tem o escopo de envio.
> **Correção:** remover o EmailJS em https://myaccount.google.com/permissions → no EmailJS, *Disconnect* + *Connect Account* no service → **marcar a caixa de envio** → *Update Service*. O Service ID não muda.

> [!IMPORTANT]
> **o que não pode ser esquecido**
>
> As 3 variáveis `VITE_*` **aparecem no JS público** — é inevitável num formulário que roda no navegador, e por isso o EmailJS chama a chave de *Public Key*. O `.env.local` serve só para não versionar valores nem misturar ambientes; está ignorado (`*.local`, linha 14 do `.gitignore`) e nunca entrou em commit (conferido em 2026-10-21). Quem pegar os valores só consegue mandar e-mail **para o Victor** (o "To" é fixo no template) e gastar a cota de 200/mês. A **Private Key** do EmailJS nunca pode ir para variável `VITE_*`.

> [!TIP]
> **atalho que vale lembrar**
>
> Sem as três variáveis, `isEmailjsConfigured` é `false`: o formulário mostra o estado de erro e loga `EmailJS não configurado` no console, em vez de fingir sucesso.

> [!NOTE]
> **contexto**
>
> Usamos a linha 4.x do SDK. A 5.x saiu entre 2026-10-05 e 2026-10-10, recente demais para adotar de cara.

## Onde editar o quê

| Quero mudar… | Arquivo |
|---|---|
| Qualquer texto visível | `src/i18n/locales/pt-BR/translation.json` **e** `src/i18n/locales/en/translation.json` |
| Links sociais, e-mail | `src/data/portfolioData.js` → `personal.social` |
| Imagem de projeto | `public/` + campo `image` de `projects` em `portfolioData.js` |
| Novo projeto | Entrada em `portfolioData.projects` (`id: "proj-<chave>"`, `image`, `liveUrl`/`githubUrl`, opcionais `address` e `caseStudy`) + `projects.<chave>Title`, `Badge`, `Tagline`, `Desc`, `Tags` nos dois JSON. O card lê tudo pelo `id`, sem mexer em `Projects.jsx` |
| Novo estudo de caso | Página em `src/pages/` + entrada no mapa `caseStudies` de `App.jsx` (slug → `lazy()`) + textos em `caseStudies.<chave>` nos dois JSON + `caseStudy: "/projetos/<slug>"` no projeto |
| Cargos da Trajetória | `portfolioData.experiences` (`id`, empresa; do atual para o mais antigo) + `experience.roles.<id>` (título, período, resumo, descrição da ilustração) nos dois JSON + a ilustração do cargo no mapa `illustrations` de `Experience.jsx` |
| Tags de projeto, textos do globo de habilidades | Os dois `translation.json` (`projects.*Tags`, `skills.items`) |
| Adicionar uma tecnologia no globo | `portfolioData.skills` (`key`, `category`, `projectUrl`) + `skills.items.<key>` (`name`, `about`, `example`, `project`) nos dois JSON + ícone em `TechIcons.jsx` e no mapa de `Skills.jsx`. Registrar antes a nota em Tecnologias no vault |
| Itens do menu / âncoras | `portfolioData.navItems` + `nav.*` nos JSON + `id` da `<section>` |
| Cores, fontes, animações | `src/index.css` (`@theme`) |
| Adicionar idioma | `config/i18nConfig.js` + nova pasta em `i18n/locales/` + import em `i18n/index.js` |

> [!IMPORTANT]
> **o que não pode ser esquecido**
>
> Texto visível **sempre** nos dois `translation.json`; `portfolioData.js` só tem links, imagens e ids. Ver [02 - Stack e Arquitetura](02-stack-e-arquitetura.md).

> [!WARNING]
> **armadilha (Git Bash no Windows)**
>
> Argumentos que começam com `/` passados a programas nativos (`node`, `curl.exe`) viram caminhos do Windows (`/foto.png` → `C:/Program Files/Git/foto.png`). Para testar URLs de assets, montar a URL inteira na variável (`"http://localhost:4173${p// /%20}"`) em vez de passar o caminho solto. E `while read` ignora a última linha se o arquivo não terminar em `\n`.

> [!TIP]
> **atalho que vale lembrar**
>
> Ao adicionar chave nova, criar nos **dois** JSON. Para conferir paridade:
> ```bash
> node -e "const a=require('./src/i18n/locales/pt-BR/translation.json'),b=require('./src/i18n/locales/en/translation.json');const k=(o,p='')=>Object.entries(o).flatMap(([x,v])=>typeof v==='object'&&!Array.isArray(v)?k(v,p+x+'.'):[p+x]);const A=k(a),B=k(b);console.log(A.filter(x=>!B.includes(x)),B.filter(x=>!A.includes(x)))"
> ```

## Convenção de commits

- Mensagens em português, prefixo convencional: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`.
- Um commit por unidade de trabalho coerente; `npm run lint` e `npm run build` antes.
- `git add <caminhos>` explícitos — nunca `git add -A` (pega mudanças alheias, como aconteceu com o `.gitignore` em `5e29a93`).
- Sem push automático.

## Documentação

- Vault Obsidian: `Portfolio Victor.md` + pasta `Portfolio Victor/` (fonte principal).
- Espelho no repo: `docs/` (mesmo conteúdo, links em Markdown padrão para renderizar no GitHub).
- Ao mudar estado relevante (decisão, bug, número medido), atualizar os dois.
