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
import { Textarea } from "@/components/ui/textarea";
import { notifyError, notifySuccess } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    sender: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
    }),
    subject: z.string(),
    content: z.string(),
});

interface ContactFormProps {
    userDetails: User | null;
}

const ContactForm = ({ userDetails }: ContactFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sender: {
                firstName: userDetails?.firstName ?? "",
                lastName: userDetails?.lastName ?? "",
                email: userDetails?.email ?? "",
            },
            subject: "",
            content: "",
        },
    });
    const sendMessage = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!userDetails)
                return notifyError(
                    "You need to login before submitting a message."
                );
            const { data } = await axios.post("/api/messages", values);
            notifySuccess(data.message);
            form.reset();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };
    return (
        <section>
            <h2 className="pb-3 text-4xl font-semibold">
                More questions in mind?
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(sendMessage)}
                    className="space-y-6"
                >
                    <div className="max-md:space-y-6 md:flex md:gap-4">
                        <FormField
                            control={form.control}
                            name="sender.firstName"
                            render={({ field }) => (
                                <FormItem className="md:w-full">
                                    <FormLabel>
                                        First name{" "}
                                        <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sender.lastName"
                            render={({ field }) => (
                                <FormItem className="md:w-full">
                                    <FormLabel>
                                        Last name{" "}
                                        <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="max-md:space-y-6 md:flex md:gap-4">
                        <FormField
                            control={form.control}
                            name="sender.email"
                            render={({ field }) => (
                                <FormItem className="md:w-full">
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
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="md:w-full">
                                    <FormLabel>
                                        Subject{" "}
                                        <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Refund"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Message{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={8}
                                        placeholder="..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="w-40"
                        disabled={form.formState.isSubmitting}
                        type="submit"
                    >
                        {form.formState.isSubmitting ? (
                            <LoadingSpinner />
                        ) : (
                            "Send message"
                        )}
                    </Button>
                </form>
            </Form>
        </section>
    );
};

export default ContactForm;
