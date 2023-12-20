import SingleProduct from "@/components/customer/SingleProduct";
import Product from "@/models/product";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
const Checkout = async ({ params }: { params: { token: string } }) => {
    try {
        const SECRET_KEY = process.env.CHECKOUT_JWT_SECRET;

        if (!SECRET_KEY) {
            console.log("No Checkout JWT SECRET provided.");
            throw new Error("No Checkout JWT SECRET provided.");
        }

        const decoded = jwt.verify(params.token, SECRET_KEY) as {
            data: string;
        };
        const checkoutItemsIds = JSON.parse(decoded.data) as string[];

        const products = await Product.find<Product>({
            _id: { $in: checkoutItemsIds },
        })
            .select("-description")
            .populate("category");
        return (
            <div className="flex flex-col gap-8 container ">
                {products.map((item) => (
                    <div className="w-64">
                        <SingleProduct
                            product={JSON.parse(JSON.stringify(item))}
                        />
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        redirect("/");
    }
};

export default Checkout;
