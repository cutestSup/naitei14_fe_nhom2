import { Product } from '@/types/product'
import { 
  API_BASE_URL,
  ERROR_GET_FEATURED_PRODUCTS,
  ERROR_GET_ALL_PRODUCTS,
  ERROR_SEARCH_PRODUCTS,
  ERROR_GET_PRODUCT,
  QUERY_PARAM_PRICE_GTE,
  QUERY_PARAM_PRICE_LTE,
  DEFAULT_CATEGORY,
} from '@/constants/common'
import { ProductError } from '@/lib/errors'
import i18n from '@/i18n/config'
import { translateProduct } from '@/i18n/utils/productTranslations'

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products?_limit=6`)
  
  if (!response.ok) {
    throw new ProductError(ERROR_GET_FEATURED_PRODUCTS)
  }
  
  const products: Product[] = await response.json()
  // Apply translations based on current language
  return products.map(translateProduct)
}

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`)
  
  if (!response.ok) {
    throw new ProductError(ERROR_GET_ALL_PRODUCTS)
  }
  
  const products: Product[] = await response.json()
  // Apply translations based on current language
  return products.map(translateProduct)
}

export interface ProductFilters {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  color?: string
}

export const searchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  const params = new URLSearchParams()
  
  if (filters.search) {
    params.append('q', filters.search)
  }
  
  // Note: We don't filter by category in API query because category might be translated
  // Instead, we'll filter after translation
  
  if (filters.minPrice !== undefined) {
    params.append(QUERY_PARAM_PRICE_GTE, filters.minPrice.toString())
  }
  
  if (filters.maxPrice !== undefined) {
    params.append(QUERY_PARAM_PRICE_LTE, filters.maxPrice.toString())
  }
  
  if (filters.color) {
    params.append('color', filters.color)
  }
  
  const queryString = params.toString()
  const url = queryString 
    ? `${API_BASE_URL}/products?${queryString}`
    : `${API_BASE_URL}/products`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new ProductError(ERROR_SEARCH_PRODUCTS)
  }
  
  let products: Product[] = await response.json()
  
  // Filter by search text if provided (json-server doesn't support full-text search well)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
    )
  }
  
  // Apply translations based on current language
  let translatedProducts = products.map(translateProduct)
  
  // Filter by category after translation (category might be translated)
  if (filters.category) {
    translatedProducts = translatedProducts.filter(
      (product) => product.category === filters.category
    )
  }
  
  return translatedProducts
}

export const getProductById = async (id: number): Promise<Product | null> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new ProductError(ERROR_GET_PRODUCT)
  }
  
  const product: Product = await response.json()
  
  // Generate images array if not exists
  if (!product.images) {
    product.images = [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ]
  }
  
  // Set default values if missing
  if (!product.shortDescription) {
    product.shortDescription = product.description || ''
  }
  
  if (!product.fullDescription) {
    const category = product.category || DEFAULT_CATEGORY
    const t = (key: string) => i18n.t(key)
    product.fullDescription = `
      <p><strong>${t("products.commonName")}:</strong> ${product.name}</p>
      <p><strong>${t("products.scientificName")}:</strong> ${product.name}</p>
      <p><strong>${t("products.plantFamily")}:</strong> ${category}</p>
      <p><strong>${t("products.height")}:</strong> 0,8-1,2m</p>
      <p>${product.description || t("products.highQualityProduct")}</p>
      <p>${t("products.plantOrigin")}</p>
    `
  }

  if (!product.tags) {
    const t = (key: string) => i18n.t(key)
    product.tags = [DEFAULT_CATEGORY, t("products.decorative"), product.category || t("products.popular")]
  }
  
  // Get related products (before translation to avoid infinite loop)
  const allProductsRaw = await fetch(`${API_BASE_URL}/products`).then(res => res.json())
  product.relatedProducts = allProductsRaw
    .filter((p: Product) => p.id !== product.id && (p.category === product.category || Math.random() > 0.5))
    .slice(0, 4)
    .map(translateProduct)
  
  // Apply translations based on current language
  return translateProduct(product)
}

