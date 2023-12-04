import BlurImage from "@/components/BlurImage";
import FormatPricing from "@/components/FormatPricing";
import SingleProduct from "@/components/SingleProduct";
import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import Link from "next/link";

const Home = async () => {
    await connectDB();
    const products = (await Product.find({ isHidden: false })
        .limit(12)
        .sort({ createdAt: "descending" })
        .populate("category")
        .select("-description")) as Product[];
    return (
        <div>
            <ul className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <SingleProduct
                        key={product._id}
                        product={JSON.parse(JSON.stringify(product))}
                    />
                ))}
            </ul>
        </div>
    );
};
export default Home;
