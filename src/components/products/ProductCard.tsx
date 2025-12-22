import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types/product";
import {
  MAX_RATING,
  DEFAULT_RATING,
  CLASS_ICON_SIZE_MD,
  CLASS_ICON_SIZE_MD_GRAY,
  MESSAGE_REMOVE_FAVORITE,
  MESSAGE_ADD_FAVORITE,
} from '@/constants/common'
import { useTranslation } from '@/hooks'
import { formatCurrency } from '@/i18n'
import {
  MagnifyingGlassIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

const CLASS_ICON_BUTTON =
  "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-1.5 md:p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center";
const CLASS_ICON_BUTTON_HOVER =
  "bg-white p-2 md:p-3 rounded-full hover:bg-green-primary hover:text-white transition-colors";

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
  variant?: "home" | "default";
}

export const ProductCard = ({ product, isLarge = false, variant = 'default' }: ProductCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const isHomeVariant = variant === 'home'

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleQuickView = () => {
    // TODO: Open quick view modal
    // Implementation pending
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add to favorites
    // Implementation pending
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleProductClick();
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-2 md:p-4 relative group h-full ${
        isLarge ? "flex flex-col" : ""
      }`}
      onMouseEnter={() => isHomeVariant && setIsHovered(true)}
      onMouseLeave={() => isHomeVariant && setIsHovered(false)}
      onFocus={() => isHomeVariant && setIsHovered(true)}
      onBlur={() => isHomeVariant && setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {product.isNew && <Badge variant="new">NEW</Badge>}
      {product.discountPercent && !product.isNew && (
        <Badge variant="discount" discountPercent={product.discountPercent}>
          {product.discountPercent}%
        </Badge>
      )}

      <div
        className={`relative mb-2 md:mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center ${
          isLarge ? "aspect-[4/5] min-h-0" : "aspect-square"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {isHomeVariant && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 items-center justify-center gap-3 transition-opacity duration-300 hidden md:flex ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleBuyNow}
              className="bg-white text-green-primary px-4 py-2 rounded-md hover:bg-green-primary hover:text-white transition-colors font-semibold text-sm"
              aria-label={t("products.buyNow")}
            >
              {t("products.buyNow").toUpperCase()}
            </button>
            <button
              onClick={handleQuickView}
              className={CLASS_ICON_BUTTON_HOVER}
              aria-label={t("products.viewDetails")}
            >
              <MagnifyingGlassIcon className={CLASS_ICON_SIZE_MD} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={CLASS_ICON_BUTTON_HOVER}
              aria-label={isFavorite ? t(MESSAGE_REMOVE_FAVORITE) : t(MESSAGE_ADD_FAVORITE)}
            >
              {isFavorite ? (
                <HeartIconSolid className={CLASS_ICON_SIZE_MD} />
              ) : (
                <HeartIcon className={CLASS_ICON_SIZE_MD} />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="text-center w-full">
        <h3
          className="text-sm md:text-base font-semibold text-gray-800 dark:text-white mb-1 md:mb-2 line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-green-primary transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-0.5 md:gap-1 mb-2 md:mb-3">
          {[...Array(MAX_RATING)].map((_, i) => {
            const rating = product.rating ?? DEFAULT_RATING;
            const isFilled = i < Math.floor(rating);
            return isFilled ? (
              <StarIconSolid
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 text-yellow-400"
              />
            ) : (
              <StarIcon
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 text-gray-300"
              />
            );
          })}
        </div>

        {!isHomeVariant && product.description && (
          <p className="hidden md:block text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 px-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-base md:text-lg font-bold text-green-primary">
            {formatCurrency(product.price)}
          </span>
          {product.oldPrice && product.oldPrice !== product.price && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>

        {!isHomeVariant && (
          <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-3">
            <button
              onClick={handleBuyNow}
              className="bg-green-primary text-white px-2 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-green-dark transition-colors font-semibold text-xs md:text-sm flex-1 whitespace-nowrap"
              aria-label={t("products.buyNow")}
            >
              {t("products.buyNow").toUpperCase()}
            </button>
            <button
              onClick={handleQuickView}
              className={CLASS_ICON_BUTTON}
              aria-label={t("products.viewDetails")}
            >
              <MagnifyingGlassIcon className={`${CLASS_ICON_SIZE_MD_GRAY} w-4 h-4 md:w-5 md:h-5 text-gray-500`} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={CLASS_ICON_BUTTON}
              aria-label={isFavorite ? t(MESSAGE_REMOVE_FAVORITE) : t(MESSAGE_ADD_FAVORITE)}
            >
              {isFavorite ? (
                <HeartIconSolid className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
