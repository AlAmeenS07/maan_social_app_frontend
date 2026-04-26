// pages/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";
import ForgotPasswordBanner from "../compponents/ForgotPasswordBanner";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordService } from "../services/auth.service";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const {register,handleSubmit,formState: { errors },} = useForm<FormData>();

  const navigate = useNavigate()

  const onSubmit = async(data: FormData) => {
    await forgotPasswordService(data , navigate)
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <ForgotPasswordBanner />

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <Card>
          <h2 className="text-lg font-semibold text-center mb-2">
            Forgot Password
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Enter your email to receive a reset code
          </p>

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

            <Button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
              Send Reset Link →
            </Button>
          </form>

          {/* EXTRA LINKS */}
          <div className="text-center mt-4 text-xs text-gray-500">
            <p>
              Remember your password?{" "}
              <Link to={"/login"} className="text-purple-600 cursor-pointer hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}