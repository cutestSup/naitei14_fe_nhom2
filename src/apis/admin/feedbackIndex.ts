import { Feedback } from "../../features/admin/feedback/types"

let mockFeedbacks: Feedback[] = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    message: "Cây đẹp nhưng giao hơi chậm.",
    createdAt: "2025-01-12",
    replied: false,
  },
  {
    id: 2,
    userName: "Lê Thị B",
    email: "lethib@example.com",
    message: "Shop tư vấn nhiệt tình, sẽ ủng hộ thêm!",
    createdAt: "2025-01-15",
    replied: true,
  },
  {
    id: 3,
    userName: "Phạm C",
    email: "phamc@test.com",
    message: "Giá hơi cao nhưng chất lượng tốt.",
    createdAt: "2025-01-18",
    replied: false,
  },
]

export const feedbackApi = {
  getAll: async (): Promise<Feedback[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFeedbacks), 100)
    })
  },

  reply: async (id: number, message: string): Promise<Feedback | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockFeedbacks.findIndex((f) => f.id === id)
        if (index === -1) return resolve(null)

        mockFeedbacks[index] = {
          ...mockFeedbacks[index],
          replied: true,
        }

        console.log(`Mock sending email to ${mockFeedbacks[index].email}: ${message}`);

        resolve(mockFeedbacks[index])
      }, 100)
    })
  },

  delete: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = mockFeedbacks.length
        mockFeedbacks = mockFeedbacks.filter((f) => f.id !== id)
        resolve(mockFeedbacks.length < initialLength)
      }, 100)
    })
  },
}
