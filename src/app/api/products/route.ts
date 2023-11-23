import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

// Create a new product
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const newProduct = await Product.create(body);

        return NextResponse.json(
            { message: "New product created successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        // In case
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
