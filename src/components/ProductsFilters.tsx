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
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ProductsFilters = () => {
    const [query, setQuery] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);

    const router = useRouter();

    const handleFilter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

    return (
        <form onSubmit={handleFilter} className="mb-6">
            <div className="flex max-lg:flex-col max-lg:gap-4 items-center justify-between">
                <div className="lg:max-w-md w-full relative">
                    <Input
                        type="text"
                        placeholder="Search for a product..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <button>
                        <Search
                            size={20}
                            className="absolute right-2.5 top-2.5"
                        />
                    </button>
                </div>
                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="lg:max-w-md">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </form>
    );
};

export default ProductsFilters;
