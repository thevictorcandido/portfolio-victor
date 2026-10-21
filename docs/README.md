<!-- Espelho do vault Obsidian. Fonte: Obsidian Vault/Portfolio Victor.md -->

# Portfolio Victor

Portfólio pessoal de **Victor Cândido Leite**, feito para a disciplina **DIAW** (Desenvolvimento e Integração de Aplicações Web) da PUC Minas. SPA de página única em React 19 + Vite 8 + Tailwind v4, bilíngue (pt-BR / en).

## Estado em 2026-10-21

> [!TIP]
> **o que está pronto**
>
> - Site completo com 7 seções: Hero, Sobre, Projetos, Trajetória, Habilidades, Formação, Contato (+ Navbar e Footer).
> - Internacionalização pt-BR / en com seletor de idioma — 153 chaves, paridade 100%; versão em inglês sem nenhum texto em português (verificado no DOM renderizado).
> - Formulário de contato com envio real via EmailJS, validado ponta a ponta em 2026-10-20.
> - Favicon próprio (monograma "V" musgo/bege).
> - Código no GitHub: `main` acompanha `origin/main` desde 2026-10-21 (push `ae0f854..90ae5c6`, 14 commits). `.env.local` não versionado.
> - **Publicado na Vercel** em https://www.victorcandido.dev (o apex `victorcandido.dev` redireciona com 308). Deploy automático a cada push na `main` — confirmado em 2026-10-21: favicon, `theme-color` e description novos já estavam no ar.
> - `npm run build` passa (1,79 s). `oxlint` passa sem avisos (exit 0).
> - Documentação espelhada em `docs/` dentro do repositório.

> [!WARNING]
> **o que ainda falta**
>
> - No deploy, cadastrar as 3 variáveis `VITE_EMAILJS_*` na hospedagem — ver [09 - Como Rodar e Manter](09-como-rodar-e-manter.md).
> - Confirmar com um envio real que o formulário funciona em produção (variáveis já estão no build desde 2026-10-21).
> - Sem tags Open Graph: preview de link (WhatsApp, LinkedIn) sai sem imagem e sempre em pt-BR.

## Índice

| # | Nota | Conteúdo |
|---|------|----------|
| 01 | [01 - Contexto e Objetivo](01-contexto-e-objetivo.md) | Para que serve, quem é o Victor, referências visuais |
| 02 | [02 - Stack e Arquitetura](02-stack-e-arquitetura.md) | Dependências, estrutura de pastas, fluxo de dados |
| 03 | [03 - Design System](03-design-system.md) | Paleta, tipografia, animações, componentes 21st.dev |
| 04 | [04 - Conteúdo e Seções](04-conteudo-e-secoes.md) | O que cada seção mostra e de onde vem o texto |
| 05 | [05 - Internacionalização (i18n)](05-internacionalizacao-i18n.md) | Como o i18next está montado e o que falta traduzir |
| 06 | [06 - Assets e Mídia](06-assets-e-midia.md) | Imagens, fontes, o que é usado e o que é peso morto |
| 07 | [07 - Histórico e Decisões](07-historico-e-decisoes.md) | Linha do tempo dos commits e decisões com motivo |
| 08 | [08 - Bugs e Pendências](08-bugs-e-pendencias.md) | Defeitos com causa raiz e backlog priorizado |
| 09 | [09 - Como Rodar e Manter](09-como-rodar-e-manter.md) | Comandos, como editar conteúdo, convenções de commit |

## Links

- Repositório local: `C:\Users\Victor Leite\Documents\Faculdade\diaw\portfolio-victor`
- Site publicado: https://www.victorcandido.dev (Vercel; o apex redireciona)
- Remoto: https://github.com/thevictorcandido/portfolio-victor
- LinkedIn: https://www.linkedin.com/in/victorcandidoleite/
- Site real que aparece como projeto: https://grupogvs.com.br
