import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/connectdb";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const namesInUse = await User.exists({
            firstName: body.firstName,
            lastName: body.lastName,
        });
        if (namesInUse)
            return NextResponse.json(
                {
                    message:
                        "The combination of this first & last name already exists.",
                },
                { status: 409 }
            );

        const emailInUse = await User.exists({ email: body.email });
        if (emailInUse)
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 }
            );

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        await User.create({ ...body, password: hashedPassword });

        return NextResponse.json(
            { message: "User has been registered." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
