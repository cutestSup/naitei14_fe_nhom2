import { useTranslation as useI18nTranslation } from "react-i18next";
import { useEffect } from "react";
import { loadProductTranslations } from "@/i18n/utils/productTranslations";

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    // Load product translations for the new language
    // Note: i18n.on('languageChanged') in config.ts will also handle this,
    // but we do it here too to ensure it happens synchronously
    loadProductTranslations(lng, true).catch((error) => {
      console.warn("Failed to load product translations:", error);
    });
  };

  const currentLanguage = i18n.language;

  // Load translations when component mounts
  useEffect(() => {
    loadProductTranslations(currentLanguage).catch((error) => {
      console.warn("Failed to load product translations:", error);
    });
  }, [currentLanguage]);

  return {
    t,
    changeLanguage,
    currentLanguage,
    i18n,
  };
};

