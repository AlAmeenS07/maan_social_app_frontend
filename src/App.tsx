import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/user/ForgotPassword"
import Home from "./pages/user/Home"
import Login from "./pages/user/Login"
import Register from "./pages/user/Register"
import ResetPassword from "./pages/user/ResetPassword"
import { useSelector } from "react-redux"
import { type UserState } from "./store/slices/user.slice"
import Otp from "./pages/user/Otp"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminPosts from "./pages/admin/AdminPosts"

function App() {
  const user: any = useSelector((state: UserState) => state.user);

  console.log("App" , user , user.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.accessToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={user?.accessToken ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user?.accessToken ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={user.user && user?.user?.is_admin ? <Navigate to={"/admin/dashboard"}/> :  <AdminLogin />}/>
        <Route path="/admin/dashboard" element={user.user && user?.user?.is_admin ? <AdminDashboard /> : <Navigate to={"/admin/login"}/>} />
        <Route path="/admin/users" element={user.user && user?.user?.is_admin ? <AdminUsers /> : <Navigate to={"/admin/login"}/> }/>
        <Route path="/admin/posts" element={user.user && user?.user?.is_admin ? <AdminPosts /> : <Navigate to={"/admin/login"}/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
