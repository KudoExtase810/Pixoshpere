import Coupon from "@/models/coupon";
import connectDB from "@/lib/connectdb";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        await Coupon.create(body);

        return Response.json(
            { message: "New coupon created successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
