import connectDB from "@/lib/connectdb";
import Order from "@/models/order";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();

        const orderData = await request.json();

        const { products, appliedCoupon, tax, shippingCost } = orderData as {
            products: { id: string; quantity: number }[];
            customer: string;
            appliedCoupon?: string;
            tax: number;
            shippingCost: number;
            details: {
                streetAddress: string;
                city: string;
                zipCode: string;
            };
        };

        // fetch the purchased products from the db
        const productIds = products.map((product) => product.id);
        const purchasedProducts = (await Product.find({
            _id: { $in: productIds },
        })
            .select("price salePrice")
            .lean()) as Product[];

        // calculate the total
        let total = 0;
        purchasedProducts.forEach((purchasedProduct) => {
            const matchingProduct = products.find(
                (product) =>
                    product.id.toString() === purchasedProduct._id.toString()
            )!;

            const quantityOrdered = matchingProduct?.quantity;
            const currentItemPrice =
                purchasedProduct.salePrice || purchasedProduct.price;

            total += currentItemPrice * quantityOrdered;
        });
        // add the taxes + shpping cost
        total += tax + shippingCost;

        // apply the coupon if provided
        if (appliedCoupon) {
            total = 6900;
        }

        await Order.create({ ...orderData, products: productIds, total });

        // Increment sales for each product & decrement the quantity
        for (let i = 0; i < purchasedProducts.length; i++) {
            const purchasedProduct = purchasedProducts[i];
            const matchingProduct = products.find(
                (product) =>
                    product.id.toString() === purchasedProduct._id.toString()
            )!;

            const quantityOrdered = matchingProduct?.quantity;

            await Product.updateOne(
                { _id: purchasedProduct._id },
                {
                    $inc: {
                        quantity: -quantityOrdered,
                        sales: quantityOrdered,
                    },
                }
            );
        }

        return NextResponse.json(
            { message: "Your order has been submitted." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
