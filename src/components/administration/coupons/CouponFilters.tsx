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
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type SortingMethods = { label: string; value: keyof Coupon }[];

const CouponFilters = () => {
    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") || ("createdAt" as keyof Coupon);
    const query = searchParams.get("q") || "";

    const [storedQuery, setStoredQuery] = useState(query);

    const router = useRouter();

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
                    value={storedQuery}
                    onChange={(e) => setStoredQuery(e.target.value)}
                    placeholder="Search coupons..."
                />
                <Link
                    className="absolute top-2.5 right-2.5 text-zinc-700"
                    href={`?q=${storedQuery}&sortBy=${sortBy}`}
                >
                    <Search size={20} />
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Select
                    defaultValue={sortBy}
                    onValueChange={(value) =>
                        router.push(`?q=${query}&sortBy=${value}`)
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

                <Button
                    variant="secondary"
                    className="hover:text-teal-500"
                    onClick={() => toggle("coupon")}
                >
                    <Plus size={28} />
                </Button>
            </div>
        </div>
    );
};

export default CouponFilters;
