import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Enable static exports.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Enforce trailing slashes on all URLs. With static export, this outputs
   * `/about/index.html` instead of `/about.html`, ensuring the canonical URL
   * always matches exactly what Google crawls, preventing "Duplicate without
   * user-selected canonical" in Search Console.
   *
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash
   */
  trailingSlash: true,

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
