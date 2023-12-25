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

interface props {
    type: "product" | "category" | "order" | "user" | "coupon";
}

const Filters = ({ type }: props) => {
    const { toggle } = useDrawer();

    const isControllable =
        type === "category" || type === "product" || type === "coupon";

    const sortingMethods = {
        product: [
            { label: "Category", value: "categories" },
            { label: "Price", value: "price" },
            { label: "Sale Price", value: "salePrice" },
            { label: "Sales", value: "sales" },
        ],
        category: [
            { label: "Number of Products", value: "X" },
            { label: "X", value: "X" },
            { label: "X", value: "X" },
        ],
        order: [
            { label: "X", value: "X" },
            { label: "X", value: "X" },
            { label: "X", value: "X" },
        ],
        user: [
            { label: "X", value: "X" },
            { label: "X", value: "X" },
            { label: "X", value: "X" },
        ],
        coupon: [
            { label: "X", value: "X" },
            { label: "X", value: "X" },
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
            "Wrong type or no type prop was passed to the Filters component."
        );

    return (
        <div className="flex justify-between py-4">
            <div className="relative w-80">
                <Input type="text" placeholder="Rechercher un produit..." />
                <Search
                    size={20}
                    className="absolute top-2.5 right-2.5 text-zinc-700"
                />
            </div>
            <div className="flex items-center gap-3">
                <Select>
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
                {isControllable && (
                    <Button
                        variant="secondary"
                        className="hover:text-orange-500"
                        onClick={() => toggle(type)}
                    >
                        <Plus size={28} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Filters;
