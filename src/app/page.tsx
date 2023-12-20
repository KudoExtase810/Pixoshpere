import Services from "@/components/customer/home/Services";
import ImageCarousel from "@/components/customer/home/ImageCarousel";
import OurPartners from "@/components/customer/home/OurPartners";
import ProductsCarousel from "@/components/customer/ProductsCarousel";
import Product from "@/models/product";
import connectDB from "@/lib/connectdb";

const Home = async () => {
    await connectDB();
    const products = await Product.find();
    return (
        <>
            <ImageCarousel />
            <div className="container">
                <Services />
                <OurPartners />
                <ProductsCarousel
                    products={JSON.parse(JSON.stringify(products))}
                />
            </div>
        </>
    );
};
export default Home;
