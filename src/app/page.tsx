import Services from "@/components/customer/home/Services";
import HeroBanners from "@/components/customer/home/HeroBanners";
import Partners from "@/components/customer/home/Partners";
import ProductsCarousel from "@/components/customer/ProductsCarousel";
import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import { getServerSession } from "next-auth";

const Home = async () => {
    await connectDB();
    const products = await Product.find().populate("category");

    const session = await getServerSession();
    console.log(session.user);
    return (
        <>
            <HeroBanners />
            <div className="container">
                <Services />
                <ProductsCarousel
                    title="Featured Products"
                    products={JSON.parse(JSON.stringify(products))}
                />
                <Partners />
            </div>
        </>
    );
};
export default Home;
