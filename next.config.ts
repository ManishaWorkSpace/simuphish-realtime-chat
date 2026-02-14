import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "i.pravatar.cc",
      "randomuser.me"
    ],
  },
};

export default nextConfig;
