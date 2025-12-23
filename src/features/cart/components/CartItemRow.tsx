import { CartItem } from "@/types/cart";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { TrashIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/i18n";
import { useTranslation } from "@/hooks";
import { useTranslatedProduct } from "@/hooks/useTranslatedProduct";

interface Props {
  item: CartItem;
  onUpdateQuantity: (id: number, val: number) => void;
  onRemove: (id: number) => void;
}

export const CartItemRow = ({ item, onUpdateQuantity, onRemove }: Props) => {
  const { t } = useTranslation();
  
  // Translate product name based on current language
  // This hook automatically re-renders when language changes
  const translatedProduct = useTranslatedProduct(item);
  
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {/* Ảnh */}
      <td className="py-4 px-4 border-r border-gray-200">
        <img 
          src={translatedProduct.image || "/images/placeholder.png"} 
          alt={translatedProduct.name} 
          className="w-24 h-24 object-cover mx-auto" 
        />
      </td>

      {/* Tên sản phẩm */}
      <td className="py-4 px-4 border-r border-gray-200 text-center">
        <h3 className="font-medium text-green-primary uppercase text-sm">{translatedProduct.name}</h3>
      </td>

      {/* Đơn giá */}
      <td className="py-4 px-4 text-center text-gray-600 border-r border-gray-200">
        {formatCurrency(item.price)}
      </td>

      {/* Số lượng */}
      <td className="py-4 px-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <QuantitySelector
            value={item.quantity}
            onChange={(val) => onUpdateQuantity(item.id, val)}
            className="h-8"
          />
        </div>
      </td>

      {/* Thành tiền */}
      <td className="py-4 px-4 text-center text-gray-600 border-r border-gray-200">
        {formatCurrency(item.price * item.quantity)}
      </td>

      {/* Nút xóa */}
      <td className="py-4 px-4 text-center">
        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition" aria-label={t("common.delete")}>
          <TrashIcon className="w-5 h-5 mx-auto" />
        </button>
      </td>
    </tr>
  );
};
