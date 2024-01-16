import connectDB from "@/lib/connectdb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        await Order.create(body);

        return NextResponse.json(
            { message: "Your order has been submitted." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
