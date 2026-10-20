# Portfólio Profissional — Victor Leite

Portfólio moderno, veloz e responsivo desenvolvido com **React 19**, **Vite 8** e **Tailwind CSS v4**.

> 📚 Documentação completa (arquitetura, design system, i18n, decisões e pendências) em **[`docs/`](docs/README.md)**.

Inspirado em uma síntese conceitual dos portfólios de referência:
- **[azal.im](https://azal.im/)**: Precisão técnica, indicadores de seção numerados (`01`, `02`...), badges de habilidades com tempo/categoria, cantoneiras técnicas (corner reticles) no avatar e status badge com radar pulsante.
- **[pedrobragadev.com](https://pedrobragadev.com/)**: Tipografia fluida e editorial de alto impacto, narrativa envolvente na seção "Sobre", timeline fluida "Onde Já Atuei" e showcase de projetos.
- **[FlaviOS](https://flaviojunior-portfolio.vercel.app/)**: Detalhes e acabamento visual inspirados em sistemas operacionais e dashboards de desenvolvedor (chips de status, janelas técnicas em cards).

---

## 🎨 Paleta de Cores

- **Verde Musgo Escuro**: `#152218` a `#3A5742` (acentos e glows em `#84B18F` e `#A7CCAF`)
- **Branco Bege**: `#FAF7F2` (títulos e contrastes) e `#ECE5D8` / `#B8ADA0` (leitura confortável e elegante)
- **Quase Preto**: `#0C0F0D` (fundo principal orgânico profundo), `#111613` (superfície de cards) e `#232E25` (bordas sutis)

---

## 📁 Estrutura de Arquivos

```bash
portfolio-victor/
├── src/
│   ├── assets/              # Imagens e ícones estáticos
│   ├── components/
│   │   ├── Navbar.jsx       # Header fixo com detecção de scroll e menu mobile
│   │   ├── Hero.jsx         # Apresentação principal, avatar técnico e botões de ação
│   │   ├── About.jsx        # Seção Sobre com contadores de métricas e princípios
│   │   ├── Projects.jsx     # Galeria com filtros de categoria e cards
│   │   ├── Experience.jsx   # Linha do tempo com detalhes expansíveis e badges
│   │   ├── Skills.jsx       # Habilidades categorizadas com badges duplos
│   │   ├── Education.jsx    # Formação acadêmica e cursos
│   │   ├── Contact.jsx      # Formulário e botão de copiar e-mail com feedback
│   │   ├── Footer.jsx       # Rodapé com paleta de cores e botão para voltar ao topo
│   │   └── Icons.jsx        # Ícones SVG dedicados (GitHub, LinkedIn, Instagram)
│   ├── data/
│   │   └── portfolioData.js # ⭐️ ARQUIVO PRINCIPAL DE DADOS (Edite aqui seus textos e links)
│   ├── App.jsx              # Composição das seções
│   ├── index.css            # Tema Tailwind v4 e variáveis de estilo
│   └── main.jsx             # Ponto de entrada do React
├── index.html               # Configuração de fontes do Google e metadados
└── package.json
```

---

## ⚡ Como Rodar o Projeto

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Gerar a versão de produção:
   ```bash
   npm run build
   ```

---

## ✏️ Como Personalizar

Para alterar informações, você só precisa editar o arquivo **[`src/data/portfolioData.js`](src/data/portfolioData.js)**:
- **Foto:** Salve sua foto em `public/foto.jpg` e defina `avatarUrl: '/foto.jpg'`.
- **Textos e Biografia:** Modifique `bio`, `role`, `subtitle` e `availability`.
- **Links Sociais:** Altere os URLs de GitHub, LinkedIn, E-mail e Instagram em `social`.
- **Projetos:** Adicione ou edite os projetos em `projects`, incluindo tags e links de demonstração.
- **Experiência e Formação:** Atualize suas empresas, cargos e estudos nas seções correspondentes.
