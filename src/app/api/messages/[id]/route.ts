import connectDB from "@/lib/connectdb";
import Message from "@/models/message";

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const message = await Message.findByIdAndDelete(params.id);

        if (!message) {
            return Response.json(
                { message: "Message not found." },
                { status: 404 }
            );
        }

        return Response.json(
            { message: "Message deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
