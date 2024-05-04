"use client";

import { useRouter } from "@/lib/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../LoadingSpinner";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError, notifySuccess } from "@/lib/utils";
import axios, { isAxiosError } from "axios";
import { useModal } from "@/contexts/ModalContext";

interface SignUpFormProps {
    toggleView: () => void;
}

const SignUpForm = ({ toggleView }: SignUpFormProps) => {
    const signUpSchema = z.object({
        firstName: z.string().min(1).max(36),
        lastName: z.string().min(1).max(36),
        email: z.string().min(1).email().max(128),
        password: z.string().min(1).min(8).max(48),
    });

    type SignUpSchema = z.infer<typeof signUpSchema>;

    const router = useRouter();
    const { toggle } = useModal();

    const { register, handleSubmit, formState } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleSignUp = async (values: SignUpSchema) => {
        try {
            const { data } = await axios.post("/api/auth/sign-up", values);
            toggle("auth");
            router.refresh();
            notifySuccess(data.message);
        } catch (error) {
            console.log(error);
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };
    return (
        <>
            <form
                className="flex flex-col gap-4"
                noValidate
                onSubmit={handleSubmit(handleSignUp)}
            >
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="firstName"
                        className="leading-normal text-base"
                    >
                        First name
                    </Label>
                    <Input
                        {...register("firstName")}
                        id="firstName"
                        type="text"
                        placeholder="Mohammed"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.firstName?.message}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="lastName"
                        className="leading-normal text-base"
                    >
                        Last name
                    </Label>
                    <Input
                        {...register("lastName")}
                        id="lastName"
                        type="text"
                        placeholder="Ali"
                    />
                    <span className="text-red-600 text-sm ml-0.5">
                        {formState.errors.lastName?.message}
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
                            placeholder="•••••••••••••••"
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
            <button
                onClick={toggleView}
                className="hover:underline text-center block mx-auto mt-4"
            >
                Already have an account?
            </button>
        </>
    );
};

export default SignUpForm;
