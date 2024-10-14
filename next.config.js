// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (/** @type {{ externals: string[]; }} */ config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    reactStrictMode: false,
    experimental: {
        serverActions: {
            bodySizeLimit: "1000mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        domains: [
            "assets.aceternity.com",
            "ipos-storage.s3.amazonaws.com",
            "uxwing.com",
            "cdn4.iconfinder.com",
            "cdn1.iconfinder.com",
            "thumbs.dreamstime.com",
            "lh3.googleusercontent.com",
            "localhost:3000",
            "media.sproutsocial.com",
            "rweveomawenfvzsacblq.supabase.co",
            "oaidalleapiprodscus.blob.core.windows.net",
            "corcel.b-cdn.net",
            "zvrnzrrlmeldhhirsqiz.supabase.co",
        ],
    },

    async headers() {
        return [
            {
                // Apply this header to all routes
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.mastercard.com https://*.aexp-static.com https://*.americanexpress.com https://*.visa.com https://*.staticv.me https://*.discover.com https://*.discovercard.com https://*.ewaylabs.cloud https://*.ewaypayments.com https://*.google.com https://*.googleapis.com https://*.aexp-static.com https://*.cardinalcommerce.com https://*.eway.io https://*.newrelic.com https://*.nr-data.net https://*.ccdc02.com https://www.gstatic.com;"
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
