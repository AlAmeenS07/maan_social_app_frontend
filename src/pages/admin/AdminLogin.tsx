// pages/Login.jsx

import { useForm } from "react-hook-form";
import AdminLoginBanner from "../../compponents/AdminLoginBanner";
import Button from "../../compponents/Button";
import Input from "../../compponents/Input";
import { useAdminLogin } from "../../hooks/admin/auth/useAdminLogin";

export type LoginFormData = {
  email: string
  password: string
}


export default function AdminLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const {mutate , isPending} = useAdminLogin()


  async function onSubmit(data: LoginFormData) {
    mutate(data)
    // await adminLoginService(data , navigate , dispatch)
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
              isLoading={isPending}
              loadingText="Logging..."
              className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2"
            >
              Login
            </Button>

          </form>

        </div>
      </div>
    </div>
  );
}