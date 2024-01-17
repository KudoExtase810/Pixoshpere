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
import { useDrawer } from "@/contexts/DrawerContext";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type SortingMethods = { label: string; value: keyof Coupon }[];

const CouponFilters = () => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof Coupon>("createdAt");

    const { toggle } = useDrawer();
    const sortingMethods: SortingMethods = [
        { label: "Date", value: "createdAt" },
        { label: "Code", value: "code" },
        { label: "Discount value", value: "discountValue" },
        { label: "Expiration Date", value: "expiresAt" },
        { label: "Times applied", value: "timesApplied" },
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
                    onValueChange={(value) => setSortBy(value as keyof Coupon)}
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

                <Button
                    variant="secondary"
                    className="hover:text-cyan-500"
                    onClick={() => toggle("coupon")}
                >
                    <Plus size={28} />
                </Button>
            </div>
        </div>
    );
};

export default CouponFilters;
