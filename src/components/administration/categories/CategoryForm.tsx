import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { notifyError, notifySuccess } from "@/lib/utils";

import axios, { isAxiosError } from "axios";

import LoadingSpinner from "../../LoadingSpinner";
import { useRouter } from "next/navigation";
import { useActionData } from "@/contexts/ActionContext";

const formSchema = z.object({
    label: z
        .string()
        .min(2, "The label can't contain less than 2 characters.")
        .max(32, "The label can't contain more than 32 characters."),
});

interface props {
    toggleDrawer: () => void;
}

const CategoryForm = ({ toggleDrawer }: props) => {
    const router = useRouter();
    const { actionData } = useActionData();
    const selectedCategory = actionData as Category | null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: selectedCategory?.label || "",
        },
    });

    const isEditMode = selectedCategory !== null;

    const createCategory = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await axios.post("/api/categories", values);
            notifySuccess(data.message);
            toggleDrawer();
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    const updateCategory = async (values: z.infer<typeof formSchema>) => {
        try {
            const categoryId = selectedCategory?._id;
            const { data } = await axios.put(
                `/api/categories/${categoryId}`,
                values
            );
            notifySuccess(data.message);
            toggleDrawer();
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    isEditMode ? updateCategory : createCategory
                )}
                className="space-y-6"
            >
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
                    ) : isEditMode ? (
                        "Update category"
                    ) : (
                        "Publish category"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default CategoryForm;
