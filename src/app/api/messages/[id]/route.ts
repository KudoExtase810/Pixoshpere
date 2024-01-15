import connectDB from "@/lib/connectdb";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const message = await Message.findByIdAndDelete(params.id);

        if (!message) {
            return NextResponse.json(
                { message: "Message not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Message deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
