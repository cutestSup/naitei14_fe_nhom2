import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import { RenderButton } from '@/components/ui/Button';

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào.</p>
        <Link to="/products">
          <RenderButton>Mua sắm ngay</RenderButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-medium text-gray-900">Đơn hàng #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">
                Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="border-t border-b py-3 my-3 space-y-2">
            {order.items.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <img 
                  src={item.productImage} 
                  alt={item.productName} 
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.productName}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
              </div>
            ))}
            {order.items.length > 2 && (
              <p className="text-xs text-gray-500 text-center pt-1">
                Và {order.items.length - 2} sản phẩm khác...
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tổng tiền</p>
              <p className="font-bold text-green-primary">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
              </p>
            </div>
            <Link to={`/orders/${order.id}`}>
              <RenderButton variant="outline" size="sm">
                Xem chi tiết
              </RenderButton>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
