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

  const {register,handleSubmit,watch,formState: { errors }} = useForm<FormData>();

  const {mutate , isPending} = useResetPassword()

  
  const onSubmit = async(data: FormData) => {
    mutate(data)
    // await resetPasswordService({password : data.password} , navigate)
  };

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <ResetPasswordBanner />

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
                required: { value: true, message: "password is required !" },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/, message: 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character !' }
              })}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: { value: true, message: "Confirm password is required !" },
                validate: (value) => value === watch('password') || "Password must be match !"
              })}
              error={errors.confirmPassword}
            />
{/* 
            <Button type="submit" className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
              Update Password →
            </Button> */}

            <Button
              type="submit"
              isLoading={isPending}
              loadingText="reseting..."
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium disabled:opacity-60 flex items-center justify-center gap-2"
            >
              Update Passoword
            </Button>

          </form>

        </Card>
      </div>
    </div>
  );
}