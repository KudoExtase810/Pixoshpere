import User from "@/models/user";
import { auth } from "@/auth/lucia";
import * as context from "next/headers";

import connectDB from "@/lib/connectdb";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { firstName, lastName, email, password, phone } =
            await request.json();

        const namesInUse = await User.exists({
            firstName,
            lastName,
        });
        if (namesInUse)
            return Response.json(
                {
                    message:
                        "The combination of this first & last name already exists.",
                },
                { status: 409 }
            );

        const emailInUse = await User.exists({ email });
        if (emailInUse)
            return Response.json(
                { message: "Email already in use." },
                { status: 409 }
            );

        const user = await auth.createUser({
            key: {
                providerId: "email",
                providerUserId: email,
                password,
            },
            attributes: {
                email,
                firstName,
                lastName,
                phone,
            },
        });

        // ? Uncomment the code below in order to login the user when they create a new account
        // const session = await auth.createSession({
        //     userId: user.userId,
        //     attributes: {},
        // });

        // const authRequest = auth.handleRequest(request.method, context);
        // authRequest.setSession(session);

        return Response.json(
            { message: "Your account has been successfully created." },

            { status: 201 }
        );
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
