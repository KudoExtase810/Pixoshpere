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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minPrice: 0,
            maxPrice: highestPrice,
            onSaleOnly: false,
            hideOutOfStock: false,
        },
    });

    const applyFilters = () => {
        //
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
