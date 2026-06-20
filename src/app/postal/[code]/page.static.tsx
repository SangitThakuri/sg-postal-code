// Server Component wrapper for GitHub Pages static export.
// generateStaticParams must live in a Server Component (not a "use client" file).
// All rendering logic lives in PostalCodeClientView (the "use client" component).
import PostalCodeClientView from "./PostalCodeClientView";

export function generateStaticParams() {
  // Return empty — no pages are pre-generated.
  // Users reach these pages via the 404.html SPA redirect trick.
  return [];
}

export default function PostalCodeStaticPage() {
  return <PostalCodeClientView />;
}
