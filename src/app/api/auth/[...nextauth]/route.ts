import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import connectDB from "@/lib/connectdb";
import User from "@/models/user";
import bcrypt from "bcrypt";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                    const user = await User.findOne({ email });

                    if (!user) throw new Error("Invalid credentials.");

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isMatch) throw new Error("Invalid credentials.");

                    return user;
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
                    hello: "world",
                };
            }

            return { ...token, hello: "world" };
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: token.user,
                hello: "world",
                usEER: user,
            };
        },
    },
    pages: { signIn: "/login" },
} as AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
