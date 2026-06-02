/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['cobe'],
  // Allow the Emergent preview proxy host to connect to the Next.js dev HMR.
  allowedDevOrigins: ['*.preview.emergentagent.com', '*.preview.emergentcf.cloud', '*'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;
