import connectDB from "@/lib/connectdb";
import Order from "@/models/order";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { newStatus } = await request.json();
        await connectDB();
        const order = await Order.findById(params.id);

        if (!order) {
            return Response.json(
                { message: "Order not found." },
                { status: 404 }
            );
        }

        order.status = newStatus;
        await order.save();
        return Response.json(
            { message: "Order updated successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
