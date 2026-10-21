// Centralização de dados e conteúdos do Portfólio de Victor Cândido Leite
// Alinhado ao perfil de jovem criativo & futuro engenheiro de software na PUC Minas.

export const portfolioData = {
  personal: {
    name: "Victor Cândido Leite",
    shortName: "Victor",
    role: "Engenharia de Software & Web",
    subtitle: "Interfaces Criativas • Java • IA Aplicada",
    institution: "PUC Minas — Belo Horizonte",
    location: "Nova Lima / Belo Horizonte, MG — Brasil",
    availability: "Disponível para projetos & oportunidades",
    heroHeadlinePart1: "Mente focada,",
    heroHeadlinePart2: "código com alma criativa.",
    heroSummary: "Estudante de Engenharia de Software na PUC Minas. Crio produtos digitais contemporâneos combinando fundamentos sólidos de computação, design refinado e o uso estratégico de inteligência artificial.",
    bio: [
      "Sou estudante de Engenharia de Software na Pontifícia Universidade Católica de Minas Gerais (PUC Minas), apaixonado pela interseção entre lógica rigorosa, arquitetura de software e design de interfaces.",
      "Acredito que o bom desenvolvimento de software vai além de escrever código funcional: trata-se de criar produtos agradáveis, intuitivos e com propósito claro. Cultivo uma rotina diária de aprendizado contínuo, aprofundando-me nos fundamentos de algoritmos, orientação a objetos com Java e no ecossistema moderno da web com JavaScript e React.",
      "Trabalho de forma nativa com Inteligência Artificial, utilizando ferramentas de ponta para explorar novas ideias, prototipar rapidamente, depurar soluções complexas e manter um fluxo de engenharia produtivo, sempre com rigor crítico sobre a elegância e a sustentabilidade de cada linha de código."
    ],
    social: {
      github: "https://github.com/thevictorcandido",
      linkedin: "https://www.linkedin.com/in/victorcandidoleite/",
      email: "victorcandidoleite@gmail.com",
      instagram: "",
    },
    resumeUrl: "#",
    avatarUrl: "/victor curriculo.png",
  },

  navItems: [
    { id: "hero", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "projects", label: "Projetos" },
    { id: "experience", label: "Trajetória" },
    { id: "skills", label: "Habilidades" },
    { id: "education", label: "Formação" },
    { id: "contact", label: "Contato" },
  ],

  stats: [
    { value: "PUC Minas", label: "Engenharia de Software", detail: "Bacharelado em andamento" },
    { value: "AI-Native", label: "Fluxo Estratégico com IA", detail: "Produtividade & inovação" },
    { value: "100%", label: "Curiosidade & Evolução", detail: "Aprendizado autodidata contínuo" },
  ],

  skillsCategories: [
    {
      id: "backend",
      category: "Backend & Arquitetura de Sistemas",
      focusBadge: "Foco Principal",
      description: "Construção de serviços robustos, APIs RESTful de alta performance, modelagem de banco de dados e arquitetura orientada a objetos.",
      technologies: [
        { name: "Python", key: "python", color: "#3776AB" },
        { name: "Java", key: "java", color: "#ED8B00" },
        { name: "Node.js", key: "nodejs", color: "#339933" },
        { name: "PostgreSQL", key: "postgresql", color: "#4169E1" },
        { name: "Docker", key: "docker", color: "#2496ED" },
        { name: "Redis", key: "redis", color: "#DC382D" },
        { name: "Git & GitHub", key: "git", color: "#F05032" },
        { name: "RESTful APIs", key: "rest", color: "#009688" },
      ],
    },
    {
      id: "ai",
      category: "Inteligência Artificial & Dados",
      focusBadge: "Segundo Foco",
      description: "Integração estratégica de Large Language Models (LLMs), engenharia de prompts avançada, orquestração com LangChain e análise de dados.",
      technologies: [
        { name: "OpenAI API", key: "openai", color: "#10A37F" },
        { name: "LangChain", key: "langchain", color: "#1C3C3C" },
        { name: "PyTorch", key: "pytorch", color: "#EE4C2C" },
        { name: "Hugging Face", key: "huggingface", color: "#FFD21E" },
        { name: "Pandas & NumPy", key: "pandas", color: "#150458" },
        { name: "Ollama / Local LLMs", key: "ollama", color: "#24292E" },
        { name: "Scikit-Learn", key: "sklearn", color: "#F7931E" },
        { name: "Prompt Engineering", key: "prompt", color: "#6366F1" },
      ],
    },
  ],

  experiences: [
    {
      id: "exp-1",
      role: "Analista de TI — Centro de Operações Remotas",
      company: "Grupo GVS",
      companyUrl: "https://www.linkedin.com/in/victorcandidoleite/",
      period: "Ago. de 2026 — Presente",
      location: "Belo Horizonte / Nova Lima, MG · Presencial",
      summary: "Administração, monitoramento e suporte da infraestrutura crítica de TI e telecomunicações do Centro de Operações Remotas (COR) e das usinas de geração de energia.",
      image: "/victor-agora.jpeg",
      imageCaption: "Centro de Operações Remotas · SCADA & Monitoramento",
      objectPosition: "object-bottom",
      bullets: [
        "Monitoramento e sustentação de redes, telecomunicações e serviços, garantindo a alta disponibilidade de sistemas, servidores e equipamentos de campo.",
        "Suporte técnico especializado a sistemas supervisórios de automação (SCADA), CFTV e plataformas de monitoramento em tempo real de usinas.",
        "Integração de equipamentos de telemetria, diagnóstico de falhas de comunicação e apoio técnico contínuo às equipes de operação e manutenção.",
        "Documentação técnica de arquitetura de rede, gestão de ativos de TI e implementação de melhorias e novas tecnologias de infraestrutura.",
      ],
    },
    {
      id: "exp-2",
      role: "Analista de Comunicação Interna & Web",
      company: "Grupo GVS",
      companyUrl: "https://www.linkedin.com/in/victorcandidoleite/",
      period: "Ago. de 2025 — Ago. de 2026 · 1 ano 1 mês",
      location: "Belo Horizonte, MG · Presencial",
      summary: "Atuação estratégica conectando comunicação corporativa, mídia digital e desenvolvimento web, liderando a reformulação integral do site oficial do grupo.",
      image: "/victor-meio.jpeg",
      imageCaption: "Comunicação Interna & Institucional · Grupo GVS",
      objectPosition: "object-[center_15%]",
      bullets: [
        "Desenvolvimento e reformulação completa do website oficial do Grupo GVS, redesenhando a imagem digital da marca para 2026 com áreas institucionais, usinas, portal de vagas e projetos socioambientais.",
        "Gerenciamento de redes sociais, criação de material gráfico e apresentações corporativas de alto impacto para a diretoria.",
        "Gravação e edição de conteúdo audiovisual de ponta focado no mercado de geração de energia por fontes sustentáveis e dia a dia das operações.",
        "Planejamento estratégico e condução de campanhas de engajamento interno e comunicação corporativa.",
      ],
    },
    {
      id: "exp-3",
      role: "Assistente de Comunicação e Marketing",
      company: "Grupo GVS",
      companyUrl: "https://www.linkedin.com/in/victorcandidoleite/",
      period: "Mar. de 2025 — Jul. de 2025 · 5 meses",
      location: "Belo Horizonte, MG · Presencial",
      summary: "Atuação na linha de frente operacional de divulgação multimídia, produção de conteúdo e suporte a estratégias de endomarketing e marketing de vendas.",
      image: "/victor-inicio.jpeg",
      imageCaption: "Início no Grupo GVS · Time de Comunicação",
      objectPosition: "object-[center_15%]",
      bullets: [
        "Gravação, edição e publicação de conteúdo multimídia para redes sociais e canais corporativos da organização.",
        "Apoio direto a iniciativas de endomarketing e campanhas alinhadas à área de vendas no setor de energia limpa.",
        "Criação e padronização de peças digitais, atuando como elemento-chave na comunicação e divulgação das marcas do grupo.",
      ],
    },
  ],

  projects: [
    {
      id: "proj-gvs",
      tagline: "Reformulação completa da presença digital e portal corporativo da empresa",
      category: "Web & Produção Real",
      featured: true,
      image: "/projects/grupogvs-hero.png",
      badge: "Website em Produção",
      description: "Projeto profissional real concebido e desenvolvido inteiramente por mim para o Grupo GVS, reformulando a imagem digital corporativa para o mercado de geração de energia sustentável. Inclui arquitetura de usinas, portal de carreiras e projetos socioambientais.",
      githubUrl: null,
      liveUrl: "https://grupogvs.com.br",
      accentColor: "from-blue-50 to-emerald-50",
    },
    {
      id: "proj-xulambis",
      tagline: "Sistema de gerenciamento e montagem de pedidos desenvolvido em console",
      category: "Engenharia de Software (Backend)",
      featured: true,
      image: "/projects/xulambis-terminal.png",
      badge: "Trabalho em Equipe · PUC Minas",
      description: "Projeto acadêmico prático desenvolvido em conjunto na sala de aula do curso de Engenharia de Software da PUC Minas. O software gerencia todo o fluxo de pedidos de uma pizzaria, aplicando princípios rigorosos de Programação Orientada a Objetos, lógica de cálculo dinâmico de adicionais e interface interativa via terminal CLI.",
      githubUrl: "https://github.com/thevictorcandido",
      liveUrl: null,
      accentColor: "from-amber-50 to-stone-100",
    },
  ],

  // Textos de cada card em education.* (puc) e education.continuous.* nos arquivos de tradução
  education: [{ id: "puc" }, { id: "continuous" }],
}
