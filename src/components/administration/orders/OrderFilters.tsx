"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type SortingMethods = { label: string; value: keyof Order }[];

const OrderFilters = () => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<keyof Order>("createdAt");
    const [showDelivered, setShowDelivered] = useState(false);

    const router = useRouter();

    const sortingMethods: SortingMethods = [
        { label: "Date", value: "createdAt" },
        { label: "Total", value: "total" },
    ];

    useEffect(() => {
        const searchParams = new URLSearchParams();
        searchParams.set("showDelivered", `${showDelivered}`);
        const newUrl = `/administration/orders?` + searchParams.toString();
        router.push(newUrl);
    }, [showDelivered]);

    return (
        <div className="py-4 space-y-4">
            <div className="flex justify-between">
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
                        onValueChange={(value) =>
                            setSortBy(value as keyof Order)
                        }
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
            <div className="flex items-center gap-2 ml-auto w-fit">
                <Switch
                    id="airplane-mode"
                    checked={showDelivered}
                    onCheckedChange={(newValue) => setShowDelivered(newValue)}
                />
                <Label htmlFor="airplane-mode">Show Delivered</Label>
            </div>
        </div>
    );
};

export default OrderFilters;
