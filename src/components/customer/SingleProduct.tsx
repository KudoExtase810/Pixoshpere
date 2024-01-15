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
                        variant={"default"}
                        className="absolute top-3 right-3 z-[5]"
                    >
                        {calcPercentageReduction(
                            product.price,
                            product.salePrice
                        )}
                    </Badge>
                )}
                <BlurImage src={product.images[0].url} alt={product.title} />
                <div className="flex items-center justify-between px-2 mt-2">
                    <h3 className="text-sm font-medium truncate">
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
                className="absolute rounded-sm bg-cyan-500 hover:bg-cyan-600 text-white left-1/2 -translate-x-1/2 z-10 w-[96%] text-center bottom-11 transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
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
