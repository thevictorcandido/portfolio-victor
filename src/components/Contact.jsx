import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Copy, Check, Send, ArrowUpRight, MessageSquare, Loader2, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon, LinkedinIcon } from './Icons'
import { ReCaptcha } from './ui/recaptcha'
import { portfolioData } from '../data/portfolioData'
import EMAILJS_CONFIG, { isEmailjsConfigured } from '../config/emailjsConfig'
import { RECAPTCHA_SITE_KEY } from '../config/recaptchaConfig'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const { personal } = portfolioData
  const [copied, setCopied] = useState(false)
  // idle | captcha (caixa não marcada) | sending | success | error
  const [status, setStatus] = useState('idle')
  const captchaRef = useRef(null)

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

    // O widget do reCAPTCHA preenche o campo oculto g-recaptcha-response dentro do form
    const params = Object.fromEntries(new FormData(form))
    if (RECAPTCHA_SITE_KEY && !params['g-recaptcha-response']) {
      setStatus('captcha')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        params,
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
      )
      form.reset()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Falha ao enviar mensagem pelo EmailJS:', err)
      setStatus('error')
    } finally {
      // Cada token do reCAPTCHA vale para um único envio
      captchaRef.current?.reset()
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cream/55 mb-3">
            <span>06</span>
            <span className="w-8 h-px bg-cream/25" />
            <span>{t('contact.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-cream tracking-tight leading-tight">
            {t('contact.headline')} <br />
            <span className="font-display font-light text-moss italic inline-block mt-1">
              {t('contact.headlineHighlight')}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Texto Convidativo & Ações Rápidas */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-cream mb-4">
                {t('contact.headline')} {t('contact.headlineHighlight')}
              </h3>
              <p className="text-base text-cream/70 leading-relaxed font-normal">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Card de Email Direto com Cópia Rápida */}
            <div className="p-6 rounded-3xl bg-ink-raised border border-cream/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cream/8 flex items-center justify-center text-cream shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-cream/45 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm sm:text-base font-bold font-display text-cream break-all">
                    {personal.social?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-cream/8 hover:bg-cream/12 text-cream transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-moss" />
                    <span className="text-moss">{t('contact.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cream/55" />
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
                  className="p-4 rounded-2xl bg-ink-raised border border-cream/10 hover:border-cream/20 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-cream" />
                    <span className="text-xs font-semibold text-cream">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cream/45 group-hover:text-cream transition-colors" />
                </a>
              )}

              {personal.social?.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-ink-raised border border-cream/10 hover:border-cream/20 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-cream" />
                    <span className="text-xs font-semibold text-cream">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cream/45 group-hover:text-cream transition-colors" />
                </a>
              )}
            </div>

            {/* Disponibilidade */}
            <div className="flex items-center gap-2 text-xs text-cream/55 font-medium">
              <span className="w-2 h-2 rounded-full bg-moss" />
              <span>{t('contact.locationValue')}</span>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Mensagem */}
          <div className="p-8 sm:p-10 rounded-3xl bg-ink-raised border border-cream/10 shadow-md shadow-black/30">
            <h4 className="text-xl font-display font-bold text-cream mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cream/80" />
              {t('contact.headline')}
            </h4>
            <p className="text-xs text-cream/55 mb-6 font-normal">
              {t('contact.subtitle')}
            </p>

            {status === 'success' ? (
              <div role="status" className="p-8 rounded-2xl bg-moss/10 border border-moss/40 text-center space-y-2 animate-in fade-in">
                <Check className="w-8 h-8 text-moss mx-auto" />
                <p className="text-sm font-bold text-cream">
                  {t('contact.successTitle')}
                </p>
                <p className="text-xs text-cream/75">
                  {t('contact.successText')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-cream/80 mb-1.5"
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
                    className="w-full px-4 py-3 rounded-2xl bg-ink border border-cream/15 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-moss transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-cream/80 mb-1.5"
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
                    className="w-full px-4 py-3 rounded-2xl bg-ink border border-cream/15 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-moss transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-cream/80 mb-1.5"
                  >
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-2xl bg-ink border border-cream/15 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-moss transition-all resize-none"
                  />
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <div>
                    <ReCaptcha
                      ref={captchaRef}
                      siteKey={RECAPTCHA_SITE_KEY}
                      hl={i18n.resolvedLanguage}
                      onVerify={() => setStatus((s) => (s === 'captcha' ? 'idle' : s))}
                      onError={() => setStatus('error')}
                    />
                    {status === 'captcha' && (
                      <p role="alert" className="mt-2 text-xs font-medium text-red-400">
                        {t('contact.captchaRequired')}
                      </p>
                    )}
                  </div>
                )}

                {status === 'error' && (
                  <div role="alert" className="p-4 rounded-2xl bg-red-500/10 border border-red-400/30 flex gap-2.5 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-px" />
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
                  className="w-full py-3.5 rounded-full font-semibold text-sm bg-cream text-ink hover:bg-white transition-all shadow-xs hover:shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100"
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
