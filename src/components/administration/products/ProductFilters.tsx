"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useState } from "react";

type SortingMethods = { label: string; value: keyof Product }[];

const ProductFilters = () => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof Product>("createdAt");

    const sortingMethods: SortingMethods = [
        { label: "Date", value: "createdAt" },
        { label: "Category", value: "category" },
        { label: "Price", value: "price" },
        { label: "Sale Price", value: "salePrice" },
        { label: "Sales", value: "sales" },
        { label: "Quantity", value: "quantity" },
    ];

    return (
        <div className="flex justify-between py-4">
            <div className="relative w-80">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un produit..."
                />
                <button
                    className="absolute top-2.5 right-2.5 text-zinc-700"
                    // onClick={handleFilter}
                >
                    <Search size={20} />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <Select
                    onValueChange={(value) => setSortBy(value as keyof Product)}
                >
                    <SelectTrigger className="w-72">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {sortingMethods.map((method, idx) => (
                                <SelectItem key={idx} value={method.value}>
                                    {method.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ProductFilters;
