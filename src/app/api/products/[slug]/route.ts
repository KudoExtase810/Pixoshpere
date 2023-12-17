import connectDB from "@/lib/connectdb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function DELETE(
    _request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const product = await Product.findOneAndDelete({ slug: params.slug });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
