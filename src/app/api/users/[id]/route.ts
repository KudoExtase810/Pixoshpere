import connectDB from "@/lib/connectdb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const newData: User = await request.json();

        await connectDB();
        const user = await User.findByIdAndUpdate(params.id, newData, {
            runValidators: true,
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User updated with success." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
