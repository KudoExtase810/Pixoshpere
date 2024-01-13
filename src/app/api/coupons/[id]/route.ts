import connectDB from "@/lib/connectdb";
import Coupon from "@/models/coupon";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const coupon = await Coupon.findById(params.id);

        if (!coupon) {
            return NextResponse.json(
                { message: "Coupon not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(coupon, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const newCouponData: Coupon = await request.json();

        await connectDB();
        const coupon = await Coupon.findByIdAndUpdate(
            params.id,
            newCouponData,
            { runValidators: true }
        );

        if (!coupon) {
            return NextResponse.json(
                { message: "Coupon not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Coupon updated with success." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const coupon = await Coupon.findByIdAndDelete(params.id);

        if (!coupon) {
            return NextResponse.json(
                { message: "Coupon not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Coupon deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
