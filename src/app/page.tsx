import Services from "@/components/customer/home/Services";
import ImageCarousel from "@/components/customer/home/ImageCarousel";
import Partners from "@/components/customer/home/Partners";
import ProductsCarousel from "@/components/customer/ProductsCarousel";
import Product from "@/models/product";
import connectDB from "@/lib/connectdb";

const Home = async () => {
    await connectDB();
    const products = await Product.find().populate("category");

    return (
        <>
            <ImageCarousel />
            <div className="container">
                <Services />
                <Partners />
                <ProductsCarousel
                    title="Featured Products"
                    products={JSON.parse(JSON.stringify(products))}
                />
            </div>
        </>
    );
};
export default Home;
