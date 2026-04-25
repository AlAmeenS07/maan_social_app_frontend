// pages/Register.tsx
import { useForm } from "react-hook-form";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";
import RegistrationBanner from "../compponents/RegistrationBanner";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../services/auth.service";

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
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

    const navigate = useNavigate()

    async function registerSubmit(data: RegisterFormData) {
        await registerService(data , navigate)
    }


    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* LEFT SIDE */}
            <RegistrationBanner />

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center">
                <Card>
                    <h2 className="text-xl text-center font-semibold mb-4">
                        Create your account
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 text-center">
                        Enter your details below and start building your network.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
                        <Input label="Full Name"
                            {...register('fullname', {
                                required: { value: true, message: "Full name is requried !" },
                                minLength: { value: 3, message: "Minimum 3 letters !" },
                                validate: (value) => value.trim() !== "" || "Name cannot be whitespace !",
                                maxLength: { value: 25, message: "Name must be lessthan 25 letters !" }
                            })}
                            error={errors.fullname} />
                        <Input label="Email"
                            {...register("email", {
                                required: { value: true, message: "Email is required !" },
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid Email !" }
                            })}
                            error={errors.email} />

                        <div className="grid grid-cols-2 gap-3">
                            <Input type="date" label="DOB"
                                {...register("dob", {
                                    required: { value: true, message: "Date of birth is required!" },
                                    validate: {
                                        notFuture: (value) => {
                                            const today = new Date();
                                            const selectedDate = new Date(value);
                                            return selectedDate <= today || "DOB cannot be in the future!";
                                        }
                                    }
                                })}
                                error={errors.dob} />

                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Gender</label>
                                <select
                                    {...register("gender", {
                                        required: { value: true, message: "Gender is required!" },
                                        validate: (value) =>
                                            ["male", "female", "other"].includes(value) ||
                                            "Invalid gender selection!"
                                    })}
                                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-xs text-red-500">{errors.gender.message}</p>
                                )}
                            </div>
                        </div>

                        <Input type="password" label="Password"
                            {...register("password", {
                                required: { value: true, message: "password is required !" },
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/, message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' }
                            })}
                            error={errors.confirmPassword}
                        />
                        <Input
                            type="password"
                            label="Confirm Password"
                            {...register("confirmPassword", {
                                required: { value: true, message: "Confirm password is required !" },
                                validate: (value) => value === watch('password') || "Password must be match !"
                            })}
                            error={errors.confirmPassword}
                        />

                        {/* TERMS */}
                        <div className="flex gap-2 text-sm">
                            <input type="checkbox" {...register("terms", { required: "Required" })}  />
                            <p>I agree to <span className="text-blue-500 underline cursor-pointer">Terms & Conditions</span></p>
                        </div>
                        {errors.terms && <p className="text-xs text-red-500">Agree terms and conditions !</p>}

                        <Button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
                            Create account →
                        </Button>
                    </form>


                    {/* Login LINK */}
                    <div className="text-center mt-4 text-xs text-gray-500">
                        <p>
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-purple-600 cursor-pointer hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>

                </Card>
            </div>
        </div>
    );
}