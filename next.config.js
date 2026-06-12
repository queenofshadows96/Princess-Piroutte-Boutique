/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ⭐ Supabase Storage (product images, color images, assets)
      {
        protocol: "https",
        hostname: "ohfiglvuvulucoolkchs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },

      // ⭐ Stripe-hosted images (if you ever use Stripe product images)
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/**",
      },

      // ⭐ Googleusercontent (Gmail, OAuth avatars, fallback images)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },

      // ⭐ Your own domain (Vercel or localhost)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
