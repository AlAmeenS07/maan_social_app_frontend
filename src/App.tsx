import { BrowserRouter, Route, Routes } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Otp from "./pages/Otp"
import Register from "./pages/Register"
import ResetPassword from "./pages/ResetPassword"

function App() {

  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/register" element={<Register/>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />}/>

        <Route path="/verify-otp" element={<Otp />}/>

        <Route path="/reset-password" element={<ResetPassword />}/>

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
