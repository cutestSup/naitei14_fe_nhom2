import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types/product'
import { StarRating } from '@/components/ui/StarRating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { RenderSocialShareButtons } from '@/components/ui/SocialShareButtons'
import { RenderButton } from '@/components/ui/Button'
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { CLASS_ICON_SIZE_MD, MESSAGE_ADD_FAVORITE, MESSAGE_REMOVE_FAVORITE, CLASS_FLEX_ITEMS_GAP3, CLASS_ICON_BUTTON_ROUND } from '@/constants/common'
import { useTranslation } from '@/hooks'
import { formatCurrency } from '@/i18n'
import { cn } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  const handleBuyNow = () => {
    addToCart(product, quantity)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implement favorite functionality
  }

  const handleQuickView = () => {
    // TODO: Implement quick view modal
    // Implementation pending
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>

      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} size="lg" />
      </div>

      <div className={CLASS_FLEX_ITEMS_GAP3}>
        <span className="text-3xl font-bold text-green-primary">
          {formatCurrency(product.price)}
        </span>
        {product.oldPrice && product.oldPrice !== product.price && (
          <span className="text-xl text-gray-400 line-through">
            {formatCurrency(product.oldPrice)}
          </span>
        )}
      </div>

      {product.shortDescription && (
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>{product.shortDescription}</p>
        </div>
      )}

      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        max={product.stock || 999}
      />

      <div className={CLASS_FLEX_ITEMS_GAP3}>
        <RenderButton
          variant="primary"
          size="lg"
          onClick={handleBuyNow}
          className="flex-1"
        >
          {t("products.buyNow").toUpperCase()}
        </RenderButton>
        <button
          onClick={handleQuickView}
          className={CLASS_ICON_BUTTON_ROUND}
          aria-label={t("products.viewDetails")}
        >
          <MagnifyingGlassIcon className={CLASS_ICON_SIZE_MD} />
        </button>
        <button
          onClick={handleToggleFavorite}
          className={CLASS_ICON_BUTTON_ROUND}
          aria-label={isFavorite ? t(MESSAGE_REMOVE_FAVORITE) : t(MESSAGE_ADD_FAVORITE)}
        >
          {isFavorite ? (
            <HeartIconSolid className={cn(CLASS_ICON_SIZE_MD, 'text-red-500')} />
          ) : (
            <HeartIcon className={CLASS_ICON_SIZE_MD} />
          )}
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("social.share")}:</p>
        <RenderSocialShareButtons
          title={product.name}
          description={`${product.shortDescription || product.description || ''} - ${t("common.price")}: ${formatCurrency(product.price)}`}
          image={product.image}
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
      </div>
    </div>
  )
}

