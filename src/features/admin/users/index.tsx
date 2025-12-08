import React, { useEffect, useState } from "react";
import { usersApi } from "./api";
import { User } from "./types";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);

  const refresh = async () => {
    const data = await usersApi.getAll();
    setUsers(data);

    if (selected) {
      const updatedUser = data.find((u) => u.id === selected.id);
      setSelected(updatedUser || null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleToggleActive = async (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );

    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, active: !prev.active } : null));
    }

    try {
      await usersApi.toggleActive(id);
    } catch (err) {
      console.error("Failed to toggle user status", err);
      await refresh();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>

      <UserTable
        users={users}
        onSelect={setSelected}
        onToggleActive={handleToggleActive}
      />

      <UserDetail user={selected} />
    </div>
  );
}
