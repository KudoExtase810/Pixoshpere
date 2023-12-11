import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_KEY = process.env.SECRET_ADMIN_API_KEY;

const protectedApiRoutes = ["/api/route1", "/api/route2", "/api/route3"];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    // Check if the request path matches any protected API route
    if (protectedApiRoutes.some((route) => pathname.startsWith(route))) {
        const apiKey = searchParams.get("admin_key");

        if (apiKey === ADMIN_KEY) {
            return NextResponse.next();
        } else {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
    }

    // For non-protected routes, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
