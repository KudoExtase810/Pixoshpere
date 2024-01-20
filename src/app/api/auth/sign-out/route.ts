import { auth } from "@/auth/lucia";
import * as context from "next/headers";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const authRequest = auth.handleRequest(request.method, context);
    // check if user is authenticated
    const session = await authRequest.validate();
    if (!session) {
        return NextResponse.json(
            { message: "You are already logged out." },
            {
                status: 401,
            }
        );
    }
    // make sure to invalidate the current session!
    await auth.invalidateSession(session.sessionId);
    // delete session cookie
    authRequest.setSession(null);
    return NextResponse.json(
        {
            message: "User logged out",
        },
        {
            status: 200,
        }
    );
};
