import connectDB from "@/lib/connectdb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const category = await Category.findById(params.id);

        if (!category) {
            return NextResponse.json(
                { message: "Category not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(category, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const category = await Category.findOneAndDelete({ slug: params.slug });

        if (!category) {
            return NextResponse.json(
                { message: "Category not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Category deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
