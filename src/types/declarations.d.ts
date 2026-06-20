// Allow importing CSS files (e.g. leaflet/dist/leaflet.css) without TypeScript errors.
// Bundler handles the actual loading; TypeScript only needs to know the module exists.
declare module "*.css" {
  const styles: { readonly [key: string]: string };
  export default styles;
}
