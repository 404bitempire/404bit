/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/404bit",
  assetPrefix: "/404bit/",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]
  }
};
export default nextConfig;
