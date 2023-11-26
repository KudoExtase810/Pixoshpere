import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { notifyError, notifySuccess, slugify } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";

import axios, { isAxiosError } from "axios";

import TextEditor from "../TextEditor";
import LoadingSpinner from "../../LoadingSpinner";

const formSchema = z.object({
    label: z
        .string()
        .min(2, "The label can't contain less than 2 characters.")
        .max(32, "The label can't contain more than 32 characters."),
});

const CategoryForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post("/api/categories", values);
            notifySuccess(res.data.message);
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Label <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Consoles" {...field} />
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
                        "Publish category"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default CategoryForm;
