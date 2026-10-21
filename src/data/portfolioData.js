// Dados estruturais do portfólio: links, imagens e identificadores.
// Todo texto visível fica em src/i18n/locales/<idioma>/translation.json.

export const portfolioData = {
  personal: {
    name: "Victor Cândido Leite",
    social: {
      github: "https://github.com/thevictorcandido",
      linkedin: "https://www.linkedin.com/in/victorcandidoleite/",
      email: "victorcandidoleite@gmail.com",
    },
  },

  // ids das <section> — a Navbar usa para o link ativo e as âncoras
  navItems: [
    { id: "hero" },
    { id: "about" },
    { id: "projects" },
    { id: "experience" },
    { id: "skills" },
    { id: "education" },
    { id: "contact" },
  ],

  // key → skills.techRoles.<key> nos arquivos de tradução; name → ícone em TechIcons.jsx
  skillsCategories: [
    {
      id: "backend",
      technologies: [
        { name: "Python", key: "python" },
        { name: "Java", key: "java" },
        { name: "Node.js", key: "nodejs" },
        { name: "PostgreSQL", key: "postgresql" },
        { name: "Docker", key: "docker" },
        { name: "Redis", key: "redis" },
        { name: "Git & GitHub", key: "git" },
        { name: "RESTful APIs", key: "rest" },
      ],
    },
    {
      id: "ai",
      technologies: [
        { name: "OpenAI API", key: "openai" },
        { name: "LangChain", key: "langchain" },
        { name: "PyTorch", key: "pytorch" },
        { name: "Hugging Face", key: "huggingface" },
        { name: "Pandas & NumPy", key: "pandas" },
        { name: "Ollama / Local LLMs", key: "ollama" },
        { name: "Scikit-Learn", key: "sklearn" },
        { name: "Prompt Engineering", key: "prompt" },
      ],
    },
  ],

  // id → experience.roles.<id> nos arquivos de tradução
  experiences: [
    {
      id: "cor",
      company: "Grupo GVS",
      companyUrl: "https://grupogvs.com.br",
      image: "/victor-agora.jpeg",
      objectPosition: "object-bottom",
    },
    {
      id: "web",
      company: "Grupo GVS",
      companyUrl: "https://grupogvs.com.br",
      image: "/victor-meio.jpeg",
      objectPosition: "object-[center_15%]",
    },
    {
      id: "mkt",
      company: "Grupo GVS",
      companyUrl: "https://grupogvs.com.br",
      image: "/victor-inicio.jpeg",
      objectPosition: "object-[center_15%]",
    },
  ],

  projects: [
    {
      id: "proj-gvs",
      image: "/projects/grupogvs-hero.png",
      githubUrl: null,
      liveUrl: "https://grupogvs.com.br",
    },
    {
      id: "proj-xulambis",
      image: "/projects/xulambis-terminal.png",
      githubUrl: null,
      liveUrl: null,
    },
  ],

  // Textos de cada card em education.* (puc) e education.continuous.* nos arquivos de tradução
  education: [{ id: "puc" }, { id: "continuous" }],
}
