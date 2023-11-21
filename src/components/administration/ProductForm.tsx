"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { notifyError, notifySuccess, slugify } from "@/lib/utils";

import axios, { isAxiosError } from "axios";
import TextEditor from "./TextEditor";

const formSchema = z.object({
    title: z.string().min(6, "Ce champ doit comporter au moins 6 caractères."),
    price: z.coerce.number({
        invalid_type_error: "Ce champ doit être un nombre",
    }),
    salePrice: z.coerce
        .number({ invalid_type_error: "Ce champ doit être un nombre" })
        .optional(),
    quantity: z.coerce.number({
        invalid_type_error: "Ce champ doit être un nombre",
    }),
    priority: z.coerce.number({
        invalid_type_error: "Ce champ doit être un nombre",
    }),
    description: z.string(),
    isHidden: z.boolean(),
    hideWhenOutOfStock: z.boolean(),
});

const ProductForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: undefined,
            salePrice: undefined,
            quantity: 1,
            priority: 0,
            description: "",
            isHidden: false,
            hideWhenOutOfStock: false,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const newProduct = {
                ...values,
                slug: slugify(values.title),
                images: undefined,
            };
            const res = await axios.post("/api/products", newProduct);
            notifySuccess("Produit ajouté avec succès.");
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Apple MacBook Pro"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="25000"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Le prix de base de votre produit sans aucune
                                réduction appliquée.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix Soldé</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="20000"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Le prix de votre produit avec la réduction
                                appliquée.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantité</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="1"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Priorité</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                L'ordre d'affichage du produit dans la liste.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <TextEditor
                                    description={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isHidden"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Cacher ce produit.</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hideWhenOutOfStock"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Cacher ce produit lorsqu'il est en rupture
                                    de stock.
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit">Publier le produit</Button>
            </form>
        </Form>
    );
};

export default ProductForm;
