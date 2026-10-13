import { ArrowDown, Mail, ExternalLink, Terminal, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export default function Hero() {
  const { personal } = portfolioData

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#232E25]/60 bg-tech-grid"
    >
      {/* Background ambient moss glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#2B4231]/15 blur-[120px] rounded-full"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Avatar com Retículos Técnicos (Inspiração Azalim) + Quick Stats */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            {/* Moldura da Foto / Avatar */}
            <div className="relative aspect-[4/5] w-48 sm:w-56 lg:w-full max-w-[260px] bg-[#111613] border border-[#232E25] overflow-hidden group">
              {/* Corner brackets técnicos (estilo Azalim) */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#84B18F] z-20 pointer-events-none" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#84B18F] z-20 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#84B18F] z-20 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#84B18F] z-20 pointer-events-none" />

              {personal.avatarUrl ? (
                <img
                  src={personal.avatarUrl}
                  alt={`Retrato de ${personal.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                /* Placeholder elegante e técnico até o Victor passar a foto real */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#152218] via-[#0F1410] to-[#0C0F0D] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1F3023] border border-[#3A5742] flex items-center justify-center mb-3 text-[#A7CCAF]">
                    <Terminal className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-xs text-[#84B18F] uppercase tracking-wider">
                    {personal.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#8F877C] mt-1">
                    [Sua Foto Aqui]
                  </span>
                  <div className="mt-4 px-2 py-1 bg-[#1A221C] border border-[#2B4231] rounded text-[10px] font-mono text-[#B8ADA0]">
                    1080 × 1350 px
                  </div>
                </div>
              )}

              {/* Vinheta suave inferior */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0F0D] to-transparent pointer-events-none" />
            </div>

            {/* Quick System Badge (Inspiração FlaviOS) */}
            <div className="w-full max-w-[260px] p-3 rounded-sm border border-[#232E25] bg-[#111613]/90 text-[11px] font-mono text-[#B8ADA0] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#8F877C]">STATUS:</span>
                <span className="text-[#84B18F] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84B18F] animate-ping" />
                  ONLINE
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1C261E] pt-1">
                <span className="text-[#8F877C]">LOC:</span>
                <span className="text-[#ECE5D8] truncate">{personal.location.split('—')[0]}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#1C261E] pt-1">
                <span className="text-[#8F877C]">STACK:</span>
                <span className="text-[#A7CCAF]">React • Vite • TS</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Tipografia de Impacto + Biografia + Ações (Inspiração Pedro Braga + Azalim) */}
          <div className="flex flex-col items-start text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm border border-[#2B4231] bg-[#142017]/90 text-xs font-mono tracking-wide text-[#ECE5D8] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84B18F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#628E6E]"></span>
              </span>
              <span>{personal.availability}</span>
            </div>

            {/* Headline com Tipografia Fluida (Inspiração Pedro Braga) */}
            <div className="space-y-3 mb-6">
              <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#84B18F]">
                Olá, eu me chamo
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FAF7F2] leading-[1.05]">
                {personal.name}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-[#B8ADA0] tracking-tight">
                {personal.role} <span className="text-[#3A5742]">/</span>{' '}
                <span className="text-[#ECE5D8] font-normal">{personal.subtitle}</span>
              </p>
            </div>

            {/* Apresentação Concisa */}
            <p className="text-base sm:text-lg text-[#B8ADA0] leading-relaxed max-w-2xl mb-8">
              Desenvolvo interfaces contemporâneas e arquiteturas web escaláveis, unindo{' '}
              <strong className="text-[#FAF7F2] font-semibold">performance técnica</strong>,{' '}
              <strong className="text-[#FAF7F2] font-semibold">design limpo</strong> e{' '}
              atenção meticulosa aos detalhes.
            </p>

            {/* Grupo de Ações Principais */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-medium tracking-wide bg-[#2B4231] text-[#FAF7F2] hover:bg-[#3A5742] hover:shadow-lg hover:shadow-[#1F3023]/50 border border-[#4B6F55] transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#A7CCAF]" />
                Ver Projetos Selecionados
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-medium tracking-wide bg-[#111613] text-[#ECE5D8] hover:text-[#FAF7F2] hover:bg-[#18221B] border border-[#232E25] hover:border-[#3A5742] transition-all"
              >
                <Mail className="w-4 h-4 text-[#84B18F]" />
                Falar Comigo
              </a>
            </div>

            {/* Links Sociais em Pílulas Técnicas */}
            <div className="pt-6 border-t border-[#1C261E] w-full flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8F877C] mr-2">
                Conectar:
              </span>

              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#232E25] bg-[#111613] text-xs font-mono text-[#B8ADA0] hover:text-[#FAF7F2] hover:border-[#4B6F55] hover:bg-[#152218] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#84B18F]" />
                  <span>GitHub</span>
                </a>
              )}

              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#232E25] bg-[#111613] text-xs font-mono text-[#B8ADA0] hover:text-[#FAF7F2] hover:border-[#4B6F55] hover:bg-[#152218] transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#84B18F]" />
                  <span>LinkedIn</span>
                </a>
              )}

              {personal.social.email && (
                <a
                  href={`mailto:${personal.social.email}`}
                  aria-label="E-mail"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#232E25] bg-[#111613] text-xs font-mono text-[#B8ADA0] hover:text-[#FAF7F2] hover:border-[#4B6F55] hover:bg-[#152218] transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#84B18F]" />
                  <span>E-mail</span>
                </a>
              )}

              {personal.social.instagram && (
                <a
                  href={personal.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#232E25] bg-[#111613] text-xs font-mono text-[#B8ADA0] hover:text-[#FAF7F2] hover:border-[#4B6F55] hover:bg-[#152218] transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#84B18F]" />
                  <span>Instagram</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center lg:justify-start lg:ml-[18rem]">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#8F877C] hover:text-[#A7CCAF] transition-colors"
          >
            <span>Explorar Trajetória</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
