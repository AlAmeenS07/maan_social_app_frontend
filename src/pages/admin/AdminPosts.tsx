// pages/Dashboard.jsx

import AdminLayout from "../../layout/AdminLayout";

export default function AdminPosts() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">
        Posts & Contents
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to the MaaN Posts Management.
      </p>
    </AdminLayout>
  );
}