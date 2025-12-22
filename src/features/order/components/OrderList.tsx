import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import { LOCALE } from '@/constants/common';

interface OrderListProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'confirmed':
      return 'text-blue-600 bg-blue-50';
    case 'shipping':
      return 'text-purple-600 bg-purple-50';
    case 'delivered':
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý';
    case 'confirmed':
      return 'Đã xác nhận';
    case 'shipping':
      return 'Đang giao hàng';
    case 'delivered':
      return 'Đã giao hàng';
    case 'completed':
      return 'Hoàn thành';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

export const OrderList: React.FC<OrderListProps> = ({ orders, onCancelOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
        <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào</p>
        <Link 
          to="/products" 
          className="inline-block px-6 py-2 bg-green-primary text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-4 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to={`/orders/${order.id}`} className="font-medium text-gray-900 hover:text-green-primary transition-colors">
                Đơn hàng #{order.id.slice(0, 8)}
              </Link>
              <span className="text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="p-4">
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={`${order.id}-item-${index}`} className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      x{item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {(item.price * item.quantity).toLocaleString(LOCALE)} ₫
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="text-sm text-gray-500">
                {order.items.length} sản phẩm
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Tổng tiền:</span>
                  <span className="text-lg font-bold text-green-600">
                    {order.totalAmount.toLocaleString(LOCALE)} ₫
                  </span>
                </div>
                {order.status === 'pending' && (
                  <button
                    onClick={() => onCancelOrder(order.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Hủy đơn
                  </button>
                )}
                <Link
                  to={`/orders/${order.id}`}
                  className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
