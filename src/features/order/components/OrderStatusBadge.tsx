import React from 'react';
import { OrderStatus } from '@/types/order';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Chờ xử lý',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  confirmed: {
    label: 'Đã xác nhận',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  shipping: {
    label: 'Đang giao hàng',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  delivered: {
    label: 'Đã giao hàng',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  cancelled: {
    label: 'Đã hủy',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  completed: {
    label: 'Hoàn thành',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
