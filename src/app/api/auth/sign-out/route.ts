import { auth } from "@/auth/lucia";
import connectDB from "@/lib/connectdb";
import * as context from "next/headers";

export const POST = async (request: Request) => {
    await connectDB();
    const authRequest = auth.handleRequest(request.method, context);
    // check if user is authenticated
    const session = await authRequest.validate();
    if (!session) {
        return Response.json(
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
    return Response.json(
        {
            message: "User logged out",
        },
        {
            status: 200,
        }
    );
};
