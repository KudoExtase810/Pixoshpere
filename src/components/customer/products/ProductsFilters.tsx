"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "@/contexts/ProductFiltersContext";

interface ProductFilters {
    allCategories: Pick<Category, "label" | "_id">[];
}

const ProductsFilters = ({ allCategories }: ProductFilters) => {
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);

    const { open: showFiltersDrawer } = useProductFilters();

    const router = useRouter();

    const handleFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);

        if (query) searchParams.set("q", query.toLowerCase());
        else searchParams.delete("q");

        if (category) searchParams.set("category", category);
        else searchParams.delete("category");

        // Generate the new pathname with the updated search params
        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`;

        router.push(newPathname, { scroll: false });
    };

    useEffect(() => {
        if (category) {
            handleFilter();
        }
    }, [category]);

    return (
        <form className="mb-6">
            <div className="flex max-lg:flex-col-reverse max-lg:gap-4 items-center justify-between">
                <div className="lg:max-w-md w-full relative">
                    <Input
                        type="text"
                        placeholder="Search for a product..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <button
                        type="button"
                        className="absolute right-2.5 top-2.5"
                        onClick={handleFilter}
                    >
                        <Search size={20} />
                    </button>
                </div>
                <div className="flex gap-2 max-lg:w-full">
                    <Select onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger className="w-full lg:w-96">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent
                            // https://github.com/radix-ui/primitives/issues/1658
                            ref={(ref) =>
                                ref?.addEventListener("touchend", (e) =>
                                    e.preventDefault()
                                )
                            }
                        >
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {allCategories.map((category) => (
                                    <SelectItem
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        type="button"
                        variant="secondary"
                        className="hover:text-teal-500"
                        onClick={showFiltersDrawer}
                    >
                        <ListFilter size={28} />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ProductsFilters;
