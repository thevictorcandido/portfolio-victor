# 04 - Conteúdo e Seções

Voltar: [Portfolio Victor](README.md)

Ordem em `App.jsx`. Coluna "fonte" diz de onde vem o texto exibido — ver [02 - Stack e Arquitetura](02-stack-e-arquitetura.md).

| # | Seção (`id`) | Componente | O que mostra | Fonte do texto |
|---|---|---|---|---|
| — | navegação | `Navbar.jsx` | Barra flutuante, link ativo por scroll, menu mobile, `LanguageSwitcher` | `nav.*` + `navItems` |
| — | `hero` | `Hero.jsx` | Headline "Mente focada, código com alma criativa.", foto recortada `victor-sem-fundo.png`, status de disponibilidade | `hero.*` |
| 01 | `about` | `About.jsx` | Bio em 3 parágrafos, citação, foto "ponto de ônibus", floating dock (PUC, IA, GVS, GitHub, LinkedIn, e-mail) | `about.*` |
| 02 | `projects` | `Projects.jsx` | Carrossel com 2 projetos (GVS e Xulambis), anterior/próximo | `projects.*` + `projects[].tags` |
| 03 | `experience` | `Experience.jsx` | Timeline com 3 cargos no Grupo GVS, foto por cargo, chips de tecnologia | `experience.roles.{cor,web,mkt}` + `technologies` |
| 04 | `skills` | `Skills.jsx` | 2 categorias (Backend, IA) × 8 tecnologias com ícone e cor de marca | `skills.*` + `skillsCategories` |
| 05 | `education` | `Education.jsx` | PUC Minas 2024–2028 + 4 disciplinas-chave (inclui DIAW) | `education.*` |
| 06 | `contact` | `Contact.jsx` | Formulário (nome, e-mail, mensagem), copiar e-mail, links GitHub/LinkedIn, localização | `contact.*` |
| — | rodapé | `Footer.jsx` | Copyright, tagline, voltar ao topo | `footer.*` |

## Skills listadas

- **Backend (foco principal):** Python, Java, Node.js, PostgreSQL, Docker, Redis, Git & GitHub, RESTful APIs.
- **IA (segundo foco):** OpenAI API, LangChain, PyTorch, Hugging Face, Pandas & NumPy, Ollama / LLMs locais, Scikit-Learn, Prompt Engineering.

> [!WARNING]
> **armadilha**
>
> Os rótulos de categoria divergem entre as fontes: `portfolioData` diz "Backend & Arquitetura de Sistemas", a tradução diz "Backend & Engenharia de Sistemas". O que aparece na tela é o da tradução.

## Links externos

- Cargos da Trajetória → `https://grupogvs.com.br` (desde 2026-10-20; antes apontavam para o LinkedIn do Victor).
- Projeto GVS → botão "Visitar Website Oficial" (`liveUrl`).
- Projeto Xulambis → **sem botões**: repositório não é público e não há demo. Se o repo for aberto, preencher `githubUrl` em `portfolioData.js` que o botão volta sozinho.

Ver [08 - Bugs e Pendências](08-bugs-e-pendencias.md).
