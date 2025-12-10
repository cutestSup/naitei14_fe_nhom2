import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById, cancelOrder } from '@/apis/orders';
import { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { RenderButton } from '@/components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }

    const fetchOrder = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id, isLoggedIn, navigate]);

  const handleCancelOrder = async () => {
    if (!order || !window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;

    try {
      setIsCancelling(true);
      await cancelOrder(order.id);
      // Refresh order data
      const updatedOrder = await getOrderById(order.id);
      setOrder(updatedOrder);
      alert('Đã hủy đơn hàng thành công');
    } catch (err) {
      alert('Không thể hủy đơn hàng');
      console.error(err);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary"></div>
        </div>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Không tìm thấy đơn hàng'}</p>
          <Link to="/orders">
            <RenderButton variant="outline">Quay lại danh sách</RenderButton>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-green-primary mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Quay lại danh sách
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 uppercase">Chi tiết đơn hàng</h1>
              <p className="text-gray-500 mt-1">Mã đơn hàng: #{order.id}</p>
              <p className="text-gray-500">Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
            </div>
            <OrderStatusBadge status={order.status} className="text-sm px-3 py-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 py-4 border-b last:border-0">
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Đơn giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right font-medium text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-bold text-lg">Tổng cộng</span>
                <span className="font-bold text-xl text-green-primary">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Người nhận</p>
                  <p className="font-medium">{order.shippingInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{order.shippingInfo.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Địa chỉ</p>
                  <p className="font-medium">
                    {order.shippingInfo.address}
                    {order.shippingInfo.city && `, ${order.shippingInfo.city}`}
                  </p>
                </div>
                {order.shippingInfo.note && (
                  <div>
                    <p className="text-gray-500">Ghi chú</p>
                    <p className="font-medium">{order.shippingInfo.note}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Thanh toán</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Phương thức</p>
                  <p className="font-medium uppercase">{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500">Trạng thái</p>
                  <p className="font-medium">
                    {order.status === 'completed' || order.status === 'delivered' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </p>
                </div>
              </div>
            </div>

            {order.status === 'pending' && (
              <RenderButton 
                variant="outline" 
                className="w-full border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleCancelOrder}
                disabled={isCancelling}
              >
                {isCancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
              </RenderButton>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
