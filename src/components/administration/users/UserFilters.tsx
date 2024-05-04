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
import { Link } from "@/lib/navigation";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type SortingMethods = { label: string; value: keyof User }[];

interface UserFiltersProps {
    role: "admin" | "customer";
}

const UserFilters = ({ role }: UserFiltersProps) => {
    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") || ("createdAt" as keyof User);
    const query = searchParams.get("q") || "";

    const [storedQuery, setStoredQuery] = useState(query);

    const router = useRouter();

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
                    value={storedQuery}
                    onChange={(e) => setStoredQuery(e.target.value)}
                    placeholder="Search by email..."
                />
                <Link
                    className="absolute top-2.5 right-2.5 text-zinc-700"
                    href={`?q=${storedQuery}&sortBy=${sortBy}&role=${role}`}
                >
                    <Search size={20} />
                </Link>
            </div>
            <div className="flex items-center gap-3">
                <Select
                    defaultValue={sortBy}
                    onValueChange={(value) =>
                        router.push(`?q=${query}&sortBy=${value}&role=${role}`)
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
    );
};

export default UserFilters;
