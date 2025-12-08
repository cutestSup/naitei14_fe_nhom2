import React from "react";
import { User } from "../types";

interface Props {
  user: User | null;
}

export default function UserDetail({ user }: Props) {
  if (!user) {
    return (
      <div className="p-4 border rounded mt-4 bg-gray-50 text-gray-500 text-center">
        Select a user from the table to view details.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">User Detail</h2>

      <div className="space-y-3">
        <p>
          <span className="font-semibold w-24 inline-block">ID:</span>
          {user.id}
        </p>
        <p>
          <span className="font-semibold w-24 inline-block">Name:</span>
          {user.name}
        </p>
        <p>
          <span className="font-semibold w-24 inline-block">Email:</span>
          {user.email}
        </p>
        <p>
          <span className="font-semibold w-24 inline-block">Role:</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded text-sm border">
            {user.role}
          </span>
        </p>
        <p>
          <span className="font-semibold w-24 inline-block">Joined:</span>
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold w-24 inline-block">Status:</span>
          {user.active ? (
            <span className="text-green-600 font-bold">Active</span>
          ) : (
            <span className="text-red-600 font-bold">Inactive</span>
          )}
        </p>
      </div>
    </div>
  );
}
