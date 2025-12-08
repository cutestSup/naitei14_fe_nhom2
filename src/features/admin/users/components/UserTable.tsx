import React from "react";
import { User } from "../types";

interface Props {
  users?: User[] | null;
  onSelect: (user: User) => void;
  onToggleActive: (id: number) => void;
}

export default function UserTable({ users, onSelect, onToggleActive }: Props) {
  const safeUsers = Array.isArray(users) ? users : [];

  if (safeUsers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-3 bg-white rounded">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border mt-3 bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {safeUsers.map((u) => (
            <tr
              key={u.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="p-3">{u.id}</td>
              <td className="p-3 font-medium">{u.name}</td>
              <td className="p-3 text-gray-600">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>

              <td className="p-3">
                {u.active ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </td>

              <td className="p-3 flex items-center gap-2">
                {/* Nút Xem chi tiết */}
                <button
                  onClick={() => onSelect(u)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 text-sm font-medium"
                >
                  View
                </button>

                {/* Nút Activate/Deactivate */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleActive(u.id);
                  }}
                  className={`px-3 py-1 rounded text-sm font-medium text-white shadow-sm transition-colors ${
                    u.active
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {u.active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
