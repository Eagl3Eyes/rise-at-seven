/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure that GSAP and other client-side libs work correctly
  transpilePackages: ['gsap', '@gsap/react'],
};

export default nextConfig;
