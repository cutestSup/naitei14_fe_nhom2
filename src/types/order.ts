export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  note?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled' | 'completed';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  paymentMethod: 'cod' | 'banking';
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  /**
   * @deprecated Use updatedAt instead. For backward compatibility with historical data.
   */
  completedAt?: string;
}

