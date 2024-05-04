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
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useProductFilters } from "@/contexts/ProductFiltersContext";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";

interface ProductFiltersDrawerProps {
    highestPrice: number;
}

const formSchema = z.object({
    minPrice: z.coerce.number(),
    maxPrice: z.coerce.number(),
    onSaleOnly: z.boolean(),
    hideOutOfStock: z.boolean(),
});

const ProductFiltersDrawer = ({ highestPrice }: ProductFiltersDrawerProps) => {
    const { isOpen, toggle } = useProductFilters();
    const router = useRouter();
    const readOnlySearchParams = useSearchParams();
    const minPrice = Number(readOnlySearchParams.get("min"));
    const maxPrice = Number(readOnlySearchParams.get("max"));
    const hideOutOfStock = Boolean(readOnlySearchParams.get("hide-oos"));
    const onSaleOnly = Boolean(readOnlySearchParams.get("onsale"));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: minPrice ?? 0,
            maxPrice: maxPrice || highestPrice,
            onSaleOnly: onSaleOnly ?? false,
            hideOutOfStock: hideOutOfStock ?? false,
        },
    });

    const applyFilters = (values: z.infer<typeof formSchema>) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (values.minPrice)
            searchParams.set("min", JSON.stringify(values.minPrice));
        else searchParams.set("min", "0");

        if (values.maxPrice)
            searchParams.set("max", JSON.stringify(values.maxPrice));
        else searchParams.delete("max");

        if (values.onSaleOnly)
            searchParams.set("onsale", JSON.stringify(values.onSaleOnly));
        else searchParams.delete("onsale");

        if (values.hideOutOfStock)
            searchParams.set("hide-oos", JSON.stringify(values.hideOutOfStock));
        else searchParams.delete("hide-oos");

        // Generate the new pathname with the updated search params
        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`;

        router.push(newPathname, { scroll: false });
    };

    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent className="max-[500px]:px-3 min-w-[300px] md:min-w-[520px] overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(applyFilters)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="minPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minimum price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="maxPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`${highestPrice}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hideOutOfStock"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <FormLabel className="text-base">
                                        Hide out of stock
                                    </FormLabel>

                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="onSaleOnly"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Show on sale only
                                        </FormLabel>
                                        <FormDescription>
                                            Only show the products that are
                                            currently on sale.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            // disabled={form.formState.isSubmitting}
                            type="submit"
                        >
                            Apply Filters
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};

export default ProductFiltersDrawer;
