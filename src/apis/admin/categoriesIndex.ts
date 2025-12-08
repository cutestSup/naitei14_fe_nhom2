import { Category } from "../../features/admin/categories/types";

const STORAGE_KEY = "mockCategories";

const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Cây cảnh trong nhà",
    description: "Các loại cây đặt trong phòng khách",
    createdAt: "2024-01-01T08:00:00.000Z",
    updatedAt: "2024-01-01T08:00:00.000Z",
  },
  {
    id: 2,
    name: "Cây phong thủy",
    description: "Mang lại may mắn và thịnh vượng",
    createdAt: "2024-01-02T09:30:00.000Z",
    updatedAt: "2024-01-02T09:30:00.000Z",
  },
  {
    id: 3,
    name: "Cây văn phòng",
    description: "Dễ chăm, phù hợp môi trường làm việc",
    createdAt: "2024-01-05T14:15:00.000Z",
    updatedAt: "2024-01-05T14:15:00.000Z",
  },
];

let mockCategories: Category[] =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultCategories;

const saveToStorage = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCategories));

const getCurrentTimestamp = () => new Date().toISOString();

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 100);
    });
  },

  create: async (data: Partial<Category>): Promise<Category> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = getCurrentTimestamp();
        const newCategory: Category = {
          id:
            mockCategories.length > 0
              ? mockCategories[mockCategories.length - 1].id + 1
              : 1,
          name: data.name || "Untitled",
          description: data.description,
          createdAt: now,
          updatedAt: now,
        };
        mockCategories.push(newCategory);
        saveToStorage();
        resolve(newCategory);
      }, 100);
    });
  },

  update: async (
    id: number,
    data: Partial<Category>
  ): Promise<Category | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockCategories.findIndex((c) => c.id === id);
        if (index === -1) return resolve(null);

        mockCategories[index] = {
          ...mockCategories[index],
          ...data,
          updatedAt: getCurrentTimestamp(),
        };
        saveToStorage();
        resolve(mockCategories[index]);
      }, 100);
    });
  },

  delete: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockCategories.length;
        mockCategories = mockCategories.filter((c) => c.id !== id);
        saveToStorage();
        resolve(mockCategories.length < initialLength);
      }, 100);
    });
  },
};
