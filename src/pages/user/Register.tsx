// pages/Register.tsx
import { useForm } from "react-hook-form";
import Card from "../../compponents/Card";
import Input from "../../compponents/Input";
import Button from "../../compponents/Button";
import RegistrationBanner from "../../compponents/RegistrationBanner";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/user/auth/useRegister";

export type RegisterFormData = {
    fullname: string;
    email: string;
    dob: string;
    gender: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

export default function Register() {

    const { register, handleSubmit, watch, formState: { errors } } =useForm<RegisterFormData>();

    const { isPending, mutate } = useRegister();

    async function registerSubmit(data: RegisterFormData) {
        mutate(data);
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex">
                <RegistrationBanner />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center px-4 py-8 sm:px-6 md:px-8">
                <div className="w-full max-w-md mx-auto">
                    <Card>

                        <h2 className="text-xl sm:text-2xl text-center font-semibold mb-4">
                            Create your account
                        </h2>

                        <p className="text-sm text-gray-500 mb-4 text-center">
                            Enter your details below and start building your network.
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>

                            <Input
                                label="Full Name"
                                {...register("fullname", {
                                    required: { value: true, message: "Full name is required !" },
                                    minLength: { value: 3, message: "Minimum 3 letters !" },
                                    validate: (value) =>
                                        value.trim() !== "" || "Name cannot be whitespace !",
                                    maxLength: { value: 25, message: "Max 25 letters !" },
                                })}
                                error={errors.fullname}
                            />

                            <Input
                                label="Email"
                                {...register("email", {
                                    required: { value: true, message: "Email is required !" },
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid Email !",
                                    },
                                })}
                                error={errors.email}
                            />

                            {/* DOB + Gender */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <Input
                                    type="date"
                                    label="DOB"
                                    {...register("dob", {
                                        required: { value: true, message: "Date of birth is required!" },
                                        validate: {
                                            notFuture: (value) => {
                                                const today = new Date();
                                                const selectedDate = new Date(value);
                                                return (
                                                    selectedDate <= today ||
                                                    "DOB cannot be in the future!"
                                                );
                                            },
                                        },
                                    })}
                                    error={errors.dob}
                                />

                                <div className="space-y-1">
                                    <label className="text-sm text-gray-600">Gender</label>
                                    <select
                                        {...register("gender", {
                                            required: { value: true, message: "Gender is required!" },
                                            validate: (value) =>
                                                ["male", "female", "other"].includes(value) ||
                                                "Invalid gender!",
                                        })}
                                        className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                    </select>

                                    {errors.gender && (
                                        <p className="text-xs text-red-500">
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Input
                                type="password"
                                label="Password"
                                {...register("password", {
                                    required: { value: true, message: "Password is required !" },
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/,
                                        message: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character !",
                                    },
                                })}
                                error={errors.password}
                            />

                            <Input
                                type="password"
                                label="Confirm Password"
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Confirm password is required !",
                                    },
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Password must match!",
                                })}
                                error={errors.confirmPassword}
                            />

                            {/* TERMS */}
                            <div className="flex gap-2 text-sm items-start">
                                <input
                                    type="checkbox"
                                    {...register("terms", { required: "Required" })}
                                />
                                <p>
                                    I agree to{" "}
                                    <span className="text-blue-500 underline cursor-pointer">
                                        Terms & Conditions
                                    </span>
                                </p>
                            </div>

                            {errors.terms && (
                                <p className="text-xs text-red-500">
                                    Agree terms and conditions !
                                </p>
                            )}

                            <Button
                                type="submit"
                                isLoading={isPending}
                                loadingText="Creating account..."
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                            >
                                Register
                            </Button>
                        </form>

                        <div className="text-center mt-4 text-xs text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-600 hover:underline">
                                Login
                            </Link>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    );
}