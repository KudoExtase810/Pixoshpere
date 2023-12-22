import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const SECRET_KEY = process.env.CHECKOUT_JWT_SECRET;

        if (!SECRET_KEY) throw new Error("No Checkout JWT SECRET provided.");

        const body = await request.json();
        const checkedoutItems = body.checkedoutItems as {
            _id: string;
            quantity: number;
        }[];

        if (!Array.isArray(checkedoutItems))
            return NextResponse.json(
                { message: "checkedoutItems must be an array." },
                { status: 400 }
            );

        for (let i = 0; i < checkedoutItems.length; i++) {
            const id = checkedoutItems[i]._id;
            if (!mongoose.Types.ObjectId.isValid(id))
                return NextResponse.json(
                    { message: `${id} is not a valid ObjectID.` },
                    { status: 400 }
                );
        }

        const token = jwt.sign(
            { data: JSON.stringify(checkedoutItems) },
            SECRET_KEY,
            { expiresIn: "7d" }
        );
        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
