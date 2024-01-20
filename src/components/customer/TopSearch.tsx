import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce"; // Import the debouncing hook
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const TopSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [foundProducts, setFoundProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const debouncedFetchProducts = useDebouncedCallback(
        async (query: string) => {
            try {
                if (query.trim() !== "") {
                    setIsLoading(true);
                    const { data } = await axios.get(
                        `/api/products?query=${query}`
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
        800
    );

    useEffect(() => {
        debouncedFetchProducts(searchQuery);
    }, [searchQuery, debouncedFetchProducts]);

    return (
        <div className="relative">
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
                <div className="fade-in-60 transition-all animate-in absolute stext-primary-foreground sbg-foreground rounded-md w-full mt-1 p-1 border bg-background drop-shadow-md">
                    {isLoading ? (
                        <LoadingSkeletons />
                    ) : foundProducts?.length === 0 ? (
                        <div className="flex h-16 items-center justify-center">
                            No results found.
                        </div>
                    ) : (
                        <FoundProducts products={foundProducts ?? []} />
                    )}
                </div>
            )}
        </div>
    );
};

export default TopSearch;

const FoundProducts = ({ products }: { products: Product[] }) => {
    return (
        <ScrollArea>
            <ul className="flex flex-col gap-1 max-h-96">
                {products.map((prod) => (
                    <li key={prod._id}>
                        <Link
                            href={`/products/${prod.slug}`}
                            className="flex gap-2 hover:bg-accent p-1.5 rounded-md transition duration-300"
                        >
                            <Image
                                className="rounded-md"
                                quality={100}
                                unoptimized
                                height={64}
                                width={64}
                                src={prod.images[0].url}
                                alt={prod.title}
                            />
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-base truncate max-w-[160px]">
                                        {prod.title}
                                    </p>
                                    <p>
                                        {formatPrice(
                                            prod.salePrice || prod.price
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
        </ScrollArea>
    );
};

const LoadingSkeletons = () => {
    return (
        <div className="flex flex-col gap-1">
            {[...new Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-2 p-1.5 rounded-md">
                    <Skeleton className="min-w-[64px] min-h-[64px]" />
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <Skeleton className="w-1/2 h-4 rounded-sm" />
                            <Skeleton className="w-1/4 h-4 rounded-sm" />
                        </div>
                        <Skeleton className="w-1/3 h-4 rounded-sm mt-3" />
                    </div>
                </div>
            ))}
        </div>
    );
};
