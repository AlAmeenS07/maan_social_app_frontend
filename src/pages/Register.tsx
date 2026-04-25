// pages/Register.tsx
import { useForm } from "react-hook-form";
import AvatarGroup from "../compponents/AvatarGroup";
import Card from "../compponents/Card";
import Input from "../compponents/Input";
import Button from "../compponents/Button";

type FormData = {
    name: string;
    email: string;
    dob: string;
    gender: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const password = watch("password");

    async function registerSubmit(data : FormData){
        console.log("Register" , data)
    }


    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* LEFT SIDE */}
            <div className="bg-gradient-to-b from-purple-100 to-purple-200 p-12 flex items-center justify-center">
                <div className="max-w-md text-center md:text-left">

                    <h1 className="text-4xl font-bold leading-tight">
                        Join MaaN
                        <span className="text-purple-600 block">
                            Build your network.
                        </span>
                    </h1>

                    <p className="mt-4 text-gray-700">
                        The world's first multi-layered identity platform.
                        Create, connect, and monetize your presence
                        without leaving your unique voice.
                    </p>

                    <AvatarGroup />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">
                        Create your account
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Enter your details below and start building your network.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit(registerSubmit)}>
                        <Input label="Full Name" {...register("name", { required: "Required" })} error={errors.name} />
                        <Input label="Email" {...register("email", { required: "Required" })} error={errors.email} />

                        <div className="grid grid-cols-2 gap-3">
                            <Input type="date" label="DOB"  {...register("dob", { required: "Required" })} error={errors.dob} />

                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Gender</label>
                                <select
                                    {...register("gender", { required: "Required" })}
                                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-xs text-red-500">{errors.gender.message}</p>
                                )}
                            </div>
                        </div>

                        <Input type="password" label="Password" {...register("password" , {required : "Required"})} />
                        <Input
                            type="password"
                            label="Confirm Password"
                            {...register("confirmPassword", {
                                validate: v => v === watch("password") || "Passwords mismatch",
                            })}
                            error={errors.confirmPassword}
                        />

                        {/* TERMS */}
                        <div className="flex gap-2 text-sm">
                            <input type="checkbox" {...register("terms", { required: "Required" })} />
                            <p>I agree to <span className="text-blue-500 underline cursor-pointer">Terms & Conditions</span></p>
                        </div>

                        <Button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90">
                            Create account →
                        </Button>
                    </form>


                    {/* Login LINK */}
                    <div className="text-center mt-4 text-xs text-gray-500">
                        <p>
                            Already have an account?{" "}
                            <span className="text-purple-600 cursor-pointer">
                                Login
                            </span>
                        </p>
                    </div>

                </Card>
            </div>
        </div>
    );
}