import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    // Primary sitemap index covers all 121k+ postal codes + static pages
    sitemap: "https://www.sgpostalcode.com/sitemap.xml",
    host: "https://www.sgpostalcode.com",
  };
}
