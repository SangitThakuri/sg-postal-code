// Server Component wrapper for GitHub Pages static export.
// generateStaticParams must live in a Server Component (not a "use client" file).
// All rendering logic lives in PostalCodeClientView (the "use client" component).
import PostalCodeClientView from "./PostalCodeClientView";

export function generateStaticParams() {
  // Next.js treats an empty array here as "generateStaticParams not
  // implemented" and hard-fails the output:"export" build (it checks
  // prerenderRoutes.length, not whether the function exists). One real
  // placeholder param satisfies that check; every other code still reaches
  // this page via the 404.html SPA redirect trick.
  return [{ code: "018906" }];
}

export default function PostalCodeStaticPage() {
  return <PostalCodeClientView />;
}
