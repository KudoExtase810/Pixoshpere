import Product from "@/models/product";
import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page") || "1");
        const limit = 10;
        const skip = (page - 1) * limit;
        const query = searchParams.get("q");
        const sortBy = searchParams.get("sortBy");

        const queryObj: any = {};
        if (query) {
            queryObj.title = { $regex: query, $options: "i" };
        }

        const sortObj: any = {};
        if (sortBy) {
            sortObj[sortBy] = 1;
        }

        const products = await Product.find(queryObj)
            .limit(limit)
            .skip(skip)
            .sort(sortObj)
            .populate("category");

        console.log(products);

        const totalDocs = await Product.countDocuments(queryObj);

        return NextResponse.json({ products, totalDocs }, { status: 200 });
    } catch (error: any) {
        console.log(error);
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
