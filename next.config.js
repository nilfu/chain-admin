/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: '/', destination: '/create-project', permanent: true }];
  },
};

module.exports = nextConfig;
