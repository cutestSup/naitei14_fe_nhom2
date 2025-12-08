import { Order } from "../../features/admin/orders/types";

const STORAGE_KEY = "mockOrders";

const defaultOrders: Order[] = [
  {
    id: 101,
    userId: 1,
    status: "pending",
    total: 1250000,
    createdAt: "2025-01-20T08:30:00Z",
    items: [
      { productId: 1, name: "Cây Kim Tiền", quantity: 2, price: 500000 },
      { productId: 5, name: "Chậu sứ trắng", quantity: 1, price: 250000 },
    ],
  },
  {
    id: 102,
    userId: 2,
    status: "shipping",
    total: 450000,
    createdAt: "2025-01-21T14:15:00Z",
    items: [
      { productId: 3, name: "Cây Lưỡi Hổ", quantity: 3, price: 150000 },
    ],
  },
  {
    id: 103,
    userId: 5,
    status: "delivered",
    total: 800000,
    createdAt: "2025-01-18T09:00:00Z",
    items: [
      { productId: 2, name: "Cây Trầu Bà", quantity: 4, price: 200000 },
    ],
  },
];

let mockOrders: Order[] =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultOrders;

const saveToStorage = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders), 100);
    });
  },

  getDetail: async (id: number): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = mockOrders.find((o) => o.id === id);
        resolve(order || null);
      }, 100);
    });
  },

  create: async (data: Partial<Order>): Promise<Order> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          id: mockOrders.length > 0 ? mockOrders[mockOrders.length - 1].id + 1 : 1,
          userId: data.userId || 0,
          total: data.total || 0,
          status: data.status || "pending",
          createdAt: new Date().toISOString(),
          items: data.items || [],
        };
        mockOrders.push(newOrder);
        saveToStorage();
        resolve(newOrder);
      }, 100);
    });
  },

  update: async (id: number, data: Partial<Order>): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockOrders.findIndex((o) => o.id === id);
        if (index === -1) return resolve(null);

        mockOrders[index] = { ...mockOrders[index], ...data };
        saveToStorage();
        resolve(mockOrders[index]);
      }, 100);
    });
  },

  updateStatus: async (id: number, status: string): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockOrders.findIndex((o) => o.id === id);
        if (index === -1) return resolve(null);

        mockOrders[index].status = status;
        saveToStorage();
        resolve(mockOrders[index]);
      }, 100);
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockOrders.length;
        mockOrders = mockOrders.filter((o) => o.id !== id);
        saveToStorage();
        resolve(mockOrders.length < initialLength);
      }, 100);
    });
  },
};
