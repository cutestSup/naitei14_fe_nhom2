export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt?: string;
}