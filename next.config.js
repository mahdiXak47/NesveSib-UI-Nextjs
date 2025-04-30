const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
}

const sentryWebpackPluginOptions = {
  // Additional config options for Sentry Webpack plugin (optional)
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions); 