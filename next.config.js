/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: ['assets.aceternity.com', 'ipos-storage.s3.amazonaws.com', 'titlepage-public-images-prod.s3-ap-southeast-2.amazonaws.com', '*titlepage*'],
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

export default config;
