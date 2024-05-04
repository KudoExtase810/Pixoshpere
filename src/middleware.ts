import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    localePrefix: "always",
    // Used when no locale matches
    defaultLocale: "en",
});

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(fr|en)/:path*"],
};
