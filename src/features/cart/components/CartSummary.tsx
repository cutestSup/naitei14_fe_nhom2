import { RenderButton } from "@/components/ui/Button";
import { VAT_RATE } from "@/constants/common";
import { Link } from "react-router-dom";

interface Props {
  totalPrice: number;
}

export const CartSummary = ({ totalPrice }: Props) => {
  const vat = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vat;

  return (
    <div className="w-full max-w-md ml-auto mt-8">
      <div className="border border-gray-200">
        {/* Subtotal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-gray-600 font-medium uppercase text-sm">TỔNG TIỀN ( CHƯA THUẾ )</span>
          <span className="text-gray-600 font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
          </span>
        </div>

        {/* VAT */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <span className="text-gray-600 font-medium uppercase text-sm">THUẾ (VAT 10%)</span>
          <span className="text-gray-600 font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vat)}
          </span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center p-4 bg-green-primary text-white">
          <span className="font-bold uppercase text-sm">TỔNG PHẢI THANH TOÁN</span>
          <span className="font-bold text-lg">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(grandTotal)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Link to="/checkout">
          <RenderButton className="uppercase font-bold py-3 px-8 bg-green-primary hover:bg-green-dark text-white rounded-full transition-colors">
            THANH TOÁN
          </RenderButton>
        </Link>
      </div>
    </div>
  );
};
