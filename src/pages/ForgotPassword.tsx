// pages/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Send reset link to:", data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-12">
        <div className="max-w-md">

          {/* TAG */}
          <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
            ACCOUNT RECOVERY
          </p>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mt-4 leading-snug">
            Reset your{" "}
            <span className="text-purple-600">password</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Forgot your password? No worries. Enter your registered email
            and we’ll send you a secure link to reset your credentials.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                🔐
              </div>
              <div>
                <p className="font-medium text-sm">Secure Recovery</p>
                <p className="text-xs text-gray-500">
                  Your data stays protected with encrypted reset links.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                ⚡
              </div>
              <div>
                <p className="font-medium text-sm">Quick Process</p>
                <p className="text-xs text-gray-500">
                  Reset your password in just a few steps.
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
                required: "Email is required",
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
              <span className="text-purple-600 cursor-pointer">
                Back to login
              </span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}