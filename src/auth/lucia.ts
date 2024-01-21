import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { mongoose } from "@lucia-auth/adapter-mongoose";
import User from "@/models/user";
import Key from "@/models/key";
import Session from "@/models/session";

export const auth = lucia({
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    middleware: nextjs_future(),
    sessionCookie: {
        expires: false,
    },
    getUserAttributes: (data: User) => {
        return {
            isAdmin: data.isAdmin,
            isVerified: data.isVerified,
        };
    },

    adapter: mongoose({
        User,
        Key,
        Session,
    }),
});

export type Auth = typeof auth;
