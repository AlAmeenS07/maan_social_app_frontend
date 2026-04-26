import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Otp from "./pages/Otp"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"
import { useSelector } from "react-redux"
import { type UserState } from "./store/slices/user.slice"

function App() {
  const user: any = useSelector((state: UserState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.accessToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={user?.accessToken ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user?.accessToken ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
