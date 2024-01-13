import BlurImage from "@/components/BlurImage";
import { Check, X } from "lucide-react";
import AddToCart from "@/components/customer/AddToCart";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import { redirect } from "next/navigation";
import ProductsCarousel from "@/components/customer/ProductsCarousel";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    await connectDB();
    const product = await Product.findOne<Product>({
        slug: params.slug,
    }).populate("category");

    if (!product) redirect("/products");

    // Find 6 random products with the same category but not the same slug
    const similarProducts = await Product.aggregate([
        {
            $match: {
                category: product.category._id,
                slug: { $ne: product.slug },
            },
        },
        { $sample: { size: 6 } },
    ]);

    return (
        <div className="container">
            <div className="grid max-xl:gap-7 sm:grid-cols-2 py-8">
                <div>
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
            {similarProducts.length ? (
                <>
                    <Separator />
                    <ProductsCarousel
                        title="Similar products"
                        products={similarProducts}
                    />
                </>
            ) : null}
        </div>
    );
};

export default ProductPage;
