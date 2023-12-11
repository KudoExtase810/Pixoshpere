"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../LoadingSpinner";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError, notifySuccess } from "@/lib/utils";
import axios, { isAxiosError } from "axios";

const RegisterForm = () => {
    const signUpSchema = z.object({
        firstname: z.string().min(1).max(36),
        lastname: z.string().min(1).max(36),
        email: z.string().min(1).email().max(128),
        phone: z.string().min(1).max(10),
        password: z.string().min(1).min(8).max(48),
    });

    type SignUpSchema = z.infer<typeof signUpSchema>;

    const router = useRouter();

    const { register, handleSubmit, formState } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSignUp = async (values: SignUpSchema) => {
        try {
            await axios.post("/api/auth/sign-up", values);
            notifySuccess(
                "Successfully signed up. Check your email to finish the process."
            );
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };
    return (
        <div className="sm:border border-accent sm:py-20 max-w-lg w-full px-2 sm:px-8 rounded-md sm:absolute top-1/2 left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 max-sm:mx-auto">
            <form
                className="flex flex-col gap-4"
                noValidate
                onSubmit={handleSubmit(handleSignUp)}
            >
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="firstname"
                        className="leading-normal text-base"
                    >
                        First name
                    </Label>
                    <Input
                        {...register("firstname")}
                        id="firstname"
                        type="text"
                        placeholder="Mohammed Ali"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.firstname?.message}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="lastname"
                        className="leading-normal text-base"
                    >
                        Last name
                    </Label>
                    <Input
                        {...register("lastname")}
                        id="lastname"
                        type="text"
                        placeholder="Mohammed Ali"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.lastname?.message}
                    </span>
                </div>

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
                    <Label htmlFor="phone" className="leading-normal text-base">
                        Phone number
                    </Label>
                    <Input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder="0662124899"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.phone?.message}
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

                <Button
                    className="mt-1"
                    type="submit"
                    disabled={formState.isSubmitting}
                >
                    {formState.isSubmitting ? <LoadingSpinner /> : "Sign Up"}
                </Button>
            </form>
            <Link
                href="/login"
                className="hover:underline text-center block relative top-9"
            >
                Already have an account?
            </Link>
        </div>
    );
};

export default RegisterForm;
