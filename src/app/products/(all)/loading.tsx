import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductsLoading = () => {
    return (
        <div className="container">
            <h1 className="page-title">All products</h1>

            <div className="flex max-lg:flex-col-reverse max-lg:gap-4 items-center justify-between mb-6">
                <Skeleton className="w-full lg:max-w-md h-9" />
                <Skeleton className="w-full lg:max-w-md h-9" />
            </div>
            <div className="mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {[...new Array(12)].map((_, idx) => (
                    <div className="flex flex-col gap-1.5" key={idx}>
                        <Skeleton className="aspect-1 rounded-md mb-1" />
                        <Skeleton className="rounded-sm w-4/5 h-5" />
                        <Skeleton className="rounded-sm w-2/5 h-5" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsLoading;
