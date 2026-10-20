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
3. **Email Templates** → criar template usando `{{name}}`, `{{email}}` e `{{message}}`; em *Reply To* colocar `{{email}}` → anotar o *Template ID*.
4. **Account → General** → copiar a *Public Key*.
5. `cp .env.example .env.local` e preencher `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Reiniciar o `npm run dev`.
6. No deploy, cadastrar as mesmas três variáveis no painel da hospedagem.

> [!WARNING]
> **armadilha**
>
> Variáveis `VITE_*` são embutidas no bundle **na hora do build**. Mudou o `.env.local`, precisa reiniciar o dev server / refazer o build. A Public Key é pública por design; a proteção é restringir as origens permitidas em **Account → Security** no EmailJS.

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
| Tags, chips de tecnologia, skills | `src/data/portfolioData.js` (ainda sem tradução) |
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

## Convenção de commits

- Mensagens em português, prefixo convencional: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `style:`.
- Um commit por unidade de trabalho coerente; `npm run lint` e `npm run build` antes.
- Sem push automático.

## Documentação

- Vault Obsidian: `Portfolio Victor.md` + pasta `Portfolio Victor/` (fonte principal).
- Espelho no repo: `docs/` (mesmo conteúdo, links em Markdown padrão para renderizar no GitHub).
- Ao mudar estado relevante (decisão, bug, número medido), atualizar os dois.
