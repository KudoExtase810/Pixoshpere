import connectDB from "@/lib/connectdb";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();

        const messageData = await request.json();

        await Message.create(messageData);

        return NextResponse.json(
            {
                message:
                    "Your message has been successfully sent. If a reply is expected, please check your email for updates.",
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
