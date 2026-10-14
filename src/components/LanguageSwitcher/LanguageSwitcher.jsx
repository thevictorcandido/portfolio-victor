import { useTranslation } from "react-i18next";
import I18N_CONFIG from "../../config/i18nConfig";

/**
 * Seletor de Idiomas (PT / EN)
 * Baseado no componente do repositório DIAW (Prof. João Paulo Aramuni),
 * adaptado com Tailwind CSS e harmonia visual editorial do portfólio.
 */
export default function LanguageSwitcher({ showLabels = true, className = "" }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-white/90 border border-stone-200/80 shadow-2xs backdrop-blur-md ${className}`}
      role="group"
      aria-label={t("switcher.label")}
    >
      {I18N_CONFIG.LANGUAGES.map(({ code, name, short, flag: Flag }) => {
        const active =
          code === current ||
          (current?.startsWith("pt") && code === "pt-BR") ||
          (current?.startsWith("en") && code === "en");

        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            title={active ? name : t("switcher.changeTo", { language: name })}
            onClick={() => i18n.changeLanguage(code)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              active
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:text-stone-950 hover:bg-stone-100/80"
            }`}
          >
            <Flag className="w-3.5 h-auto rounded-2xs shrink-0 shadow-2xs" aria-hidden="true" />
            {showLabels && <span>{short}</span>}
          </button>
        );
      })}
    </div>
  );
}
