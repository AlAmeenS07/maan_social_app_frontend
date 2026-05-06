// pages/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import Card from "../../compponents/Card";
import Input from "../../compponents/Input";
import Button from "../../compponents/Button";
import ForgotPasswordBanner from "../../compponents/ForgotPasswordBanner";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../../hooks/user/auth/useForgotPassword";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { mutate, isPending } = useForgotPassword();

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE (hidden on mobile) */}
      <div className="hidden lg:flex">
        <ForgotPasswordBanner />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center w-full min-h-screen px-4 sm:px-6 md:px-8">

        <div className="w-full max-w-md mx-auto flex items-center">

          <div className="w-full">
            <Card>

              <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">
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

                <Button
                  type="submit"
                  isLoading={isPending}
                  loadingText="Loading..."
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  Reset Password
                </Button>

              </form>

              {/* EXTRA LINKS */}
              <div className="text-center mt-4 text-xs text-gray-500">
                <p>
                  Remember your password?{" "}
                  <Link
                    to={"/login"}
                    className="text-purple-600 hover:underline"
                  >
                    Back to login
                  </Link>
                </p>
              </div>

            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}