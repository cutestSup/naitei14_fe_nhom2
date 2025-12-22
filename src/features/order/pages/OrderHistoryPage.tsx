import React, { useEffect, useState } from 'react';
// OrderHistoryPage component
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getOrders, cancelOrder } from '@/apis/orders';
import { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { OrderList } from '../components/OrderList';
import { Pagination } from '@/components/ui/Pagination';
import { ConfirmationModal } from '@/components/ui';

const ITEMS_PER_PAGE = 5;

export const OrderHistoryPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, total } = await getOrders(user.id, currentPage, ITEMS_PER_PAGE);
      setOrders(data);
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }

    fetchOrders();
  }, [user, isLoggedIn, navigate, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  const handleCancelOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const confirmCancelOrder = async () => {
    if (!selectedOrderId) return;

    try {
      setIsCancelling(true);
      await cancelOrder(selectedOrderId);
      await fetchOrders();
      setIsCancelModalOpen(false);
      setSelectedOrderId(null);
    } catch (err) {
      console.error(err);
      alert('Không thể hủy đơn hàng');
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

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center text-red-500">{error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 uppercase">Lịch sử đơn hàng</h1>
      <div className="max-w-4xl mx-auto">
        <OrderList orders={orders} onCancelOrder={handleCancelOrder} />
        
        {orders.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setSelectedOrderId(null);
        }}
        onConfirm={confirmCancelOrder}
        title="Hủy đơn hàng"
        message="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
        confirmText={isCancelling ? "Đang xử lý..." : "Xác nhận hủy"}
        cancelText="Đóng"
        variant="danger"
      />
    </Container>
  );
};
