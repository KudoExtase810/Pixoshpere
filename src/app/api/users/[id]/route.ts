import connectDB from "@/lib/connectdb";
import User from "@/models/user";

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
            return Response.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        return Response.json(
            { message: "User updated with success." },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
