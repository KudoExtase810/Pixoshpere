import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import BlurImage from "../BlurImage";
import LoadingSpinner from "../LoadingSpinner";
import { useDebouncedCallback } from "use-debounce"; // Import the debouncing hook
import { formatPrice } from "@/lib/utils";

const TopSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [foundProducts, setFoundProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Use the debounced callback to debounce the search query
    const debouncedFetchProducts = useDebouncedCallback(
        async (query: string) => {
            try {
                if (query.trim() !== "") {
                    setIsLoading(true);
                    const { data } = await axios.get(
                        `/api/products?q=${query}`
                    );
                    setFoundProducts(data.products);
                } else {
                    setFoundProducts([]); // Clear the results when the search query is empty
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(
                    "Error fetching results in the top-search bar:",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        },
        500
    );

    // Use the debounced callback on searchQuery change
    useEffect(() => {
        debouncedFetchProducts(searchQuery);
    }, [searchQuery, debouncedFetchProducts]);

    return (
        <div className="relative">
            <form onSubmit={(e) => e.preventDefault()}>
                {" "}
                {/* Wrap the input in a form to handle submission */}
                <Input
                    placeholder="Search for products..."
                    type="text"
                    className="bg-white w-80 border-neutral-300 dark:border-neutral-500 text-zinc-950"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

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
                                                    {formatPrice(
                                                        prod.salePrice ||
                                                            prod.price
                                                    )}
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
