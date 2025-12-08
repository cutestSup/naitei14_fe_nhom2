// usersIndex.ts
import { User } from "../../features/admin/users/types";

const STORAGE_KEY = "mockUsers";

const defaultUsers: User[] = [
  { id: 1, name: "Nguyễn Văn A", email: "admin@example.com", role: "admin", createdAt: "2024-01-01T08:00:00Z", active: true },
  { id: 2, name: "Trần Văn B", email: "customer@example.com", role: "user", createdAt: "2024-02-15T10:30:00Z", active: false },
  { id: 3, name: "Lê Thị C", email: "editor@example.com", role: "editor", createdAt: "2024-03-20T14:45:00Z", active: true },
];

const mockUsers: User[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultUsers;

const saveToStorage = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 100);
    });
  },

  getDetail: async (id: number): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        resolve(user || null);
      }, 100);
    });
  },

  toggleActive: async (id: number): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index === -1) return resolve(null);

        mockUsers[index].active = !mockUsers[index].active;
        saveToStorage(); // lưu trạng thái mới
        resolve(mockUsers[index]);
      }, 100);
    });
  },
};