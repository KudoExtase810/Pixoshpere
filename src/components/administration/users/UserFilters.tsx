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

type SortingMethods = { label: string; value: keyof User }[];

const UserFilters = () => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof User>("createdAt");

    const sortingMethods: SortingMethods = [
        { label: "Join date", value: "createdAt" },
        { label: "Email", value: "email" },
        { label: "First name", value: "firstName" },
        { label: "Last name", value: "lastName" },
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
                    onValueChange={(value) => setSortBy(value as keyof User)}
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

export default UserFilters;
