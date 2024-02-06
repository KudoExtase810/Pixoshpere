import Services from "@/components/customer/home/Services";
import HeroBanners from "@/components/customer/home/HeroBanners";
import Partners from "@/components/customer/home/Partners";
import ProductsCarousel from "@/components/customer/ProductsCarousel";
import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import FAQ from "@/components/customer/home/FAQ";

const Home = async () => {
    await connectDB();
    const featuredProducts = await Product.find({
        isFeatured: true,
        isHidden: false,
    })
        .sort({
            priority: "ascending",
        })
        .select("-description")
        .lean();

    return (
        <>
            <HeroBanners />
            <div className="container">
                <ProductsCarousel
                    title="Featured Products"
                    products={JSON.parse(JSON.stringify(featuredProducts))}
                />
                <Services />
                <FAQ />
                <Partners />
            </div>
        </>
    );
};
export default Home;
