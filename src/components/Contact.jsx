import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare, Loader2, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon, LinkedinIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'
import EMAILJS_CONFIG, { isEmailjsConfigured } from '../config/emailjsConfig'

export default function Contact() {
  const { t } = useTranslation()
  const { personal } = portfolioData
  const [copied, setCopied] = useState(false)
  // idle | sending | success | error
  const [status, setStatus] = useState('idle')

  const handleCopyEmail = () => {
    if (personal.social?.email) {
      navigator.clipboard.writeText(personal.social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!isEmailjsConfigured) {
      console.error('EmailJS não configurado: defina VITE_EMAILJS_* em .env.local')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        Object.fromEntries(new FormData(form)),
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
      )
      form.reset()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Falha ao enviar mensagem pelo EmailJS:', err)
      setStatus('error')
    }
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
            <span>{t('contact.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
            {t('contact.headline')} <br />
            <span className="font-display font-light text-stone-700 italic inline-block mt-1">
              {t('contact.headlineHighlight')}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Texto Convidativo & Ações Rápidas */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mb-4">
                {t('contact.headline')} {t('contact.headlineHighlight')}
              </h3>
              <p className="text-base text-stone-600 leading-relaxed font-normal">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Card de Email Direto com Cópia Rápida */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm sm:text-base font-bold font-display text-stone-900 break-all">
                    {personal.social?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200/80 text-stone-800 transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{t('contact.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>{t('contact.copy')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Redes e Acessos Rápidos */}
            <div className="grid grid-cols-2 gap-3">
              {personal.social?.github && (
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

              {personal.social?.linkedin && (
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
              <span>{t('contact.locationValue')}</span>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Mensagem */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-md shadow-stone-900/5">
            <h4 className="text-xl font-display font-bold text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-stone-700" />
              {t('contact.headline')}
            </h4>
            <p className="text-xs text-stone-500 mb-6 font-normal">
              {t('contact.subtitle')}
            </p>

            {status === 'success' ? (
              <div role="status" className="p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-950">
                  {t('contact.successTitle')}
                </p>
                <p className="text-xs text-emerald-800">
                  {t('contact.successText')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-stone-700 mb-1.5"
                  >
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div role="alert" className="p-4 rounded-2xl bg-red-50 border border-red-200 flex gap-2.5 text-xs text-red-900">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-px" />
                    <p>
                      {t('contact.errorText')}{' '}
                      <a href={`mailto:${personal.social?.email}`} className="font-semibold underline underline-offset-2">
                        {personal.social?.email}
                      </a>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-full font-semibold text-sm bg-stone-950 text-white hover:bg-black transition-all shadow-xs hover:shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100"
                >
                  {status === 'sending' ? (
                    <>
                      <span>{t('contact.sendingBtn')}</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>{t('contact.sendBtn')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
