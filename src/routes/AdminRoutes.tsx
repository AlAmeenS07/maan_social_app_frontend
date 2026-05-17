import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminPosts from "../pages/admin/AdminPosts";

function AdminRoutes() {
  const user = useSelector((state: RootState) => state.user);

  if (!user.authChecked) {
    return null;
  }

  const isAdmin = user.user?.is_admin;

  return (
    <Routes>
      <Route path="login" element={!isAdmin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />

      <Route path="dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />

      <Route path="users" element={isAdmin ? <AdminUsers /> : <Navigate to="/admin/login" />} />

      <Route path="posts" element={isAdmin ? <AdminPosts /> : <Navigate to="/admin/login" />} />
    </Routes>
  );
}

export default AdminRoutes;