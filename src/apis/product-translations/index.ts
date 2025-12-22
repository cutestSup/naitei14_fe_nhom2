import { API_BASE_URL } from "@/constants/common";

/**
 * Product translation data structure.
 * 
 * NOTE: Only product information is translated (name, description, category, tags).
 * Reviews/comments are NOT translated as they are user-generated content.
 */
export interface ProductTranslationData {
  productId: number;
  lang: "vi" | "en";
  name?: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  category?: string;
  tags?: string[];
}

export interface ProductTranslationsResponse {
  [productId: number]: {
    vi?: Omit<ProductTranslationData, "productId" | "lang">;
    en?: Omit<ProductTranslationData, "productId" | "lang">;
  };
}

/**
 * Get all product translations for a specific language
 * @param lang Language code (vi or en)
 * @returns Product translations mapped by product ID
 */
export const getProductTranslations = async (
  lang: "vi" | "en" = "vi"
): Promise<ProductTranslationsResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product-translations?lang=${lang}`
    );

    if (!response.ok) {
      // If endpoint doesn't exist yet, return empty object
      if (response.status === 404) {
        console.warn(
          "Product translations endpoint not found. Using default translations."
        );
        return {};
      }
      throw new Error(
        `Failed to fetch product translations: ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Transform array format to object format if needed
    // Backend might return: [{productId: 1, lang: 'en', name: '...'}, ...]
    // We need: {1: {en: {name: '...'}}}
    if (Array.isArray(data)) {
      const transformed: ProductTranslationsResponse = {};
      data.forEach((item: ProductTranslationData) => {
        if (!transformed[item.productId]) {
          transformed[item.productId] = {};
        }
        const { productId, lang: itemLang, ...translation } = item;
        transformed[item.productId][itemLang] = translation;
      });
      return transformed;
    }
    
    // If already in object format, return as is
    return data;
  } catch (error) {
    console.warn("Error fetching product translations:", error);
    return {};
  }
};

/**
 * Get translations for a specific product
 * @param productId Product ID
 * @param lang Language code (vi or en)
 * @returns Product translation data
 */
export const getProductTranslationById = async (
  productId: number,
  lang: "vi" | "en" = "vi"
): Promise<ProductTranslationData | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product-translations/${productId}?lang=${lang}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(
        `Failed to fetch product translation: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.warn(`Error fetching translation for product ${productId}:`, error);
    return null;
  }
};

/**
 * Create or update product translation
 * @param translation Translation data
 * @returns Created/updated translation
 */
export const saveProductTranslation = async (
  translation: ProductTranslationData
): Promise<ProductTranslationData> => {
  const response = await fetch(
    `${API_BASE_URL}/product-translations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translation),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to save product translation: ${response.statusText}`
    );
  }

  return await response.json();
};

/**
 * Update product translation
 * @param productId Product ID
 * @param lang Language code
 * @param translation Translation data
 * @returns Updated translation
 */
export const updateProductTranslation = async (
  productId: number,
  lang: "vi" | "en",
  translation: Omit<ProductTranslationData, "productId" | "lang">
): Promise<ProductTranslationData> => {
  const response = await fetch(
    `${API_BASE_URL}/product-translations/${productId}/${lang}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        lang,
        ...translation,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update product translation: ${response.statusText}`
    );
  }

  return await response.json();
};

/**
 * Delete product translation
 * @param productId Product ID
 * @param lang Language code
 */
export const deleteProductTranslation = async (
  productId: number,
  lang: "vi" | "en"
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/product-translations/${productId}/${lang}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to delete product translation: ${response.statusText}`
    );
  }
};

