import { Request } from "../../features/admin/request/types";

const STORAGE_KEY = "mockRequests";

const defaultRequests: Request[] = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    message: "Tôi muốn shop nhập thêm cây Sen Đá Mix Size Mini.",
    createdAt: "2025-01-12",
    replied: false,
    accepted: undefined,
  },
  {
    id: 2,
    userName: "Lê Thị B",
    email: "lethib@example.com",
    message: "Shop có thể bán thêm cây Trầu Bà Nam Mỹ không?",
    createdAt: "2025-01-15",
    replied: false,
    accepted: undefined,
  },
  {
    id: 3,
    userName: "Phạm C",
    email: "phamc@test.com",
    message:
      "Tôi muốn mua cây Xương Rồng Mico loại to, shop có thể nhập không?",
    createdAt: "2025-01-18",
    replied: false,
    accepted: undefined,
  },
  {
    id: 4,
    userName: "Trần D",
    email: "tttd@test.com",
    message: "Shop có thể giảm giá cho khách hàng thân thiết không?",
    createdAt: "2025-01-20",
    replied: false,
    accepted: undefined,
  },
];

const mockRequests: Request[] =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultRequests;

const saveToStorage = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRequests));

const getCurrentTimestamp = () => new Date().toISOString();

export const requestApi = {
  getAll: async (): Promise<Request[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRequests), 100);
    });
  },

  updateStatus: async (
    id: number,
    accepted: boolean
  ): Promise<Request | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRequests.findIndex((f) => f.id === id);
        if (index === -1) return resolve(null);

        mockRequests[index] = {
          ...mockRequests[index],
          accepted,
          replied: true,
          createdAt: getCurrentTimestamp(),
        };
        saveToStorage();
        resolve(mockRequests[index]);
      }, 100);
    });
  },

  reset: async (id: number): Promise<Request | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRequests.findIndex((f) => f.id === id);
        if (index === -1) return resolve(null);

        mockRequests[index] = {
          ...mockRequests[index],
          replied: false,
          accepted: undefined,
        };
        saveToStorage();
        resolve(mockRequests[index]);
      }, 100);
    });
  },
};
