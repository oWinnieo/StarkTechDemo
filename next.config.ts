import type { NextConfig } from "next";
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  basePath: '',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@styles': path.resolve(__dirname, 'styles'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@store': path.resolve(__dirname, 'store'),
    };
    return config;
  },
};

export default nextConfig;
