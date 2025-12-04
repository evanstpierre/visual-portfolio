/** @type {import('next').NextConfig} */
const nextConfig = {
  // only code + node_modules needed at runtime
  output: 'standalone',
  eslint: {
    // ✅ Don’t fail the production build if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❗ Build will succeed even if there are TS type errors.
    ignoreBuildErrors: true,
  },
 

};

export default nextConfig;