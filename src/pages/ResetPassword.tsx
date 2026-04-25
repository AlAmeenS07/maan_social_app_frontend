// pages/ResetPassword.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("New Password:", data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center p-12">
        <div className="max-w-md">

          {/* TAG */}
          <p className="text-xs font-semibold text-purple-600 bg-purple-100 inline-block px-3 py-1 rounded-full">
            PASSWORD RESET
          </p>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mt-4 leading-snug">
            Create a new{" "}
            <span className="text-purple-600">password</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Your new password must be different from previously used passwords.
            Keep it strong and secure to protect your account.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                🔐
              </div>
              <div>
                <p className="font-medium text-sm">Strong Security</p>
                <p className="text-xs text-gray-500">
                  Protect your account with a strong password.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                ⚡
              </div>
              <div>
                <p className="font-medium text-sm">Quick Update</p>
                <p className="text-xs text-gray-500">
                  Change your password instantly and continue.
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
            Reset Password
          </h2>

          <p className="text-center text-sm text-gray-500 mb-4">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />

            <Button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
              Update Password →
            </Button>
          </form>
          
        </Card>
      </div>
    </div>
  );
}