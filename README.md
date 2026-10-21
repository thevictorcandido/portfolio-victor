# Portfólio — Victor Cândido Leite

Portfólio pessoal de Victor Cândido Leite, estudante de Engenharia de Software na PUC Minas. Página única, bilíngue (português e inglês), feita com **React 19**, **Vite 8** e **Tailwind CSS v4** para a disciplina **DIAW** (Desenvolvimento e Integração de Aplicações Web).

> Documentação completa (arquitetura, design system, i18n, decisões e pendências) em **[`docs/`](docs/README.md)**.

## Seções

| # | Seção | Conteúdo |
|---|---|---|
| — | Início | Apresentação, foto e seletor de idioma |
| 01 | Sobre | Bio, citação e atalhos para links |
| 02 | Projetos | Site institucional do Grupo GVS e o sistema Xulambis Pizza (Java, PUC Minas) |
| 03 | Trajetória | Linha do tempo dos três cargos no Grupo GVS |
| 04 | Habilidades | Backend e Inteligência Artificial |
| 05 | Formação | Engenharia de Software na PUC Minas e estudo contínuo |
| 06 | Contato | Formulário com envio real por e-mail (EmailJS) e links diretos |

## Stack

- **React 19** + **Vite 8**, JavaScript (JSX)
- **Tailwind CSS v4**, com tokens de tema em `src/index.css`
- **i18next** + **react-i18next**: português (padrão) e inglês, com detecção pelo navegador e escolha salva no `localStorage`
- **motion** (animações do dock) e **lucide-react** (ícones)
- **@emailjs/browser** para o formulário de contato
- **oxlint** para lint

## Como rodar

Requer **Node.js 20.19+ ou 22.12+**.

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run lint      # oxlint
npm run build     # gera dist/
npm run preview   # serve o dist/ localmente
```

### Formulário de contato

O envio usa o [EmailJS](https://www.emailjs.com/). Copie `.env.example` para `.env.local` e preencha:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

O template do EmailJS precisa usar `{{name}}`, `{{email}}` e `{{message}}`. Sem essas variáveis o site funciona, mas o formulário mostra um aviso de erro com o e-mail direto como alternativa. O passo a passo completo está em [`docs/09-como-rodar-e-manter.md`](docs/09-como-rodar-e-manter.md).

## Como editar o conteúdo

| Quero mudar… | Onde |
|---|---|
| Qualquer texto visível | `src/i18n/locales/pt-BR/translation.json` **e** `src/i18n/locales/en/translation.json` |
| Links sociais e e-mail | `src/data/portfolioData.js` → `personal.social` |
| Imagens de cargos e projetos | `public/` + campo `image` em `src/data/portfolioData.js` |
| Tecnologias das Habilidades | `src/data/portfolioData.js` (nome e `key`) + `skills.techRoles.<key>` nos dois JSON |
| Cores, fontes e animações | `src/index.css` |

`portfolioData.js` guarda só links, caminhos de imagem e identificadores. Todo texto fica nos arquivos de tradução, e toda chave nova precisa existir nos dois idiomas.

## Estrutura

```
src/
├── main.jsx                 # carrega o i18n e monta o App
├── App.jsx                  # ordem das seções
├── index.css                # tema Tailwind, fontes locais, animações
├── components/              # uma seção por arquivo + Navbar, Footer, ícones
│   ├── LanguageSwitcher/    # seletor PT / EN
│   └── ui/                  # blur-text, border-beam, floating-dock, marquee
├── config/                  # idiomas (i18nConfig) e credenciais do EmailJS
├── data/portfolioData.js    # links, imagens e ids
├── i18n/                    # inicialização + locales/{pt-BR,en}/translation.json
└── lib/utils.js             # cn() para juntar classes
public/                      # fotos, imagens dos projetos, fontes, favicon
docs/                        # documentação do projeto
```

## Design

Visual editorial claro: fundo bege `#FAF8F5`, texto quase preto `#151515` e acento verde-musgo `#2B4636`. Tipografia com **Montserrat** (texto), **Hyperlegible Sans** (títulos) e **Smile Moon** (destaques). As animações respeitam a opção "reduzir movimento" do sistema.

Referências visuais:
- **[azal.im](https://azal.im/)**: seções numeradas (`01`, `02`…), badges de habilidades e acabamento técnico.
- **[pedrobragadev.com](https://pedrobragadev.com/)**: tipografia editorial, narrativa na seção "Sobre" e linha do tempo de trajetória.
- **[FlaviOS](https://flaviojunior-portfolio.vercel.app/)**: detalhes inspirados em sistemas operacionais, como as janelas técnicas nos cards.

Detalhes em [`docs/03-design-system.md`](docs/03-design-system.md).
