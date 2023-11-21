import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import connectDB from "@/lib/connectdb";
import Admin from "@/models/admin";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                    const admin = await Admin.findOne({ email, password });

                    if (!admin) throw new Error("Invalid credentials.");

                    return admin;
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    _id: user.id,
                };
            }

            return token;
        },
        async session({ session, token, user }) {
            return { ...session, user: { ...session.user, _id: token.id } };
        },
    },
    pages: { signIn: "/login" },
} as AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
