import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  roles: string[];
  isDeleted: boolean;
  deletedAt: string | null;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/users/admin/all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (userId: number, username: string) => {
    if (!window.confirm(`Are you sure you want to soft-delete "${username}"?`)) return;

    try {
      await axiosClient.delete(`/users/admin/${userId}`);
      fetchUsers(); // refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading users...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Username</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Roles</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {user.roles?.join(", ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.isDeleted ? (
                    <span className="text-red-600 text-sm font-medium">Deleted</span>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">Active</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {!user.isDeleted && !user.roles?.includes("ROLE_ADMIN") && (
                    <button
                      onClick={() => handleSoftDelete(user.id, user.username)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Soft Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}