import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import vi from "./locales/vi.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: vi,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: "vi",
    lng: "vi",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Setup product translations loading after i18n is initialized
// This is done in a separate function to avoid circular dependency
i18n.on("initialized", () => {
  // Dynamically import to avoid circular dependency
  import("./utils/productTranslations").then((module) => {
    // Load product translations on initialization
    module.loadProductTranslations(i18n.language).catch((error) => {
      console.warn("Failed to load product translations on init:", error);
    });
  });
});

// Load product translations when language changes
i18n.on("languageChanged", (lng) => {
  // Dynamically import to avoid circular dependency
  import("./utils/productTranslations").then((module) => {
    module.loadProductTranslations(lng).catch((error) => {
      console.warn("Failed to load product translations on language change:", error);
    });
  });
});

export default i18n;

