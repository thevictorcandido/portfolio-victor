// Site Key do reCAPTCHA v2 (caixa "Não sou um robô"), única versão aceita pelo EmailJS.
// Pública por natureza: vai no bundle. A Secret Key fica só no painel do EmailJS (template → Settings).
// Sem a variável, o formulário envia sem CAPTCHA.
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
