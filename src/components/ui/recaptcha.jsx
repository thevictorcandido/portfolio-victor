import { useEffect, useImperativeHandle, useRef } from 'react'

// Largura do widget no tamanho "normal"; abaixo disso usamos o "compact"
const NORMAL_WIDTH = 304

let loader = null

// Carrega o script do Google uma única vez. O idioma (hl) fica fixo a partir da primeira carga.
function loadRecaptcha(hl) {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha)
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      window.__onRecaptchaLoad = () => resolve(window.grecaptcha)
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit&hl=${encodeURIComponent(hl)}`
      script.async = true
      script.defer = true
      script.onerror = () => {
        loader = null
        reject(new Error('Não foi possível carregar o reCAPTCHA'))
      }
      document.head.appendChild(script)
    })
  }
  return loader
}

/**
 * reCAPTCHA v2 (caixa "Não sou um robô") renderizado explicitamente.
 * O widget cria um campo oculto "g-recaptcha-response" dentro do <form>,
 * que o FormData do formulário já envia ao EmailJS.
 */
export function ReCaptcha({ siteKey, hl, onVerify, onExpire, onError, ref }) {
  const containerRef = useRef(null)
  const widgetId = useRef(null)
  // Versão mais recente das props sem recriar o widget; declarado antes do efeito que renderiza, roda antes dele
  const latest = useRef({})
  useEffect(() => {
    latest.current = { hl, onVerify, onExpire, onError }
  })

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current)
    },
  }), [])

  useEffect(() => {
    let cancelled = false
    // hl entra só na primeira carga do script; trocar de idioma não recria o widget
    loadRecaptcha(latest.current.hl)
      .then((grecaptcha) => {
        const el = containerRef.current
        if (cancelled || !el) return
        widgetId.current = grecaptcha.render(el, {
          sitekey: siteKey,
          size: el.offsetWidth < NORMAL_WIDTH ? 'compact' : 'normal',
          callback: (token) => latest.current.onVerify?.(token),
          'expired-callback': () => latest.current.onExpire?.(),
          'error-callback': () => latest.current.onError?.(),
        })
      })
      .catch(() => {
        if (!cancelled) latest.current.onError?.()
      })
    return () => {
      cancelled = true
      widgetId.current = null
    }
  }, [siteKey])

  return <div ref={containerRef} className="min-h-[78px]" />
}

export default ReCaptcha
