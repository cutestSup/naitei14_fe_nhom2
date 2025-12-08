// productsIndex.ts
import { Product } from "../../features/admin/products/types";

const STORAGE_KEY = "mockProducts";

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Cây Kim Tiền",
    price: 150000,
    stock: 20,
    categoryId: 1,
    description: "Mang lại tài lộc cho gia chủ.",
    thumbnail: "https://placehold.co/100",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    id: 2,
    name: "Cây Lưỡi Hổ",
    price: 120000,
    stock: 15,
    categoryId: 2,
    description: "Thanh lọc không khí cực tốt.",
    createdAt: "2024-01-12T09:30:00Z",
    updatedAt: "2024-01-12T09:30:00Z",
  },
  {
    id: 3,
    name: "Cây Trầu Bà",
    price: 80000,
    stock: 30,
    categoryId: 1,
    description: "Dễ trồng, phát triển nhanh.",
    createdAt: "2024-01-15T14:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z",
  },
];

let mockProducts: Product[] =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultProducts;

const saveToStorage = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));

const getCurrentTimestamp = () => new Date().toISOString();

export const productsApi = {
  getAll: async (): Promise<Product[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockProducts), 100)),

  getDetail: async (id: number): Promise<Product | null> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id);
        resolve(product || null);
      }, 100)
    ),

  create: async (data: Partial<Product>): Promise<Product> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const now = getCurrentTimestamp();
        const newProduct: Product = {
          id: mockProducts.length > 0 ? mockProducts[mockProducts.length - 1].id + 1 : 1,
          name: data.name || "New Product",
          price: data.price || 0,
          stock: data.stock || 0,
          categoryId: data.categoryId || 0,
          description: data.description || "",
          thumbnail: data.thumbnail || "",
          createdAt: now,
          updatedAt: now,
        };
        mockProducts.push(newProduct);
        saveToStorage();
        resolve(newProduct);
      }, 100)
    ),

  update: async (id: number, data: Partial<Product>): Promise<Product | null> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const index = mockProducts.findIndex((p) => p.id === id);
        if (index === -1) return resolve(null);

        mockProducts[index] = {
          ...mockProducts[index],
          ...data,
          updatedAt: getCurrentTimestamp(),
        };

        saveToStorage();
        resolve({ ...mockProducts[index] });
      }, 100)
    ),

  delete: async (id: number): Promise<boolean> =>
    new Promise((resolve) =>
      setTimeout(() => {
        const initialLength = mockProducts.length;
        mockProducts = mockProducts.filter((p) => p.id !== id);
        saveToStorage();
        resolve(mockProducts.length < initialLength);
      }, 100)
    ),
};