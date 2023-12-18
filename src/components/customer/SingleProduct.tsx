"use client";

import Link from "next/link";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "../FormatPricing";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
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
        <li className={cn("relative group", className)}>
            <Link href={product.slug} className="">
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
                className="absolute block ml-3 z-10 w-11/12 text-center shadow-xl bottom-12 transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                onClick={() =>
                    alreadyInCart ? removeItem(product._id) : addItem(product)
                }
            >
                {alreadyInCart ? "Remove from Cart" : "Add to Cart"}
            </Button> */}
            <Button
                className="absolute z-10 rounded-full shadow-xl p-2 h-14 w-14 bottom-12 right-4 transition-all duration-700 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                onClick={() =>
                    alreadyInCart ? removeItem(product._id) : addItem(product)
                }
            >
                {alreadyInCart ? <Icons.CartMinus /> : <Icons.CartPlus />}
            </Button>
        </li>
    );
};

export default SingleProduct;
