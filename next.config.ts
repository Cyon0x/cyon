import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The framed previews are full screenshots of live products, so they hold
    // up better than the default quality. Next 16 requires the allowlist.
    // 92 is used by the hero portrait in HeroOrbit.
    qualities: [75, 82, 92],
  },
};

export default nextConfig;
