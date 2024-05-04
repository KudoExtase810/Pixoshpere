import { Separator } from "@/components/ui/separator";

import ProductsCarousel from "@/components/customer/ProductsCarousel";
import { Skeleton } from "@/components/ui/skeleton";

const ProductPage = () => {
    return (
        <div className="container">
            <div className="flex max-[860px]:flex-col gap-16 max-[860px]:gap-6 py-8">
                <div className="flex gap-5 max-sm:flex-col">
                    <div className="sm:h-[500px]">
                        <div className="grid grid-cols-1 max-sm:grid-cols-4 gap-2 mr-4">
                            {[...new Array(4)].map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    className="rounded-md w-[100px] h-[100px]"
                                />
                            ))}
                        </div>
                    </div>
                    <Skeleton className="w-[500px] max-lg:w-[420px] max-md:w-[500px] aspect-1 max-sm:w-full rounded-md" />
                </div>
                <div>
                    <Skeleton className="h-6 w-[400px] max-w-full rounded-sm mb-2" />
                    <Skeleton className="h-6 w-4/5 mb-4 rounded-sm" />
                    <Skeleton className="h-5 w-2/5 mb-4 rounded-sm" />

                    <div className=" max-w-lg flex flex-col gap-2.5 mb-10">
                        <Skeleton className="h-5 w-full rounded-sm" />
                        <Skeleton className="h-5 w-full rounded-sm" />
                        <Skeleton className="h-5 w-full rounded-sm" />
                        <Skeleton className="h-5 w-full rounded-sm" />
                        <Skeleton className="h-5 w-4/5 rounded-sm" />
                    </div>

                    <Skeleton className="h-4 w-36 mb-4 rounded-sm" />

                    <Skeleton className="h-12 w-48" />
                </div>
            </div>

            <Separator />
            <ProductsCarousel
                title="You may also like"
                products={[]}
                isLoading
            />
        </div>
    );
};

export default ProductPage;
