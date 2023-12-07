import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BlurImage from "../BlurImage";
import settings from "@/settings/index.json";
import LoadingSpinner from "../LoadingSpinner";

// todo: maybe using shadcn's popover here?

const TopSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [foundProducts, setFoundProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delayedFetch = setTimeout(() => {
            if (searchQuery.trim() !== "") {
                setIsLoading(true);
                fetchProducts();
            } else {
                setFoundProducts([]); // Clear the results when the search query is empty
                setIsLoading(false);
            }
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(delayedFetch); // Cleanup the timeout on component unmount or when the search query changes
    }, [searchQuery]);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`/api/products?q=${searchQuery}`);
            setFoundProducts(data.products);
        } catch (error) {
            console.error(
                "Error fetching results in the top-search bar:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
                placeholder="Search for products..."
                type="text"
                className="bg-white w-80 border-neutral-300 dark:border-neutral-500 text-zinc-950"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Search
                size={19}
                className="absolute top-2.5 right-2.5 text-zinc-700"
            />

            {searchQuery.trim() && (
                <div className="fade-in-60 transition-all animate-in absolute stext-primary-foreground sbg-foreground rounded-md w-full mt-1 p-2 border bg-background drop-shadow-md">
                    {isLoading ? (
                        <div className="flex h-12 items-center justify-center">
                            <LoadingSpinner size={28} />
                        </div>
                    ) : foundProducts?.length === 0 ? (
                        <div className="flex h-12 items-center justify-center">
                            No results found.
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {(foundProducts ?? []).map((prod) => (
                                <li>
                                    <Link
                                        href={`/products/${prod.slug}`}
                                        className="flex gap-2 hover:bg-accent p-1.5 rounded-md transition duration-300"
                                    >
                                        <div className="w-16">
                                            <BlurImage
                                                src={prod.images[0].url}
                                                alt={prod.title}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-base">
                                                    {prod.title}
                                                </p>
                                                <p>
                                                    {settings.currency}
                                                    {prod.salePrice ||
                                                        prod.price}
                                                </p>
                                            </div>
                                            <p className="text-neutral-500">
                                                {prod.category.label}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopSearch;
