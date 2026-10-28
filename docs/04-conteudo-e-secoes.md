# 04 - Conteúdo e Seções

Voltar: [Portfolio Victor](README.md)

Ordem em `App.jsx`. Coluna "fonte" diz de onde vem o texto exibido — ver [02 - Stack e Arquitetura](02-stack-e-arquitetura.md).

| # | Seção (`id`) | Componente | O que mostra | Fonte do texto |
|---|---|---|---|---|
| — | navegação | `Navbar.jsx` | Barra sólida presa no topo (estilo navbar-02): logo, 7 links com o ativo por rolagem, idioma, "Vamos conversar" e painel lateral abaixo de 1024 px | `nav.*` + `navItems` |
| — | `hero` | `Hero.jsx` | Headline "Mente focada, código com alma criativa.", sem cabeçalho próprio (a navegação é toda da Navbar), nome alinhado à esquerda e a ilustração `pato.webp` com entrada elástica, status de disponibilidade | `hero.*` |
| 01 | `about` | `About.jsx` | Bio em 3 parágrafos, foto "ponto de ônibus", floating dock (PUC, IA, GVS, GitHub, LinkedIn, e-mail) | `about.*` |
| 02 | `projects` | `Projects.jsx` | Pilha de cards: 01 Degrau Educa e 02 Drift Invaders (botão "Ler estudo de caso") e 03 Site Institucional do Grupo GVS; pílulas e setas anterior/próximo, que só aparecem com mais de um projeto | `projects.*` |
| — | `/projetos/degrau-educa` | `pages/CaseStudyDegrauEduca.jsx` | Estudo de caso do Degrau Educa: problema, pesquisa, personas, wireframes, galeria das telas, painel admin com código, dados, ferramentas e o que faria diferente | `caseStudies.degraueduca.*` |
| — | `/projetos/drift-invaders` | `pages/CaseStudyDriftInvaders.jsx` | Estudo de caso do Drift Invaders: analogia com MLOps, regras e anomalias, galeria das telas, regras em funções puras e testes (com código), organização, ferramentas e o que faria diferente | `caseStudies.driftinvaders.*` |
| 03 | `experience` | `Experience.jsx` | Lista dos 3 cargos no Grupo GVS (cargo, período, resumo das funções) com painel de ilustração animada por cargo | `experience.*` + `experiences` |
| 04 | `skills` | `Skills.jsx` | Globo 3D com 16 tecnologias (backend, front, infra, IA), centralizado; o clique encolhe o globo e abre ao lado um painel com texto e exemplo de projeto real | `skills.*` + `skills` |
| 05 | `education` | `Education.jsx` | PUC Minas 2024–2029 + 4 disciplinas-chave (inclui DIAW) | `education.*` |
| 06 | `contact` | `Contact.jsx` | Formulário (nome, e-mail, mensagem), copiar e-mail, links GitHub/LinkedIn, localização | `contact.*` |
| — | rodapé | `Footer.jsx` | Copyright, tagline, voltar ao topo | `footer.*` |

## Skills listadas

Globo único com 16 tecnologias, cada uma com texto curto e um exemplo de projeto real. A fonte dos exemplos é o grafo de notas **Tecnologias** ↔ **Repositórios** do vault do Obsidian (fora do repo).

- **Backend:** Python, Java, Spring Boot, Node.js, JUnit, APIs REST, Git & GitHub.
- **Front-end:** HTML, CSS, JavaScript, React, Tailwind CSS, WordPress.
- **Infra:** Vercel. **IA:** Hugging Face, Engenharia de Prompt.

> [!WARNING]
> **o que ainda falta**
> Node.js e Hugging Face têm exemplo genérico ("trabalho interdisciplinar do 1º semestre"): contexto do projeto a completar.

## Links externos

- Cargos da Trajetória → `https://grupogvs.com.br` (desde 2026-10-20; antes apontavam para o LinkedIn do Victor).
- Projeto GVS → botão "Visitar Website Oficial" (`liveUrl`).

Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md).
