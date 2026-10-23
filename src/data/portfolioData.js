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

  // Globo de habilidades. key → skills.items.<key> nos arquivos de tradução (nome, texto e exemplo);
  // o ícone fica no mapa de Skills.jsx. A fonte dos exemplos são as notas
  // "Tecnologias" e "Repositórios" do vault do Obsidian. projectUrl é opcional.
  skills: [
    { key: "python", category: "backend", projectUrl: "https://github.com/engsoftmarcelo/drift-invaders-pipeline-defense" },
    { key: "java", category: "backend", projectUrl: "https://github.com/thevictorcandido/ProgMod_XulambsFoods26-2/tree/Aula0710" },
    { key: "spring", category: "backend", projectUrl: "https://github.com/thevictorcandido/AV1" },
    { key: "nodejs", category: "backend", projectUrl: null },
    { key: "junit", category: "backend", projectUrl: "https://github.com/thevictorcandido/LAP1_PM_N2/tree/Aula2309" },
    { key: "rest", category: "backend", projectUrl: "https://github.com/thevictorcandido/portfolio-victor" },
    { key: "git", category: "backend", projectUrl: "https://github.com/thevictorcandido" },
    { key: "html", category: "frontend", projectUrl: "https://github.com/thevictorcandido/receitas-de-minas" },
    { key: "css", category: "frontend", projectUrl: "https://github.com/thevictorcandido/DIW-09-04" },
    { key: "javascript", category: "frontend", projectUrl: "https://github.com/thevictorcandido/Atividade-DIW-Semana-9" },
    { key: "react", category: "frontend", projectUrl: "https://github.com/thevictorcandido/portfolio-victor" },
    { key: "tailwind", category: "frontend", projectUrl: "https://github.com/thevictorcandido/portfolio-victor" },
    { key: "wordpress", category: "frontend", projectUrl: "https://grupogvs.com.br" },
    { key: "vercel", category: "infra", projectUrl: null },
    { key: "huggingface", category: "ai", projectUrl: null },
    { key: "prompt", category: "ai", projectUrl: null },
  ],

  // id → experience.roles.<id> nos arquivos de tradução; year agrupa a timeline
  experiences: [
    { id: "cor", year: "2026", initials: "GVS", company: "Grupo GVS", companyUrl: "https://grupogvs.com.br" },
    { id: "web", year: "2025", initials: "GVS", company: "Grupo GVS", companyUrl: "https://grupogvs.com.br" },
    { id: "mkt", year: "2025", initials: "GVS", company: "Grupo GVS", companyUrl: "https://grupogvs.com.br" },
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
