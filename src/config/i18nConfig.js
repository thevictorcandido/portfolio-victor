// Configuração dos idiomas suportados pelo portfólio
// Alinhado com o repositório institucional de DIAW (Prof. João Paulo Aramuni)
import { BR, US } from "country-flag-icons/react/3x2";

const I18N_CONFIG = {
  FALLBACK: import.meta.env.VITE_DEFAULT_LANGUAGE || "pt-BR",
  STORAGE_KEY: "i18nextLng",
  LANGUAGES: [
    { code: "pt-BR", name: "Português", short: "PT", flag: BR },
    { code: "en", name: "English", short: "EN", flag: US },
  ],
};

export default I18N_CONFIG;
