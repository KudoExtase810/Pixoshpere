import connectDB from "@/lib/connectdb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { newStatus } = await request.json();
        await connectDB();
        const order = await Order.findById(params.id);

        if (!order) {
            return NextResponse.json(
                { message: "Order not found." },
                { status: 404 }
            );
        }

        order.status = newStatus;
        await order.save();
        return NextResponse.json(
            { message: "Order updated successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
