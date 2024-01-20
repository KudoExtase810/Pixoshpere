import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { uploadImage } from "@/lib/image-uploader";

import axios, { isAxiosError } from "axios";

import TextEditor from "../TextEditor";
import LoadingSpinner from "../../LoadingSpinner";
import { useRouter } from "next/navigation";
import { useActionData } from "@/contexts/ActionContext";
import SortableImages from "./SortableImages";

const formSchema = z.object({
    title: z
        .string()
        .min(6, "The title must be at least 6 characters long")
        .max(64, "The title cannot exceed 64 characters"),
    price: z.coerce
        .number({
            invalid_type_error: "This field must be a number",
        })
        .min(0, "The price must be greater than or equal to zero")
        .max(500000, "The price cannot exceed 500,000"),
    salePrice: z.coerce
        .number({ invalid_type_error: "This field must be a number" })
        .min(0, "The sale price must be greater than or equal to zero")
        .max(500000, "The sale price cannot exceed 500,000")
        .optional(),
    category: z
        .string()
        .min(2, "This field is required")
        .max(36, "The category cannot exceed 36 characters"),
    quantity: z.coerce
        .number({
            invalid_type_error: "This field must be a number",
        })
        .min(0, "The quantity must be greater than or equal to zero")
        .max(500, "The quantity cannot exceed 500"),
    priority: z.coerce
        .number({
            invalid_type_error: "This field must be a number",
        })
        .min(0, "The priority must be greater than or equal to zero")
        .max(2500, "The priority cannot exceed 2500"),
    description: z
        .string()
        .min(36, "The description must be at least 36 characters long")
        .max(2048, "The description cannot exceed 2048 characters"),
    isHidden: z.boolean(),
});

interface props {
    toggleDrawer: () => void;
    allCategories: Category[];
}

const ProductForm = ({ toggleDrawer, allCategories }: props) => {
    const router = useRouter();

    const [loadingImgCount, setLoadingImgCount] = useState<number>(0);
    const [loadedImages, setLoadedImages] = useState<Product["images"]>([]);

    const { actionData: selectedProduct } = useActionData() as {
        actionData: Product;
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: selectedProduct?.title ?? "",
            price: selectedProduct?.price,
            salePrice: selectedProduct?.salePrice || 0,
            category: selectedProduct?.category?._id ?? "",
            quantity: selectedProduct?.quantity ?? 1,
            priority: selectedProduct?.priority ?? 0,
            description: selectedProduct?.description ?? "",
            isHidden: selectedProduct?.isHidden ?? false,
        },
    });

    const isEditMode = selectedProduct !== null;

    const handleImgUpload = async (images: FileList) => {
        setLoadingImgCount(images.length);
        const imageData = [];
        for (let i = 0; i < images.length; i++) {
            const data = await uploadImage(images[i]);
            imageData.push(data);
        }
        setLoadedImages([...loadedImages, ...imageData]);
        setLoadingImgCount(0);
    };

    useEffect(() => {
        if (selectedProduct) {
            setLoadedImages(selectedProduct.images);
        }
    }, [selectedProduct]);

    const createProduct = async (values: z.infer<typeof formSchema>) => {
        try {
            if (values.salePrice && values.price <= values.salePrice)
                return notifyError(
                    "The sale price must be less than the regular price."
                );

            if (!loadedImages.length)
                return notifyError(
                    "You must add at least 1 image to your product."
                );

            const newProduct = {
                ...values,
                slug: slugify(values.title),
                images: loadedImages,
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
                    "The sale price must be less than the regular price."
                );

            if (!loadedImages.length)
                return notifyError(
                    "You must add at least 1 image to your product."
                );

            const newProduct = {
                ...values,
                slug: slugify(values.title),
                images: loadedImages,
            };
            const { data } = await axios.put(
                `/api/products/${selectedProduct?._id}`,
                newProduct
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
                    isEditMode ? updateProduct : createProduct
                )}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Title <span className="text-red-600">*</span>
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
                                Price <span className="text-red-600">*</span>
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
                            <FormLabel>Sale price</FormLabel>
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
                            <FormLabel>Category</FormLabel>
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
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                        >
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
                                Quantity <span className="text-red-600">*</span>
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
                                Priority <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                L&apos;ordre d&apos;affichage du produit dans la
                                liste.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="images"
                    render={() => (
                        <FormItem className="relative">
                            <FormLabel>
                                Image(s) <span className="text-red-600">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*, .gif"
                                    multiple
                                    onChange={(e) =>
                                        handleImgUpload(e.target.files!)
                                    }
                                />
                            </FormControl>
                            <SortableImages
                                loadingImgCount={loadingImgCount}
                                images={loadedImages}
                                setImages={setLoadedImages}
                            />
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
                                <FormLabel>Hide this product.</FormLabel>
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
                        "Publish product"
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ProductForm;
