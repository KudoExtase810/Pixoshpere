import BlurImage from "@/components/BlurImage";
import FormatPricing from "@/components/FormatPricing";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import Link from "next/link";

const Home = async () => {
    await connectDB();
    const products = (await Product.find({ isHidden: false })
        .limit(12)
        .sort({ createdAt: "descending" })
        .populate("category")
        .select("-description")) as Product<Category>[];
    return (
        <div>
            <ul className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <li>
                        <Link href={product.slug} className="group">
                            <BlurImage
                                src={product.images[0].url}
                                alt={product.title}
                            />
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
                ))}
            </ul>
        </div>
    );
};
export default Home;
