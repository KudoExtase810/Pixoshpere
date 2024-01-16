"use client";

import Link from "next/link";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "../FormatPricing";
import { useCart } from "@/contexts/CartContext";
import { calcPercentageReduction, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

const SingleProduct = ({
    product,
    className,
}: {
    product: Product;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
    const { addItem, inCart, removeItem } = useCart();
    const alreadyInCart = inCart(product._id);

    return (
        <div className={cn("relative group", className)}>
            <Link href={`/products/${product.slug}`}>
                {product.salePrice && (
                    <Badge
                        variant={"sale"}
                        className="absolute top-3 right-3 z-[5]"
                    >
                        {calcPercentageReduction(
                            product.price,
                            product.salePrice
                        )}
                    </Badge>
                )}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <BlurImage
                        fill
                        src={product.images[0].url}
                        alt={product.title}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <h3 className="font-medium truncate max-w-full">
                        {product.title}
                    </h3>
                    <p className="text-lg">
                        <FormatPricing
                            price={product.price}
                            salePrice={product.salePrice}
                        />
                    </p>
                </div>
            </Link>
            <Button
                variant="default"
                className="absolute rounded-sm bg-cyan-500 hover:bg-cyan-600 text-white left-1/2 -translate-x-1/2 z-10 w-[96%] text-center bottom-[68px] transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                onClick={() =>
                    alreadyInCart ? removeItem(product._id) : addItem(product)
                }
            >
                {alreadyInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
        </div>
    );
};

export default SingleProduct;
