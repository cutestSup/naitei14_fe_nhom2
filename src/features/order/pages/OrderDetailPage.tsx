import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById, cancelOrder } from '@/apis/orders';
import { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { ConfirmationModal } from '@/components/ui';
import { LOCALE, VAT_RATE } from '@/constants/common';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
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
        
        // Verify ownership
        if (user && data.userId !== user.id) {
          setError('Bạn không có quyền xem đơn hàng này');
          return;
        }
        
        setOrder(data);
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id, user, isLoggedIn, navigate]);

  const handleCancelOrder = async () => {
    if (!order) return;

    try {
      setIsCancelling(true);
      await cancelOrder(order.id);
      const updatedOrder = await getOrderById(order.id);
      setOrder(updatedOrder);
      setIsCancelModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Không thể hủy đơn hàng');
    } finally {
      setIsCancelling(false);
    }
  };

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
          <div className="text-red-500 mb-4">{error || 'Không tìm thấy đơn hàng'}</div>
          <Link to="/orders" className="text-green-primary hover:underline">
            Quay lại danh sách đơn hàng
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-green-primary transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Chi tiết đơn hàng #{order.id.slice(0, 8)}
            </h1>
            <p className="text-sm text-gray-500">
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')} {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
            {order.status === 'pending' && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Hủy đơn hàng
              </button>
            )}
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shipping Info */}
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ nhận hàng</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <p><span className="font-medium text-gray-700">Người nhận:</span> {order.shippingInfo.fullName}</p>
                <p><span className="font-medium text-gray-700">Số điện thoại:</span> {order.shippingInfo.phone}</p>
                <p><span className="font-medium text-gray-700">Email:</span> {order.shippingInfo.email}</p>
                <p><span className="font-medium text-gray-700">Địa chỉ:</span> {order.shippingInfo.address}</p>
                {order.shippingInfo.city && <p><span className="font-medium text-gray-700">Thành phố:</span> {order.shippingInfo.city}</p>}
                {order.shippingInfo.note && <p><span className="font-medium text-gray-700">Ghi chú:</span> {order.shippingInfo.note}</p>}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                      <img 
                        src={item.productImage} 
                        alt={item.productName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {item.productName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Đơn giá: {item.price.toLocaleString(LOCALE)} ₫
                      </p>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {(item.price * item.quantity).toLocaleString(LOCALE)} ₫
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan đơn hàng</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính (Chưa thuế)</span>
                  <span>
                    {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString(LOCALE)} ₫
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Thuế (VAT {VAT_RATE * 100}%)</span>
                  <span>
                    {Math.round(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * VAT_RATE).toLocaleString(LOCALE)} ₫
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Tổng cộng</span>
                  <span className="font-bold text-xl text-green-600">
                    {order.totalAmount.toLocaleString(LOCALE)} ₫
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Phương thức thanh toán</h3>
                <p className="text-sm text-gray-600">
                  {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelOrder}
        title="Hủy đơn hàng"
        message="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
        confirmText={isCancelling ? "Đang xử lý..." : "Xác nhận hủy"}
        cancelText="Đóng"
        variant="danger"
      />
    </Container>
  );
};
