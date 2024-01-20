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

import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductFilters {
    allCategories: Category[];
}

const ProductsFilters = ({ allCategories }: ProductFilters) => {
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);

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
                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="lg:max-w-md">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
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
            </div>
        </form>
    );
};

export default ProductsFilters;
