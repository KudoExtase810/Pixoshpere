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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type SortingMethods = { label: string; value: keyof Order }[];

const OrderFilters = () => {
    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";
    const query = searchParams.get("q") || "";
    const showDelivered = searchParams.get("showDelivered");

    const [storedQuery, setStoredQuery] = useState(query);

    const router = useRouter();

    const sortingMethods: SortingMethods = [
        { label: "Date", value: "createdAt" },
        { label: "Total", value: "total" },
    ];

    return (
        <div className="py-4 space-y-4">
            <div className="flex justify-between">
                <div className="relative w-80">
                    <Input
                        type="text"
                        value={storedQuery}
                        onChange={(e) => setStoredQuery(e.target.value)}
                        placeholder="Search customers..."
                    />
                    <Link
                        className="absolute top-2.5 right-2.5 text-zinc-700"
                        href={`?q=${storedQuery}&showDelivered=${showDelivered}&sortBy=${sortBy}`}
                    >
                        <Search size={20} />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Select
                        defaultValue={sortBy}
                        onValueChange={(value) =>
                            router.push(
                                `?q=${query}&showDelivered=${showDelivered}&sortBy=${value}`
                            )
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
                    checked={showDelivered === "true"}
                    onCheckedChange={(value) =>
                        router.push(
                            `?q=${query}&showDelivered=${value}&sortBy=${sortBy}`
                        )
                    }
                />
                <Label htmlFor="airplane-mode">Show Delivered</Label>
            </div>
        </div>
    );
};

export default OrderFilters;
