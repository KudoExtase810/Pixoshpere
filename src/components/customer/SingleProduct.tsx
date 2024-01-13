"use client";

import Link from "next/link";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "../FormatPricing";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Icons from "../AdditionalIcons";

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
                <BlurImage src={product.images[0].url} alt={product.title} />
                <div className="flex items-center justify-between px-2 mt-2">
                    <h3 className="text-sm font-medium">{product.title}</h3>
                    <p className="text-lg">
                        <FormatPricing
                            price={product.price}
                            salePrice={product.salePrice}
                        />
                    </p>
                </div>
            </Link>
            {/* <Button
                className="absolute z-10 w-[98%] text-center shadow-xl bottom-12 transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                onClick={() =>
                    alreadyInCart ? removeItem(product._id) : addItem(product)
                }
            >
                {alreadyInCart ? "Remove from Cart" : "Add to Cart"}
            </Button> */}
            <Button
                className={cn(
                    "absolute bg-opacity-90 hover:bg-opacity-100 z-10 rounded-full shadow-xl p-2 h-14 w-14 bottom-12 right-4 transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-blue-600 hover:bg-blue-700",
                    alreadyInCart && "bg-red-600 hover:bg-red-700"
                )}
                onClick={() =>
                    alreadyInCart ? removeItem(product._id) : addItem(product)
                }
            >
                {alreadyInCart ? <Icons.CartMinus /> : <Icons.CartPlus />}
            </Button>
        </div>
    );
};

export default SingleProduct;
