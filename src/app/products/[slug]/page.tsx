import BlurImage from "@/components/BlurImage";
import axios from "axios";
import settings from "@/settings/index.json";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Star, X } from "lucide-react";
import AddToCart from "@/components/customer/AddToCart";
import SimilarProducts from "@/components/customer/SimilarProducts";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import { redirect } from "next/navigation";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    await connectDB();
    const product = await Product.findOne<Product>({
        slug: params.slug,
    }).populate("category");

    if (!product) redirect("/products");

    return (
        <>
            <div className="grid max-xl:gap-7 sm:grid-cols-2 py-8">
                <div className="w-full max-w-[604px]">
                    <BlurImage
                        src={product.images[0].url}
                        alt={product.title}
                    />
                </div>
                <div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">
                        {product.title}
                    </h1>
                    <div className="mb-4 font-medium">
                        <span
                            className={cn(
                                "inline",
                                product.salePrice &&
                                    "text-neutral-500 line-through"
                            )}
                        >
                            {formatPrice(product.price)}
                        </span>
                        {product.salePrice && (
                            <span className="inline ml-2">
                                {formatPrice(product.salePrice)}
                            </span>
                        )}
                    </div>
                    <div
                        className="max-w-[100vw] break-words"
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    ></div>
                    <div className="flex items-center gap-1.5 mt-4 font-medium text-neutral-600 dark:text-neutral-500">
                        {product.quantity > 0 ? (
                            <>
                                <Check className="text-green-500" /> In stock
                            </>
                        ) : (
                            <>
                                <X className="text-red-500" /> Out of stock
                            </>
                        )}
                    </div>
                    <AddToCart
                        product={JSON.parse(JSON.stringify(product))}
                        className="mt-8"
                    />
                </div>
            </div>
            <Separator />
            <SimilarProducts
                currentProduct={{
                    slug: product.slug,
                    category: product.category._id,
                }}
            />
        </>
    );
};

export default ProductPage;
