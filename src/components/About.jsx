import { ArrowUpRight, GraduationCap, Sparkles, Briefcase, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { FloatingDock } from './ui/floating-dock'
import { portfolioData } from '../data/portfolioData'

export default function About() {
  const { personal } = portfolioData

  // Cards que restaram (sem o número de repositórios) adaptados para o formato Floating Dock
  const dockItems = [
    {
      title: "PUC Minas · Engenharia de Software",
      icon: <GraduationCap className="h-5 w-5 text-stone-700" />,
      href: "#education",
    },
    {
      title: "AI-Native · Fluxo com IA",
      icon: <Sparkles className="h-5 w-5 text-stone-700" />,
      href: "#skills",
    },
    {
      title: "Grupo GVS · Vivência em TI & COR",
      icon: <Briefcase className="h-5 w-5 text-stone-700" />,
      href: "#experience",
    },
    {
      title: "GitHub · Código & Projetos",
      icon: <GithubIcon className="h-5 w-5 text-stone-700" />,
      href: personal.social?.github || "https://github.com/thevictorcandido",
    },
    {
      title: "LinkedIn · Rede Profissional",
      icon: <LinkedinIcon className="h-5 w-5 text-stone-700" />,
      href: personal.social?.linkedin || "https://www.linkedin.com/in/victorcandidoleite/",
    },
    {
      title: "Email · Conversar com Victor",
      icon: <Mail className="h-5 w-5 text-stone-700" />,
      href: `mailto:${personal.social?.email || "victorcandidoleite@gmail.com"}`,
    },
  ]

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative bg-[#F7F4EE] border-t border-b border-stone-200/50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            <span>01</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>Trajetória & Visão</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            Criando com rigor técnico, <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              pensando como criador de produtos.
            </span>
          </h2>
        </div>

        {/* Adaptação no estilo Shatlyk1011/team-member-card */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-14">
          
          {/* Card da Foto com moldura editorial */}
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:w-[420px] shrink-0 h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-stone-200/90 shadow-md group bg-stone-100">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            <img
              src="/vitin ponto de onibus estilo.jpeg"
              alt="Victor Cândido Leite"
              className="h-full w-full object-cover object-[center_30%] duration-700 ease-out group-hover:scale-105"
            />
            {/* Tag flutuante sobre a foto */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-stone-100 pointer-events-none">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-stone-300 font-sans">
                  Desenvolvedor & Criador
                </p>
                <p className="text-sm font-bold font-display text-white">
                  Victor Cândido Leite
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 font-medium text-stone-100">
                Belo Horizonte, MG
              </span>
            </div>
          </div>

          {/* Coluna de Texto, Frase & Detalhes */}
          <div className="flex-1 flex flex-col justify-between py-2">
            
            {/* Bloco Superior: Nome e Frase em Destaque */}
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-stone-400 uppercase font-sans mb-3">
                ENGENHARIA DE SOFTWARE · FOCO EM BACKEND & IA
              </p>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-display font-light tracking-tight text-stone-900">
                Victor <br />
                <span className="font-bold text-stone-950">Cândido Leite</span>
              </h3>

              {/* Frase / Citação integrada no estilo do card */}
              <blockquote className="mt-6 font-display font-medium text-base sm:text-lg md:text-xl text-stone-800 leading-snug italic border-l-2 border-stone-900/60 pl-4 py-1">
                “Acredito que o bom software é aquele que une precisão lógica e sensibilidade estética — tornando o complexo simples e agradável para quem o utiliza.”
              </blockquote>

              {/* Texto sobre mim (Biografia) */}
              <div className="mt-6 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                {personal.bio.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Rodapé do Card: Botão de Ação Circular + Floating Dock dos Cards Restantes */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Botão de Conexão Circular no padrão Shatlyk1011 */}
              <a
                href={`mailto:${personal.social?.email || "victorcandidoleite@gmail.com"}`}
                className="group flex items-center gap-4 text-stone-800 hover:text-stone-950 transition-colors"
              >
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-300 shadow-2xs">
                  <ArrowUpRight
                    size={20}
                    className="text-stone-700 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold font-display uppercase tracking-wider text-stone-900">
                    Vamos conversar
                  </p>
                  <p className="text-xs text-stone-500 font-sans">
                    {personal.social?.email || "victorcandidoleite@gmail.com"}
                  </p>
                </div>
              </a>

              {/* Floating Dock com os cards que restaram */}
              <div className="self-center sm:self-auto">
                <FloatingDock items={dockItems} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
