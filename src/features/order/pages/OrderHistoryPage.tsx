import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getOrders } from '@/apis/orders';
import { Order } from '@/types/order';
import { Container } from '@/components/ui/Container';
import { OrderList } from '../components/OrderList';

export const OrderHistoryPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const data = await getOrders(user.id);
        setOrders(data);
      } catch (err) {
        setError('Không thể tải danh sách đơn hàng');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, isLoggedIn, navigate]);

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
        <OrderList orders={orders} />
      </div>
    </Container>
  );
};
