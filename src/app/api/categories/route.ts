import Category from "@/models/category";
import connectDB from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const newCategory = await Category.create(body);

        return NextResponse.json(
            { message: "New category created successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
