"use client";

import Link from "next/link";
import BlurImage from "@/components/BlurImage";
import FormatPricing from "../FormatPricing";
import { useCart } from "@/contexts/CartContext";

const SingleProduct = ({
    product,
    className,
}: {
    product: Product;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) => {
    const { addItem } = useCart();

    return (
        <li className={className}>
            <Link
                href={product.slug}
                className="group"
                onClick={() => addItem(product)}
            >
                <BlurImage src={product.images[0].url} alt={product.title} />
                <div className="flex items-center justify-between px-2 mt-2">
                    <h3 className=" text-sm text-gray-700 dark:text-gray-500">
                        {product.title}
                    </h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-700">
                        <FormatPricing
                            price={product.price}
                            salePrice={product.salePrice}
                        />
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default SingleProduct;
