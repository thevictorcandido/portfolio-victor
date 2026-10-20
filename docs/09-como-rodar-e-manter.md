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
