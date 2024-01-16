"use client";

import LoadingSpinner from "@/components/LoadingSpinner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { notifyError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import z from "zod";

const CheckoutForm = ({ userDetails }: { userDetails: User }) => {
    const checkoutSchema = z.object({
        email: z.string().min(1).email(),
        firstName: z.string().min(1).max(36),
        lastName: z.string().min(1).max(36),
        streetAddress: z.string().min(1).max(196),
        city: z.string().min(1).max(64),
        zipCode: z.string().min(1).max(32),
        phoneNumber: z.string().min(1).max(10),
    });

    type CheckoutSchema = z.infer<typeof checkoutSchema>;

    const form = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            phoneNumber: userDetails.phone,
        },
    });

    const handleCheckout = async (values: CheckoutSchema) => {
        try {
            const res = await axios.post("/api/order", values);
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };
    return (
        <section className="w-full lg:w-1/2 p-4 pl-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCheckout)}
                    className="space-y-6"
                    noValidate
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="user@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    First name{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Last name{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Street address{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123 Main Street, Anytown, USA 12345"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    City <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Chicago, Illinois"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Zip code{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="60007" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Phone number{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+12312322334"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="w-40 text-base"
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        {form.formState.isSubmitting ? (
                            <LoadingSpinner />
                        ) : (
                            "Pay now"
                        )}
                    </Button>
                </form>
            </Form>
        </section>
    );
};

export default CheckoutForm;
