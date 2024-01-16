import connectDB from "@/lib/connectdb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const user = await User.findById<User>(params.id).select(
            "firstName lastName email phone"
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
