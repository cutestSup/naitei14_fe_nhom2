import React, { useEffect, useState } from "react";
import { feedbackApi } from "../../../apis/admin/feedbackIndex"; // import mock API
import { Feedback } from "./types";

export default function FeedbackPage() {
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await feedbackApi.getAll(); // mock API trả trực tiếp dữ liệu
      setData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to load feedback", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;

    try {
      await feedbackApi.delete(id);
      load();
    } catch (error) {
      alert("Error deleting feedback: " + error);
    }
  };

  const handleReply = async (id: number) => {
    const message = prompt(
      "Enter reply message:",
      "Thank you for your feedback!"
    );
    if (!message) return;

    try {
      await feedbackApi.reply(id, message);
      alert("Reply sent successfully!");
      load();
    } catch (error) {
      alert("Error sending reply: " + error);
    }
  };

  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Feedback</h1>
        <button
          onClick={load}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : safeData.length === 0 ? (
        <div className="p-4 text-center text-gray-500 border bg-gray-50 rounded">
          No feedback found.
        </div>
      ) : (
        <table className="w-full border shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
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
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleReply(f.id)}
                  >
                    Reply
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(f.id)}
                  >
                    Delete
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
