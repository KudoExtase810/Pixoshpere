import Category from "@/models/category";
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
        const sortBy = searchParams.get("sortBy") || "createdAt";

        const queryObj: any = {};
        if (query) {
            queryObj.label = { $regex: query, $options: "i" };
        }

        const sortObj: any = {};
        if (sortBy) {
            sortObj[sortBy] = 1;
        }

        // we're using aggregate because it allows us to count-
        // the products in each category, without an additional query and logic
        const categories = await Category.aggregate([
            {
                $match: queryObj,
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "products",
                },
            },
            {
                $addFields: {
                    productCount: { $size: "$products" },
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $sort: sortObj,
            },
        ]);

        const totalDocs = await Category.countDocuments(queryObj);

        return NextResponse.json({ categories, totalDocs }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

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
