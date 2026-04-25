// pages/Login.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Login:", data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-12">
        <div className="max-w-md">

          {/* TAG */}
          <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
            WELCOME BACK
          </p>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mt-4 leading-snug">
            Log in to your{" "}
            <span className="text-purple-600">MaaN account</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Access your MaaN profile, connect with your audience,
            and continue building your digital identity seamlessly.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                🚀
              </div>
              <div>
                <p className="font-medium text-sm">Seamless Access</p>
                <p className="text-xs text-gray-500">
                  Jump right back into your creator dashboard.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                🔒
              </div>
              <div>
                <p className="font-medium text-sm">Secure Login</p>
                <p className="text-xs text-gray-500">
                  Your account is protected with advanced security.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

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
                required: "Email is required",
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
              <span className="text-purple-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            <Button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
              Login →
            </Button>
          </form>

          {/* SIGN UP LINK */}
          <div className="text-center mt-4 text-xs text-gray-500">
            <p>
              Don’t have an account?{" "}
              <span className="text-purple-600 cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}