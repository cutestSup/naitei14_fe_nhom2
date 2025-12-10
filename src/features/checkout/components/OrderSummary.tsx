import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { VAT_RATE } from '@/constants/common';

export const OrderSummary: React.FC = () => {
  const { cart, totalPrice } = useCart();
  const vat = totalPrice * VAT_RATE;
  const grandTotal = totalPrice + vat;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-green-primary uppercase">Đơn hàng của bạn</h3>
      
      <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-start text-sm">
            <div className="flex gap-3">
              <div className="w-12 h-12 flex-shrink-0 border border-gray-200 rounded overflow-hidden">
                <img src={item.image || "/images/placeholder.png"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-gray-800 line-clamp-2">{item.name}</p>
                <p className="text-gray-500">x {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium text-gray-700">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (10%)</span>
          <span className="font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vat)}
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-green-primary pt-2 border-t border-gray-200">
          <span>Tổng cộng</span>
          <span>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
