"use client";

import Link from "next/link";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "../FormatPricing";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const SingleProduct = ({
    product,
    className,
}: {
    product: Product;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
    const { addItem } = useCart();

    return (
        <li className={cn("relative", className)}>
            <Link
                href={product.slug}
                className="group"
                onClick={() => addItem(product)}
            >
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
                <button className="absolute w-full bg-orange-600 py-3 rounded-b-md bottom-9 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                    Add to Cart
                </button>
            </Link>
        </li>
    );
};

export default SingleProduct;
