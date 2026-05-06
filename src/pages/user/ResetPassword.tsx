
// pages/ResetPassword.tsx
import { useForm } from "react-hook-form";
import Card from "../../compponents/Card";
import Input from "../../compponents/Input";
import Button from "../../compponents/Button";
import ResetPasswordBanner from "../../compponents/ResetPasswordBanner";
import { useResetPassword } from "../../hooks/user/auth/useResetPassword";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();
  const { mutate, isPending } = useResetPassword();

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE (hidden on mobile) */}
      <div className="hidden lg:flex">
        <ResetPasswordBanner />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center w-full min-h-screen px-4 sm:px-6 md:px-8">

        <div className="w-full max-w-md mx-auto flex items-center">

          <div className="w-full">
            <Card>

              <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">
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
                    required: { value: true, message: "Password is required !" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/,
                      message: "Strong password required!",
                    },
                  })}
                  error={errors.password}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: { value: true, message: "Confirm password is required !" },
                    validate: (value) =>
                      value === getValues("password") || "Password must match!",
                  })}
                  error={errors.confirmPassword}
                />

                <Button
                  type="submit"
                  isLoading={isPending}
                  loadingText="Resetting..."
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  Update Password
                </Button>

              </form>

            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}