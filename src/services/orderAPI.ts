import { Order } from "@/types/order";
import { API_BASE_URL } from "@/constants/common";

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  if (!order.userId) throw new Error('User ID is required');
  if (!order.items || order.items.length === 0) throw new Error('Order items are required');
  if (order.totalAmount <= 0) throw new Error('Invalid total amount');
  if (!order.shippingInfo) throw new Error('Shipping info is required');

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...order,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
};

export const getOrders = async (userId: string | number): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}&_sort=createdAt&_order=desc`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  return response.json();
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.statusText}`);
  }

  return response.json();
};

export const cancelOrder = async (id: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel order: ${response.statusText}`);
  }

  return response.json();
};
