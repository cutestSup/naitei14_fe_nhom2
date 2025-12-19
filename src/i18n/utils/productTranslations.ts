import i18n from "../config";
import { Product } from "@/types/product";
import {
  getProductTranslations,
} from "@/apis/product-translations";

/**
 * Product translations mapping
 * Structure: productId -> { vi: {...}, en: {...} }
 * 
 * Translations are loaded from API and cached in memory.
 * 
 * NOTE: Only product information is translated (name, description, category, tags).
 * Reviews/comments are NOT translated as they are user-generated content.
 */
interface ProductTranslation {
  name?: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  category?: string;
  tags?: string[];
}

type ProductTranslations = {
  [productId: number]: {
    vi?: ProductTranslation;
    en?: ProductTranslation;
  };
};

// Cache for product translations loaded from API
let productTranslations: ProductTranslations = {};

// Track loading state to prevent multiple simultaneous requests
let isLoadingTranslations = false;
const loadedLanguages: Set<string> = new Set();

/**
 * Get translated product field
 * Falls back to original value if translation not found
 */
const getTranslatedField = <T extends string | string[] | undefined>(
  productId: number,
  field: keyof ProductTranslation,
  originalValue: T,
  lang: string = i18n.language || "vi"
): T => {
  const translations = productTranslations[productId];
  if (!translations) return originalValue;

  const langTranslations = translations[lang as "vi" | "en"];
  if (!langTranslations) return originalValue;

  const translatedValue = langTranslations[field];
  if (translatedValue === undefined) return originalValue;

  return translatedValue as T;
};

/**
 * Translate a product based on current language
 * Returns a new product object with translated fields.
 * 
 * NOTE: Only translates product information (name, description, category, tags).
 * Does NOT translate reviews/comments as they are user-generated content.
 */
export const translateProduct = (product: Product): Product => {
  const lang = i18n.language || "vi";
  
  // If language is Vietnamese, return original (assuming data is in Vietnamese)
  if (lang === "vi") {
    return product;
  }

  // For other languages, apply translations
  const translations = productTranslations[product.id];
  if (!translations) {
    return product; // No translations available, return original
  }

  const langTranslations = translations[lang as "vi" | "en"];
  if (!langTranslations) {
    return product;
  }

  return {
    ...product,
    name: langTranslations.name || product.name,
    description: langTranslations.description || product.description,
    shortDescription: langTranslations.shortDescription || product.shortDescription || product.description,
    fullDescription: langTranslations.fullDescription || product.fullDescription,
    category: langTranslations.category || product.category,
    tags: langTranslations.tags || product.tags,
  };
};

/**
 * Translate product name only
 */
export const translateProductName = (product: Product): string => {
  return getTranslatedField(product.id, "name", product.name) || product.name;
};

/**
 * Translate product description only
 */
export const translateProductDescription = (product: Product): string | undefined => {
  return getTranslatedField(product.id, "description", product.description);
};

/**
 * Load product translations from API
 * This function is called automatically when language changes
 * @param lang Language code (optional, defaults to current i18n language)
 * @param forceReload Force reload even if already loaded
 */
export const loadProductTranslations = async (
  lang?: string,
  forceReload: boolean = false
): Promise<void> => {
  const targetLang = lang || i18n.language || "vi";

  // Skip if already loaded and not forcing reload
  if (!forceReload && loadedLanguages.has(targetLang)) {
    return;
  }

  // Prevent multiple simultaneous requests
  if (isLoadingTranslations) {
    return;
  }

  isLoadingTranslations = true;

  try {
    const translations = await getProductTranslations(
      targetLang as "vi" | "en"
    );

    // Merge translations into cache
    Object.keys(translations).forEach((productId) => {
      const id = parseInt(productId, 10);
      if (!productTranslations[id]) {
        productTranslations[id] = {};
      }
      productTranslations[id][targetLang as "vi" | "en"] =
        translations[id][targetLang as "vi" | "en"];
    });

    loadedLanguages.add(targetLang);
    console.log(
      `Product translations loaded for language: ${targetLang}`,
      Object.keys(translations).length,
      "products"
    );
  } catch (error) {
    console.warn("Failed to load product translations:", error);
  } finally {
    isLoadingTranslations = false;
  }
};

/**
 * Load translations for all supported languages
 */
export const loadAllProductTranslations = async (): Promise<void> => {
  await Promise.all([
    loadProductTranslations("vi"),
    loadProductTranslations("en"),
  ]);
};

/**
 * Clear translation cache
 * Useful for testing or when you want to force reload
 */
export const clearProductTranslationsCache = (): void => {
  productTranslations = {};
  loadedLanguages.clear();
};

/**
 * Add or update product translations manually
 * Useful for admin panel or when adding new products
 * Note: This only updates the cache. To persist, use API functions from @/apis/product-translations
 */
export const setProductTranslation = (
  productId: number,
  lang: "vi" | "en",
  translation: ProductTranslation
): void => {
  if (!productTranslations[productId]) {
    productTranslations[productId] = {};
  }
  productTranslations[productId][lang] = translation;
};

/**
 * Get current translation cache (for debugging)
 */
export const getProductTranslationsCache = (): ProductTranslations => {
  return { ...productTranslations };
};


