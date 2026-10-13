import { useState } from 'react'
import { ExternalLink, ArrowUpRight, FolderGit2, Sparkles, Code2 } from 'lucide-react'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export default function Projects() {
  const { projects } = portfolioData
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Categorias únicas
  const categories = ['Todos', ...new Set(projects.map((p) => p.category))]

  const filteredProjects =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 border-b border-[#232E25]/60 relative bg-[#0C0F0D]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>02</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Portfólio Selecionado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Projetos em Destaque
            </h2>
          </div>

          {/* Filtros por Categoria */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2B4231] text-[#FAF7F2] border border-[#4B6F55]'
                    : 'bg-[#111613] text-[#8F877C] hover:text-[#ECE5D8] border border-[#232E25] hover:border-[#3A5742]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] transition-all duration-300 overflow-hidden"
            >
              {/* Preview Visual / Mockup Placeholder */}
              <div className="relative aspect-[16/10] bg-[#151D17] border-b border-[#232E25] overflow-hidden flex flex-col justify-between p-4 group-hover:border-[#3A5742] transition-colors">
                
                {/* Janela de código / cabeçalho técnico (Inspiração FlaviOS) */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2B4231] border border-[#3A5742]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#202B23] border border-[#2B4231]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#17221A] border border-[#202B23]" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-[#1A221C] border border-[#2B4231] text-[#A7CCAF]">
                    {project.category}
                  </span>
                </div>

                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder elegante com gradiente verde musgo e artefatos de wireframe */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#121E15] via-[#101712] to-[#0A0D0B] text-center">
                    <div className="w-12 h-12 rounded-sm bg-[#1A281D] border border-[#3A5742] flex items-center justify-center mb-3 text-[#84B18F] group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <p className="font-mono text-xs text-[#FAF7F2] font-medium tracking-wide">
                      {project.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#8F877C] mt-1">
                      [Espaço para Imagem / Screenshot]
                    </p>
                  </div>
                )}

                {/* Tag de destaque */}
                {project.featured && (
                  <div className="relative z-10 self-start">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#2B4231]/90 text-[#FAF7F2] border border-[#4B6F55]">
                      <Sparkles className="w-2.5 h-2.5 text-[#A7CCAF]" />
                      Destaque
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo & Detalhes do Projeto */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#FAF7F2] group-hover:text-[#A7CCAF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#84B18F] mt-1 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-[#B8ADA0] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-[#17221A] border border-[#2B4231] text-[#D8D1C3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links de Ação (Live Demo & GitHub) */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#1C261E]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FAF7F2] hover:text-[#84B18F] transition-colors"
                    >
                      <span>Ver Projeto</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#8F877C] hover:text-[#ECE5D8] transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Nota para Victor */}
        <div className="mt-12 p-4 rounded-sm border border-dashed border-[#2B4231] bg-[#111613]/50 text-center">
          <p className="font-mono text-xs text-[#8F877C]">
            💡 <strong className="text-[#A7CCAF]">Dica:</strong> Para adicionar novos projetos, capturas de tela ou links reais do GitHub, basta editar o arquivo{' '}
            <code className="text-[#FAF7F2] bg-[#17221A] px-1.5 py-0.5 rounded border border-[#232E25]">
              src/data/portfolioData.js
            </code>.
          </p>
        </div>

      </div>
    </section>
  )
}
