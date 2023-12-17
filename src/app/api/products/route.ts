import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        await Product.create(body);

        return NextResponse.json(
            { message: "New product created successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
