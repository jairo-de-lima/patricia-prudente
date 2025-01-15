/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Remove experimental configs que não são mais necessárias
  experimental: {
    // Apenas otimizações de build
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
