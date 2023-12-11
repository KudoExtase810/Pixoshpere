import { cn } from "@/lib/utils";
import Product from "@/models/product";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import SingleProduct from "./SingleProduct";

interface Props {
    currentProduct: { slug: string; category: string };
}

const SimilarProducts = async ({ currentProduct }: Props) => {
    const { slug, category } = currentProduct;

    // Find 6 random products with the same category but not the same slug
    // const similarProducts = await Product.aggregate([
    //     { $match: { category, slug: { $ne: slug } } },
    //     { $sample: { size: 6 } },
    // ]);

    const similarProducts = await Product.find();
    return (
        <section className="py-8">
            <div className="flex justify-between items-center pb-4">
                <h3 className="styled">Similar products</h3>
                <div className="relative">
                    <Link
                        href="/products"
                        className="flex gap-2 items-center peer"
                    >
                        All products <MoveRight size={18} />
                    </Link>
                    <div className="absolute h-[1px] w-[0.01px] peer-hover:w-full bg-primary mt-1 transition-all duration-500"></div>
                </div>
            </div>
            <ul className="flex gap-4">
                {[
                    ...similarProducts,
                    ...similarProducts,
                    ...similarProducts,
                ].map((product) => (
                    <SingleProduct
                        className="w-full"
                        product={JSON.parse(JSON.stringify(product))}
                    />
                ))}
            </ul>
        </section>
    );
};

export default SimilarProducts;
