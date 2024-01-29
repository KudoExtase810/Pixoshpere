import { auth } from "@/auth/lucia";
import * as context from "next/headers";

import { LuciaError } from "lucia";
import connectDB from "@/lib/connectdb";

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        const { email, password } = data;

        await connectDB();

        const key = await auth.useKey("email", email.toLowerCase(), password);
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {},
        });

        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session);

        return Response.json(
            {
                message: "Successfully logged in",
            },
            {
                status: 200,
            }
        );
    } catch (e: any) {
        if (
            e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
                e.message === "AUTH_INVALID_PASSWORD")
        ) {
            // user does not exist or invalid password
            return Response.json(
                {
                    message: "Incorrect username or password",
                },
                {
                    status: 400,
                }
            );
        }
        console.log(e);
        return Response.json(
            {
                error: "An unknown error occurred",
            },
            {
                status: 500,
            }
        );
    }
};
