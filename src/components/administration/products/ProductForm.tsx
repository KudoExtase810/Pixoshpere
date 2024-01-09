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
import { useRouter } from "next/navigation";
import { useActionData } from "@/contexts/ActionContext";

const formSchema = z.object({
    title: z
        .string()
        .min(6, "Le titre doit comporter au moins 6 caractères")
        .max(64, "Le titre ne peut pas dépasser 64 caractères"),
    price: z.coerce
        .number({
            invalid_type_error: "Ce champ doit être un nombre",
        })
        .min(0, "Le prix doit être supérieur ou égal à zéro")
        .max(500000, "Le prix ne peut pas dépasser 500000"),
    salePrice: z.coerce
        .number({ invalid_type_error: "Ce champ doit être un nombre" })
        .min(0, "Le prix en promotion doit être supérieur ou égal à zéro")
        .max(500000, "Le prix en promotion ne peut pas dépasser 500000")
        .optional(),
    category: z
        .string()
        .min(2, "Ce champ est obligatoire")
        .max(36, "Le titre ne peut pas dépasser 36 caractères"),
    quantity: z.coerce
        .number({
            invalid_type_error: "Ce champ doit être un nombre",
        })
        .min(0, "La quantité doit être supérieure ou égale à zéro")
        .max(500, "La quantité ne peut pas dépasser 500"),
    priority: z.coerce
        .number({
            invalid_type_error: "Ce champ doit être un nombre",
        })
        .min(0, "La priorité doit être supérieure ou égale à zéro")
        .max(2500, "La priorité ne peut pas dépasser 2500"),
    description: z
        .string()
        .min(36, "La description doit comporter au moins 36 caractères")
        .max(2048, "La description ne peut pas dépasser 2048 caractères"),
    isHidden: z.boolean(),
    hideWhenOutOfStock: z.boolean(),
});

interface props {
    toggleDrawer: () => void;
    allCategories: Category[];
}

const ProductForm = ({ toggleDrawer, allCategories }: props) => {
    const router = useRouter();

    const [images, setImages] = useState<FileList | null>(null);

    const { actionData } = useActionData();
    const selectedProduct = actionData as Product | null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: selectedProduct?.title || "",
            price: selectedProduct?.price,
            salePrice: selectedProduct?.salePrice,
            category: selectedProduct?.category._id || "",
            quantity: selectedProduct?.quantity ?? 1,
            priority: selectedProduct?.priority ?? 0,
            description: selectedProduct?.description ?? "",
            isHidden: selectedProduct?.isHidden ?? false,
            hideWhenOutOfStock: selectedProduct?.hideWhenOutOfStock ?? false,
        },
    });

    const isEditMode = selectedProduct !== null;

    const createProduct = async (values: z.infer<typeof formSchema>) => {
        try {
            if (values.salePrice && values.price <= values.salePrice)
                return notifyError(
                    "Le prix en promotion ne peut pas être supérieur ou égal au prix normal."
                );

            if (!images?.length)
                return notifyError("Veuillez ajouter au moins 1 image.");
            // If we get to this part it means that all data is valid
            // we can now upload the images to cloudinary

            const imageData = [];
            for (let i = 0; i < images.length; i++) {
                const data = await uploadToCloudinary(images[i]);
                imageData.push(data);
            }

            const newProduct = {
                ...values,
                slug: slugify(values.title),
                images: imageData,
            };
            const { data } = await axios.post("/api/products", newProduct);
            notifySuccess(data.message);
            toggleDrawer();
            router.refresh();
        } catch (error) {
            isAxiosError(error) && notifyError(error.response?.data.message);
        }
    };

    const updateProduct = async (values: z.infer<typeof formSchema>) => {
        try {
            if (values.salePrice && values.price <= values.salePrice)
                return notifyError(
                    "Le prix en promotion ne peut pas être supérieur ou égal au prix normal."
                );

            if (!images?.length)
                return notifyError("Veuillez ajouter au moins 1 image.");
            // If we get to this part it means that all data is valid
            // we can now upload the images to cloudinary

            const imageData = [];
            for (let i = 0; i < images.length; i++) {
                const data = await uploadToCloudinary(images[i]);
                imageData.push(data);
            }

            const newProduct = {
                ...values,
                slug: slugify(values.title),
                images: imageData,
            };
            const { data } = await axios.post("/api/products", newProduct);
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
                onSubmit={form.handleSubmit(createProduct)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Titre <span className="text-red-600">*</span>
                            </FormLabel>
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
                            <FormLabel>
                                Prix <span className="text-red-600">*</span>
                            </FormLabel>
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
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisissez une catégorie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(allCategories || []).map((category) => (
                                        <SelectItem value={category._id}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Quantité <span className="text-red-600">*</span>
                            </FormLabel>
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
                            <FormLabel>
                                Priorité <span className="text-red-600">*</span>
                            </FormLabel>
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
                    name="images"
                    render={() => (
                        <FormItem>
                            <FormLabel>
                                Images <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setImages(e.target.files)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description{" "}
                                <span className="text-red-600">*</span>
                            </FormLabel>
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

                <Button
                    className="w-40"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                >
                    {form.formState.isSubmitting ? (
                        <LoadingSpinner />
                    ) : (
                        "Publier le produit"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ProductForm;
