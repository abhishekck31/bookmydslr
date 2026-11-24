/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://abhishek31.pythonanywhere.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
