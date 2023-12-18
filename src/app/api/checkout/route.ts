import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const SECRET_KEY = process.env.CHECKOUT_JWT_SECRET;

        if (!SECRET_KEY) throw new Error("No Checkout JWT SECRET provided.");

        const body = await request.json();
        const cartItems = body.cartItems as string[];

        if (!Array.isArray(cartItems))
            return NextResponse.json(
                { message: "cartItems must be an array." },
                { status: 400 }
            );

        for (let i = 0; i < cartItems.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(cartItems[i]))
                return NextResponse.json(
                    { message: `${cartItems[i]} is not a valid ObjectID.` },
                    { status: 400 }
                );
        }

        const token = jwt.sign(
            { data: JSON.stringify(cartItems) },
            SECRET_KEY,
            { expiresIn: "7d" }
        );
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
