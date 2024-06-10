import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['admin-piatachok.by'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '/api': path.resolve(__dirname, 'api'),
      '/assets': path.resolve(__dirname, 'assets'),
      '/components': path.resolve(__dirname, 'components'),
      '/context': path.resolve(__dirname, 'context'),
      '/hooks': path.resolve(__dirname, 'hooks'),
      '/utils': path.resolve(__dirname, 'utils'),
      '/public': path.resolve(__dirname, 'public'),
    };
    
    return config;
  },
};

export default nextConfig;
