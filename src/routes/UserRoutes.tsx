import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import Otp from "../pages/user/Otp";

function UserRoutes() {
  const user = useSelector((state: RootState) => state.user);
  const isAdmin = user.user?.is_admin;

  return (
    <Routes>

      <Route path="/" element={ user?.accessToken && !isAdmin ? <Home /> : <Navigate to="/login" /> } />
      <Route path="/login" element={ !user?.accessToken ? <Login /> : <Navigate to="/" /> } />
      <Route path="/register" element={ !user?.accessToken ? <Register /> : <Navigate to="/" /> } />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default UserRoutes;