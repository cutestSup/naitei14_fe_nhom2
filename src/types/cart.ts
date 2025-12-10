export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}
