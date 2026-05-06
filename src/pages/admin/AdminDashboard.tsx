// pages/Dashboard.jsx

import AdminLayout from "../../layout/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to the MaaN Admin Dashboard.
      </p>
    </AdminLayout>
  );
}