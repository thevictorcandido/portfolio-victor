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
6. No deploy, cadastrar as mesmas três variáveis no painel da hospedagem.

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
| Foto de cargo / imagem de projeto | `public/` + campo `image` em `portfolioData.js` |
| Tags de projeto, chips de cargo, função das skills | Os dois `translation.json` (`projects.*Tags`, `experience.roles.*.technologies`, `skills.techRoles`) |
| Adicionar uma tecnologia nas skills | `portfolioData.skillsCategories` (nome, `key`, cor) + `skills.techRoles.<key>` nos dois JSON + ícone em `TechIcons.jsx` |
| Itens do menu / âncoras | `portfolioData.navItems` + `nav.*` nos JSON + `id` da `<section>` |
| Cores, fontes, animações | `src/index.css` (`@theme`) |
| Adicionar idioma | `config/i18nConfig.js` + nova pasta em `i18n/locales/` + import em `i18n/index.js` |

> [!WARNING]
> **armadilha**
>
> Editar bio, bullets ou descrições em `portfolioData.js` **não muda o site** — esses textos vêm dos JSON. Ver [02 - Stack e Arquitetura](02-stack-e-arquitetura.md).

> [!TIP]
> **atalho que vale lembrar**
>
> Ao adicionar chave nova, criar nos **dois** JSON. Para conferir paridade:
> ```bash
> node -e "const a=require('./src/i18n/locales/pt-BR/translation.json'),b=require('./src/i18n/locales/en/translation.json');const k=(o,p='')=>Object.entries(o).flatMap(([x,v])=>typeof v==='object'&&!Array.isArray(v)?k(v,p+x+'.'):[p+x]);const A=k(a),B=k(b);console.log(A.filter(x=>!B.includes(x)),B.filter(x=>!A.includes(x)))"
> ```

## Regerar o mockup do Xulambis

A imagem `public/projects/xulambis-terminal.png` sai de `docs/mockups/xulambis-terminal.html` (1200×850, Fira Code do Google Fonts, logo ASCII do `figlet` fonte Standard). Editar o HTML e capturar com o Edge headless:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,850 --virtual-time-budget=5000 \
  --screenshot="C:\caminho\xulambis-terminal.png" "file:///C:/caminho/docs/mockups/xulambis-terminal.html"
```

> [!TIP]
> **atalho que vale lembrar**
>
> `--virtual-time-budget=5000` dá tempo da Fira Code carregar; sem ele a captura sai em Consolas.

> [!WARNING]
> **armadilha**
>
> No Windows, encerrar a tarefa em segundo plano de `npx vite preview` mata o `npx` mas deixa o `node ... vite.js preview` vivo, segurando a porta 4173 (o próximo `--strictPort` falha). Conferir com `netstat -ano | grep :4173` e encerrar o PID com `Stop-Process -Id <pid>`.
> **Como evitar:** subir com `node node_modules/vite/bin/vite.js preview --port 4173 --strictPort` (sem `npx`); aí encerrar a tarefa mata o servidor de fato (testado em 2026-10-20).

## Convenção de commits

- Mensagens em português, prefixo convencional: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`.
- Um commit por unidade de trabalho coerente; `npm run lint` e `npm run build` antes.
- Sem push automático.

## Documentação

- Vault Obsidian: `Portfolio Victor.md` + pasta `Portfolio Victor/` (fonte principal).
- Espelho no repo: `docs/` (mesmo conteúdo, links em Markdown padrão para renderizar no GitHub).
- Ao mudar estado relevante (decisão, bug, número medido), atualizar os dois.
