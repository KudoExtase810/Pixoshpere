"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { useDrawer } from "@/contexts/DrawerContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SortingMethods = {
    product: { label: string; value: keyof Product }[];
    category: { label: string; value: keyof Category }[];
    order: { label: string; value: keyof Order }[];
    user: { label: string; value: keyof User }[];
    coupon: { label: string; value: keyof Coupon }[];
};

interface props {
    type: "product" | "category" | "order" | "user" | "coupon";
}

const AdminFilters = ({ type }: props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");

    const { toggle } = useDrawer();
    const router = useRouter();

    const isCreatable =
        type === "category" || type === "product" || type === "coupon";

    const sortingMethods: SortingMethods = {
        product: [
            { label: "Date", value: "createdAt" },
            { label: "Category", value: "category" },
            { label: "Price", value: "price" },
            { label: "Sale Price", value: "salePrice" },
            { label: "Sales", value: "sales" },
            { label: "Quantity", value: "quantity" },
        ],
        category: [
            { label: "Products contained", value: "productCount" },
            { label: "Date", value: "createdAt" },
            { label: "Label", value: "label" },
        ],
        order: [
            { label: "Customer", value: "customer" },
            { label: "Ordered On", value: "createdAt" },
            { label: "Payment Method", value: "paymentMethod" },
            { label: "Total", value: "total" },
            { label: "Status", value: "status" },
        ],
        user: [
            { label: "X", value: "X" },
            { label: "X", value: "X" },
            { label: "X", value: "X" },
        ],
        coupon: [
            { label: "Code", value: "code" },
            { label: "Discounted amount", value: "X" },
            { label: "X", value: "X" },
        ],
    };

    const correctTypes = [
        "product",
        "category",
        "order",
        "customer",
        "user",
        "coupon",
    ];
    if (!correctTypes.includes(type))
        throw new Error(
            "Wrong type or no type prop was passed to the AdminFilters component."
        );

    const handleFilter = () => {
        const searchParams = new URLSearchParams();
        if (searchQuery) searchParams.set("q", searchQuery.toLowerCase());
        else searchParams.delete("q");

        if (sortBy) searchParams.set("sortBy", sortBy);
        else searchParams.delete("sortBy");

        // Generate the new pathname with the updated search params
        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`;

        router.push(newPathname, { scroll: false });
    };

    const clearFilters = () => {
        //
    };

    useEffect(() => {
        sortBy && handleFilter();
    }, [sortBy]);

    return (
        <div className="flex justify-between py-4">
            <div className="relative w-80">
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un produit..."
                />
                <button
                    className="absolute top-2.5 right-2.5 text-zinc-700"
                    onClick={handleFilter}
                >
                    <Search size={20} />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <Select onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger className="w-72">
                        <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {sortingMethods[type].map((method) => (
                                <SelectItem value={method.value}>
                                    {method.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {isCreatable && (
                    <Button
                        variant="secondary"
                        className="hover:text-cyan-500"
                        onClick={() => toggle(type)}
                    >
                        <Plus size={28} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AdminFilters;
