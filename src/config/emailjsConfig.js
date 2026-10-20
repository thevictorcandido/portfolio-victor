// Credenciais do EmailJS usadas pelo formulário de contato.
// Defina em .env.local (veja .env.example). A Public Key é pública por natureza:
// vai no bundle do navegador e é protegida pelas origens permitidas no painel do EmailJS.
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const isEmailjsConfigured = Object.values(EMAILJS_CONFIG).every(Boolean);

export default EMAILJS_CONFIG;
