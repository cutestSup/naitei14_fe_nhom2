import { useMemo } from "react";
import { Product } from "@/types/product";
import { translateProduct } from "@/i18n/utils/productTranslations";
import { useTranslation } from "@/hooks";

/**
 * Hook to get translated product based on current language
 * Automatically updates when language changes
 */
export const useTranslatedProduct = (product: Product): Product => {
  const { currentLanguage } = useTranslation();
  
  return useMemo(() => {
    return translateProduct(product);
  }, [product, currentLanguage]);
};


