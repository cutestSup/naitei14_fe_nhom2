export interface SalesRecord {
  date: string;
  total: number;
}

export interface TopProduct {
  id: number;
  name: string;
  sales: number;
}

export interface DashboardOverview {
  totalSales: number;
  orders: number;
  users: number;
}

const mockSales: SalesRecord[] = [
  { date: "Mon", total: 120 },
  { date: "Tue", total: 200 },
  { date: "Wed", total: 150 },
  { date: "Thu", total: 300 },
  { date: "Fri", total: 180 },
]

const mockTopProducts: TopProduct[] = [
  { id: 1, name: "Cây Chân Chim", sales: 120 },
  { id: 2, name: "Cây Dạ Lam", sales: 95 },
  { id: 3, name: "Cây Danh Dự", sales: 110 },
]

const mockOverview: DashboardOverview = {
  totalSales: 21500000,
  orders: 350,
  users: 120,
}

export const dashboardApi = {
  getSales: async (): Promise<SalesRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSales), 100)
    })
  },

  getTopProducts: async (): Promise<TopProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTopProducts), 100)
    })
  },

  getOverview: async (): Promise<DashboardOverview> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOverview), 100)
    })
  },
}
