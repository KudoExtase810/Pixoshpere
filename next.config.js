const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "res.cloudinary.com", port: "" },
        ],
    },
};

module.exports = withNextIntl(nextConfig);
