import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      /*{
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        
      },*/
      {
        protocol: 'https',
        hostname: '**', 
      }
    ],
  }
};

export default nextConfig;
