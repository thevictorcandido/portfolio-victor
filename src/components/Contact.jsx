import { useState } from 'react'
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export default function Contact() {
  const { personal } = portfolioData
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleCopyEmail = () => {
    if (personal.social.email) {
      navigator.clipboard.writeText(personal.social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative bg-[#0C0F0D] border-b border-[#232E25]/60 bg-tech-grid"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-dashed border-[#232E25]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#84B18F] tracking-widest uppercase mb-2">
              <span>06</span>
              <span className="w-6 h-px bg-[#3A5742]" />
              <span>Vamos Conversar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84B18F] inline-block mr-3" />
              Contato & Parcerias
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8F877C] tracking-wider uppercase">
            Aberto para novas oportunidades
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Texto de Impacto + Copiar Email + Links */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF7F2] tracking-tight mb-4">
                Tem um projeto em mente ou quer bater um papo?
              </h3>
              <p className="text-base text-[#B8ADA0] leading-relaxed">
                Estou sempre aberto para discutir novas ideias, oportunidades de trabalho, colaborações em projetos de código aberto ou desafios técnicos instigantes.
              </p>
            </div>

            {/* Caixa de Ação Rápida de E-mail */}
            <div className="p-5 rounded-sm border border-[#2B4231] bg-[#142017]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[#1F3023] text-[#84B18F] border border-[#3A5742]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#8F877C]">
                    E-mail direto
                  </p>
                  <a
                    href={`mailto:${personal.social.email}`}
                    className="text-sm font-mono font-medium text-[#FAF7F2] hover:text-[#84B18F] transition-colors"
                  >
                    {personal.social.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1A251C] border border-[#3A5742] text-xs font-mono uppercase tracking-wider text-[#FAF7F2] hover:bg-[#2B4231] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#84B18F]" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#84B18F]" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Cards de Redes Sociais */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] hover:bg-[#152218] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-[#84B18F]" />
                    <span className="text-xs font-mono text-[#FAF7F2]">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8F877C] group-hover:text-[#A7CCAF] transition-colors" />
                </a>
              )}

              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-sm border border-[#232E25] bg-[#111613] hover:border-[#3A5742] hover:bg-[#152218] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-[#84B18F]" />
                    <span className="text-xs font-mono text-[#FAF7F2]">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8F877C] group-hover:text-[#A7CCAF] transition-colors" />
                </a>
              )}
            </div>

            {/* Status pill de disponibilidade */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8F877C]">
              <span className="w-2 h-2 rounded-full bg-[#84B18F]" />
              <span>Resposta costumeira em menos de 24 horas.</span>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Mensagem Direta */}
          <div className="p-6 sm:p-8 rounded-sm border border-[#232E25] bg-[#111613]">
            <h4 className="text-lg font-bold text-[#FAF7F2] mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#84B18F]" />
              Envie uma mensagem
            </h4>
            <p className="text-xs text-[#8F877C] mb-6 font-mono">
              Preencha os campos abaixo para iniciar contato.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-sm bg-[#142017] border border-[#2B4231] text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-[#84B18F] mx-auto" />
                <p className="text-sm font-semibold text-[#FAF7F2]">
                  Mensagem simulada enviada com sucesso!
                </p>
                <p className="text-xs text-[#B8ADA0]">
                  Este formulário está estruturado e pronto para você conectar ao Formspree, EmailJS ou ao seu backend.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#B8ADA0] mb-1.5"
                  >
                    Seu Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ex: Ana Silva"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0C0F0D] border border-[#232E25] text-sm text-[#FAF7F2] placeholder-[#5A635D] focus:outline-none focus:border-[#4B6F55] focus:ring-1 focus:ring-[#4B6F55] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#B8ADA0] mb-1.5"
                  >
                    Seu E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Ex: ana@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0C0F0D] border border-[#232E25] text-sm text-[#FAF7F2] placeholder-[#5A635D] focus:outline-none focus:border-[#4B6F55] focus:ring-1 focus:ring-[#4B6F55] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#B8ADA0] mb-1.5"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Conte um pouco sobre sua ideia, vaga ou projeto..."
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0C0F0D] border border-[#232E25] text-sm text-[#FAF7F2] placeholder-[#5A635D] focus:outline-none focus:border-[#4B6F55] focus:ring-1 focus:ring-[#4B6F55] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#2B4231] hover:bg-[#3A5742] text-[#FAF7F2] text-sm font-medium border border-[#4B6F55] transition-all shadow-md shadow-black/30"
                >
                  <Send className="w-4 h-4 text-[#84B18F]" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
