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

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const newCategoryData: Category = await request.json();

        await connectDB();
        const category = await Category.findByIdAndUpdate(
            params.id,
            newCategoryData,
            { runValidators: true }
        );

        if (!category) {
            return NextResponse.json(
                { message: "Category not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Category updated with success." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const category = await Category.findByIdAndDelete(params.id);

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
