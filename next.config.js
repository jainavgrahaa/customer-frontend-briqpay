/** @type {import('next').NextConfig} */
const path = require('path')

process.env.NEXT_PUBLIC_STORE_TYPE = process.env.npm_config_store;
const nextConfig = {
  experimental: {
    largePageDataBytes: 300 * 100000,
  },
  reactStrictMode: process.env.NODE_ENV === "production",
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if 
    // your project has ESLint errors. 
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en-default', 'en-gb', 'en-us', 'en', 'us', 'fr'],
    defaultLocale: 'en-default', // redirect if en-us to en using middleware. en-us === en
    localeDetection: false,
  },
  images: {
    domains: ['storage.cloud.google.com'],
  },
}
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});

module.exports = nextConfig
