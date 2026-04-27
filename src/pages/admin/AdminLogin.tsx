// pages/Login.jsx

import { useForm } from "react-hook-form";
import AdminLoginBanner from "../../compponents/AdminLoginBanner";
import Button from "../../compponents/Button";
import Input from "../../compponents/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { UserState } from "../../store/slices/user.slice";
import { adminLoginService } from "../../services/admin/admin.auth.service";

export type LoginFormData = {
  email: string
  password: string
}


export default function AdminLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const loading = useSelector((state: UserState) => state.loading)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function onSubmit(data: LoginFormData) {
    await adminLoginService(data , navigate , dispatch)
    console.log("adminLogin", data)
  }

  return (
    <div className="flex h-screen">

      {/* LEFT PANEL */}
      <div className="w-1/2 h-full">
        <AdminLoginBanner />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 shadow-lg rounded-xl p-6">
          <h2 className="text-xl text-center font-semibold mb-4">
            Welcome back Admin
          </h2>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Email is required !" },
                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email !" }
              })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}