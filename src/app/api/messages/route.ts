import connectDB from "@/lib/connectdb";
import Message from "@/models/message";

export async function POST(request: Request) {
    try {
        await connectDB();

        const messageData = await request.json();

        await Message.create(messageData);

        return Response.json(
            {
                message:
                    "Your message has been successfully sent. If a reply is expected, please check your email for updates.",
            },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
