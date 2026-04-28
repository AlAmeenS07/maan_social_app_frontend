import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/user/ForgotPassword"
import Home from "./pages/user/Home"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import ResetPassword from "./pages/user/ResetPassword"
import { useDispatch, useSelector } from "react-redux"
import { loadingEnd, loadingStart, setUser, type UserState } from "./store/slices/user.slice"
import Otp from "./pages/user/Otp"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminPosts from "./pages/admin/AdminPosts"
import { useEffect } from "react"
import { refreshTokenApi } from "./api/user/auth.api"

function App() {
  const user: any = useSelector((state: UserState) => state.user);

  const role = user.user && user.user.is_admin

  console.log("App", user, user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const initAuth = async () => {
      dispatch(loadingStart());
      try {
        const res: any = await refreshTokenApi();
        if (res.success) {
          dispatch(setUser(res.data));
        }
      } catch {
        // No valid refresh token — user stays logged out
      } finally {
        dispatch(loadingEnd());
      }
    };
    if (!user.accessToken) {
      initAuth();
    }
  }, [])

  if (user.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-purple-600 text-lg">Loading...</span>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.accessToken && !role ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={user?.accessToken && !role ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user?.accessToken && !role ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={role ? <Navigate to={"/admin/dashboard"} /> : <AdminLogin />} />
        <Route path="/admin/dashboard" element={role ? <AdminDashboard /> : <Navigate to={"/admin/login"} />} />
        <Route path="/admin/users" element={role ? <AdminUsers /> : <Navigate to={"/admin/login"} />} />
        <Route path="/admin/posts" element={role ? <AdminPosts /> : <Navigate to={"/admin/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
