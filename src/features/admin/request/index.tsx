import React, { useEffect, useState } from "react";
import { requestApi } from "../../../apis/admin/requestIndex";
import { Request } from "./types";

export default function RequestPage() {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await requestApi.getAll();
      setData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to load request", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDecision = async (id: number, accepted: boolean) => {
    try {
      await requestApi.updateStatus(id, accepted);
      load();
    } catch (error) {
      alert("Error updating request: " + error);
    }
  };

  const handleReset = async (id: number) => {
    if (!window.confirm("Reset this request to initial state?")) return;

    try {
      await requestApi.reset(id);
      load();
    } catch (error) {
      alert("Error resetting request: " + error);
    }
  };

  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Request</h1>
        <button
          onClick={load}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : safeData.length === 0 ? (
        <div className="p-4 text-center text-gray-500 border bg-gray-50 rounded">
          No request found.
        </div>
      ) : (
        <table className="w-full border shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Request</th>
              <th className="border p-2">Created</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeData.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="border p-2">{f.id}</td>
                <td className="border p-2 font-medium">{f.userName}</td>
                <td className="border p-2 text-blue-600">{f.email}</td>

                <td className="border p-2 max-w-xs truncate" title={f.message}>
                  {f.message}
                </td>

                <td className="border p-2 text-sm text-gray-600">
                  {new Date(f.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-2 text-center space-x-2">
                  {!f.replied ? (
                    <>
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => handleDecision(f.id, true)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDecision(f.id, false)}
                      >
                        Deny
                      </button>
                    </>
                  ) : (
                    <span
                      className={
                        f.accepted
                          ? "text-green-700 font-semibold"
                          : "text-red-700 font-semibold"
                      }
                    >
                      {f.accepted ? "Accepted" : "Denied"}
                    </span>
                  )}

                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    onClick={() => handleReset(f.id)}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
