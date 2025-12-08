import React, { useEffect, useState } from "react";
import {
  dashboardApi,
  TopProduct,
  DashboardOverview,
} from "../../../apis/admin/dashboardIndex"; // mock API

import ChartSales from "./components/ChartSales";
import ProductTopList from "./components/ProductTopList";

export default function AdminDashboard() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    dashboardApi.getTopProducts().then(setTopProducts);
    dashboardApi.getOverview().then(setOverview);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {overview && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded">
            Total Sales: {overview.totalSales.toLocaleString()}
          </div>
          <div className="p-4 border rounded">Orders: {overview.orders}</div>
          <div className="p-4 border rounded">Users: {overview.users}</div>
        </div>
      )}

      <ChartSales />
      <ProductTopList products={topProducts} />
    </div>
  );
}
