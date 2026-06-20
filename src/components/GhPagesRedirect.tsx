"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Reads the path stored by public/404.html and navigates there client-side.
// Only included in the GitHub Pages static build.
export default function GhPagesRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirect = sessionStorage.getItem("ghpages_redirect");
    if (redirect && redirect !== "/") {
      sessionStorage.removeItem("ghpages_redirect");
      router.replace(redirect);
    }
  }, [router]);

  return null;
}
