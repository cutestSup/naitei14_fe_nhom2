import React, { useEffect, useState } from "react";
import {
  dashboardApi,
  SalesRecord,
} from "../../../../apis/admin/dashboardIndex";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ChartSales() {
  const [data, setData] = useState<SalesRecord[]>([]);

  useEffect(() => {
    dashboardApi.getSales().then((res) => {
      const extraData: SalesRecord[] = [
        { date: "Sat", total: 220 },
        { date: "Sun", total: 90 },
      ];
      setData([...res, ...extraData]);
    });
  }, []);

  return (
    <div className="p-4 border rounded mt-4 bg-white">
      <h2 className="font-bold mb-2">Sales Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
