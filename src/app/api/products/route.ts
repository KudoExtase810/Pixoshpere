import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        const queryObj: any = {};
        if (query && query !== "undefined") {
            queryObj.title = { $regex: query, $options: "i" };
        }

        const products = await Product.find(queryObj)
            .select("title slug category price salePrice images.url")
            .populate("category");
        return NextResponse.json({ products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

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
