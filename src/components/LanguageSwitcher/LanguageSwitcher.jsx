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
      className={`inline-flex h-9 items-center gap-0.5 p-0.5 rounded-md bg-ink border border-cream/15 shadow-xs ${className}`}
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
            className={`inline-flex h-full items-center gap-1.5 px-2.5 rounded-[5px] text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-moss/50 ${
              active
                ? "bg-moss text-ink shadow-xs"
                : "text-cream/70 hover:text-cream hover:bg-cream/8"
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
