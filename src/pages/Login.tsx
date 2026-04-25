// pages/Login.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";
import LoginBanner from "../compponents/LoginBanner";
import { Link } from "react-router-dom";

export type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <LoginBanner />

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <Card>
          <h2 className="text-lg font-semibold text-center mb-2">
            Welcome back
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Enter your credentials to continue
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

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />

            {/* FORGOT PASSWORD */}
            <div className="text-right text-sm">
              <Link to={"/forgot-password"} className="text-purple-600 cursor-pointer hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
              Login →
            </Button>
          </form>

          {/* SIGN UP LINK */}
          <div className="text-center mt-4 text-xs text-gray-500">
            <p>
              Don’t have an account?{" "}
              <Link to={"/register"} className="text-purple-600 cursor-pointer hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}