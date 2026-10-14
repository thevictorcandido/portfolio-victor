import { useState } from 'react'
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
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
      className="py-24 md:py-32 relative bg-[#FAF8F5]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
            <span>06</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>Contato & Parcerias</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            Vamos conversar? <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              Aberto para projetos & oportunidades.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Texto Convidativo & Ações Rápidas */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mb-4">
                Tem uma ideia, desafio técnico ou vaga em vista?
              </h3>
              <p className="text-base text-stone-600 leading-relaxed font-normal">
                Estou sempre entusiasmado para discutir novas oportunidades de estágio,
                desenvolvimento de produtos, projetos acadêmicos ou colaborações no ecossistema de software.
              </p>
            </div>

            {/* Cartão de Copiar E-mail */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    E-mail direto
                  </p>
                  <a
                    href={`mailto:${personal.social.email}`}
                    className="text-sm font-semibold text-stone-900 hover:underline"
                  >
                    {personal.social.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-600" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Redes Sociais em Cartões Leves */}
            <div className="grid grid-cols-2 gap-3.5">
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-stone-800" />
                    <span className="text-xs font-semibold text-stone-800">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </a>
              )}

              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-stone-800" />
                    <span className="text-xs font-semibold text-stone-800">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </a>
              )}
            </div>

            {/* Disponibilidade */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Resposta costumeira em poucas horas. Localizado em Belo Horizonte / Nova Lima, MG.</span>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Mensagem */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-md shadow-stone-900/5">
            <h4 className="text-xl font-display font-bold text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-stone-700" />
              Envie uma mensagem direta
            </h4>
            <p className="text-xs text-stone-500 mb-6 font-normal">
              Preencha os campos abaixo para iniciar o contato.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-950">
                  Mensagem recebida com sucesso!
                </p>
                <p className="text-xs text-emerald-800">
                  Obrigado pelo contato! Responderei em breve no seu e-mail.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    Seu Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ex: Maria Clara"
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    Seu E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Ex: maria@empresa.com"
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Conte sobre sua ideia, desafio ou projeto..."
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-950 hover:bg-black text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-stone-300" />
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
