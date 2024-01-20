"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "../LoadingSpinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError, notifySuccess } from "@/lib/utils";
import axios, { isAxiosError } from "axios";

const LoginForm = () => {
    const loginSchema = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
    });

    type LoginSchema = z.infer<typeof loginSchema>;

    const router = useRouter();

    const { register, handleSubmit, formState } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleLogin = async (values: LoginSchema) => {
        try {
            const { data } = await axios.post("/api/auth/sign-in", values);
            notifySuccess(data.message);
            // We refresh instead of redirecting because
            // the server will auto redirect once user is logged in
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    return (
        <div className="sm:border border-accent sm:py-20 max-w-lg w-full px-2 sm:px-8 rounded-md sm:absolute top-1/2 left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 max-sm:mx-auto">
            <form
                className="flex flex-col gap-4"
                noValidate
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="leading-normal text-base">
                        Email
                    </Label>
                    <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="user@email.com"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.email?.message}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="password"
                        className="leading-normal text-base"
                    >
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            {...register("password")}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="●●●●●●●●●"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-2.5"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.password?.message}
                    </span>
                </div>
                <Link href="#" className="text-sm hover:underline">
                    Forgot password?
                </Link>
                <Button
                    className="mt-1"
                    type="submit"
                    disabled={formState.isSubmitting}
                >
                    {formState.isSubmitting ? <LoadingSpinner /> : "Sign In"}
                </Button>
            </form>
            <Link
                href="/sign-up"
                className="hover:underline text-center block relative top-9"
            >
                Don&apos;t have an account?
            </Link>
        </div>
    );
};

export default LoginForm;
