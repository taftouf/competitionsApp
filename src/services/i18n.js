import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { format as formatDate, isDate, formatDistance, formatRelative } from "date-fns";
import { enUS as en, es, fr, pt, it, de } from "date-fns/locale"; // import all locales we need

const locales = { en, es, fr, pt, it, de };

i18next
  .use(initReactI18next)
  .use(HttpApi) // Registering the back-end plugin
  .use(LanguageDetector) // Registering the detection plugin
  .init({
    // Remove resources from here
    interpolation: {
      escapeValue: false,

      format: (value, format, lng) => {
				if (isDate(value)) {
					const locale = locales[lng];
					if (format === "init")
						return formatDate(value, "PPP", { locale });
					if (format === "short")
						return formatDate(value, "P", { locale });
					if (format === "long")
						return formatDate(value, "PPPP", { locale });
					if (format === "relative")
						return formatRelative(value, new Date(), { locale });
					if (format === "ago")
						return formatDistance(value, new Date(), {
							locale,
							addSuffix: true
						});

					return formatDate(value, format, { locale });
				}

				return value;
			}
    },
  });

export default i18next;