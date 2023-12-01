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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: "",
        },
    });

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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(createCategory)}
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
                    ) : (
                        "Publish category"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default CategoryForm;
