import * as context from "next/headers";
import { auth } from "@/auth/lucia";

export const getServerSession = async () => {
    const authRequest = auth.handleRequest("GET", context);
    const session = (await authRequest.validate()) ?? null;
    return {
        userId: session?.user.userId,
        isLoggedIn: session !== null,
        isAdmin: session?.user.isAdmin,
        isVerified: session?.user.isVerified,
    };
};
