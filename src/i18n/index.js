// Configuração do i18next. É importado no main.jsx antes do <App />.
// Baseado na arquitetura do repositório de DIAW (Prof. João Paulo Aramuni)
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import I18N_CONFIG from "../config/i18nConfig";

import en from "./locales/en/translation.json";
import ptBR from "./locales/pt-BR/translation.json";

const resources = {
  "pt-BR": { translation: ptBR },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: I18N_CONFIG.LANGUAGES.map((l) => l.code),
    fallbackLng: I18N_CONFIG.FALLBACK,

    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: I18N_CONFIG.STORAGE_KEY,
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

function syncDocument(lng) {
  document.documentElement.lang = i18n.resolvedLanguage ?? lng;
  if (i18n.isInitialized) {
    document.title = i18n.t("meta.title");
  }
}

i18n.on("languageChanged", syncDocument);
syncDocument(i18n.language);

export default i18n;
