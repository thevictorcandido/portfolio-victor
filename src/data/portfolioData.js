// Centralização de dados e conteúdos do Portfólio de Victor Leite
// Você pode editar facilmente qualquer texto, link, imagem ou item aqui.

export const portfolioData = {
  personal: {
    name: "Victor Leite",
    role: "Software Developer",
    subtitle: "Frontend & Full Stack Artisan",
    location: "Belo Horizonte, MG — Brasil",
    availability: "Disponível para novos projetos & propostas",
    bio: [
      "Desenvolvedor focado em criar produtos digitais velozes, acessíveis e com acabamento de alto nível. Combino rigor técnico de engenharia de software com atenção refinada a design, tipografia e experiência do usuário.",
      "Com experiência prática em React, Next.js, TypeScript e arquitetura de software moderna, gosto de transformar ideias abstratas e regras de negócio complexas em interfaces elegantes que as pessoas realmente adoram usar.",
      "Valorizo código limpo, componentização inteligente, testes consistentes e processos ágeis que geram entregas contínuas e valor real."
    ],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "victor@exemplo.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
    },
    resumeUrl: "#", // Link para o PDF do currículo
    avatarUrl: null, // Caso queira colocar uma imagem real: "/sua-foto.jpg"
  },

  navItems: [
    { id: "about", number: "01", label: "Sobre" },
    { id: "projects", number: "02", label: "Projetos" },
    { id: "experience", number: "03", label: "Experiência" },
    { id: "skills", number: "04", label: "Habilidades" },
    { id: "education", number: "05", label: "Formação" },
    { id: "contact", number: "06", label: "Contato" },
  ],

  stats: [
    { value: "3+", label: "Anos de Prática & Código" },
    { value: "15+", label: "Projetos Concluídos" },
    { value: "100%", label: "Foco em Performance & UX" },
    { value: "24/7", label: "Curiosidade Contínua" },
  ],

  skillsCategories: [
    {
      category: "Frontend & Interfaces",
      description: "Construção de aplicações reativas, performáticas e responsivas",
      skills: [
        { name: "React", level: "Avançado", badge: "Core" },
        { name: "TypeScript", level: "Avançado", badge: "Tipagem" },
        { name: "Next.js", level: "Intermediário/Avançado", badge: "SSR & App Router" },
        { name: "Tailwind CSS", level: "Avançado", badge: "Design System" },
        { name: "JavaScript (ES6+)", level: "Avançado", badge: "Fundação" },
        { name: "HTML5 & CSS3 Semântico", level: "Avançado", badge: "Acessibilidade" },
        { name: "Zustand & Redux", level: "Intermediário", badge: "State" },
      ],
    },
    {
      category: "Backend & Dados",
      description: "APIs robustas, regras de negócio e integração de banco de dados",
      skills: [
        { name: "Node.js", level: "Intermediário", badge: "Runtime" },
        { name: "Express / Fastify", level: "Intermediário", badge: "APIs" },
        { name: "PostgreSQL", level: "Intermediário", badge: "Relacional" },
        { name: "Prisma ORM", level: "Intermediário", badge: "ORM" },
        { name: "REST APIs", level: "Avançado", badge: "Arquitetura" },
        { name: "GraphQL", level: "Básico/Intermediário", badge: "Consultas" },
      ],
    },
    {
      category: "Ferramentas & DevOps",
      description: "Qualidade de código, automação e esteira de entrega",
      skills: [
        { name: "Git & GitHub", level: "Avançado", badge: "Versionamento" },
        { name: "Vite", level: "Avançado", badge: "Build Tool" },
        { name: "Docker", level: "Básico/Intermediário", badge: "Containers" },
        { name: "Figma", level: "Intermediário", badge: "UI/UX & Prototipagem" },
        { name: "Vercel / Netlify", level: "Avançado", badge: "Deploy & CI/CD" },
        { name: "Vitest / Jest", level: "Intermediário", badge: "Testes Unitários" },
      ],
    },
  ],

  experiences: [
    {
      id: "exp-1",
      role: "Desenvolvedor Frontend",
      company: "Projeto / Empresa Exemplo",
      companyUrl: "https://example.com",
      period: "2024 — Presente",
      location: "Remoto / Híbrido",
      summary: "Desenvolvimento de interfaces modernas, componentes reutilizáveis e otimização de performance.",
      bullets: [
        "Arquitetura e desenvolvimento de features com React, Vite e TypeScript, reduzindo tempo de carregamento em 35%.",
        "Implementação de biblioteca de componentes reutilizáveis garantindo consistência visual e acessibilidade.",
        "Integração contínua com APIs REST e gerenciamento de estado global com Zustand.",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Zustand", "Git"],
    },
    {
      id: "exp-2",
      role: "Desenvolvedor de Software (Estágio / Júnior)",
      company: "Laboratório / Consultoria Tech",
      companyUrl: "https://example.com",
      period: "2023 — 2024",
      location: "Belo Horizonte, MG",
      summary: "Atuação no ciclo completo de desenvolvimento de sistemas web para clientes corporativos.",
      bullets: [
        "Criação de páginas e fluxos de usuário orientados por protótipos de alta fidelidade no Figma.",
        "Participação em rituais ágeis (Scrum), revisões de código (Code Reviews) e testes de integração.",
        "Manutenção evolutiva e correção de bugs em aplicações legadas e novos produtos.",
      ],
      technologies: ["JavaScript", "React", "Node.js", "PostgreSQL", "CSS Modules"],
    },
    {
      id: "exp-3",
      role: "Desenvolvedor Web (Projetos Acadêmicos & Extensão)",
      company: "Universidade / Extensão Universitária",
      companyUrl: "https://example.com",
      period: "2022 — 2023",
      location: "Belo Horizonte, MG",
      summary: "Liderança técnica e desenvolvimento de plataformas para projetos comunitários e acadêmicos.",
      bullets: [
        "Coordenação técnica de squads estudantis na entrega de projetos reais para instituições parceiras.",
        "Oficinas e mentorias sobre versionamento com Git, GitHub e boas práticas de desenvolvimento web.",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Git / GitHub"],
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "Plataforma de Gestão & Dashboard",
      tagline: "Painel analítico moderno com visualização de dados em tempo real",
      category: "Full Stack",
      featured: true,
      description: "Sistema completo de visualização de métricas com gráficos interativos, autenticação segura, modo escuro e controle de permissões por usuário.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      image: null, // Coloque '/images/projects/projeto-1.jpg' quando tiver
    },
    {
      id: "proj-2",
      title: "E-Commerce Experience",
      tagline: "Loja virtual ultrarrápida focada em conversão e usabilidade mobile",
      category: "Frontend",
      featured: true,
      description: "Interface de e-commerce desenvolvida com foco em Core Web Vitals, carrinho otimizado, filtros instantâneos e checkout fluido.",
      tags: ["React", "Next.js", "Zustand", "Tailwind CSS", "Stripe API"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      image: null,
    },
    {
      id: "proj-3",
      title: "Design System & UI Kit",
      tagline: "Sistema de design modular, acessível e totalmente customizável",
      category: "UI / Design",
      featured: false,
      description: "Conjunto consistente de tokens de cor, tipografia e componentes acessíveis em conformidade com as diretrizes WCAG 2.1.",
      tags: ["TypeScript", "Radix UI", "Tailwind CSS", "Storybook"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      image: null,
    },
    {
      id: "proj-4",
      title: "TaskFlow — Produtividade Ágil",
      tagline: "Aplicação estilo Kanban com sincronização e drag-and-drop",
      category: "Web App",
      featured: false,
      description: "Gerenciador de tarefas colaborativo com suporte a múltiplos quadros, arrastar e soltar suave, tags personalizadas e persistência local e em nuvem.",
      tags: ["React", "Dnd Kit", "TypeScript", "Tailwind CSS", "IndexedDB"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.example.com",
      image: null,
    },
  ],

  education: [
    {
      institution: "Faculdade / Universidade",
      course: "Bacharelado em Engenharia de Software / Ciência da Computação",
      period: "2022 — 2026 (Em andamento)",
      description: "Formação sólida em estruturas de dados, algoritmos, arquitetura de software, bancos de dados relacionais e não-relacionais, e engenharia de requisitos.",
    },
    {
      institution: "Cursos Complementares & Especializações",
      course: "Desenvolvimento Web Full Stack & Ecossistema Moderno",
      period: "2023 — 2024",
      description: "Especialização em ecossistema JavaScript/TypeScript, testes automatizados, CI/CD, microsserviços e UI/UX avançado.",
    },
  ],
}
