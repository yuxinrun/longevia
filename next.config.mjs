const isPagesBuild = process.env.GITHUB_PAGES === 'true';
const pagesBasePath = isPagesBuild ? (process.env.NEXT_PUBLIC_BASE_PATH || '') : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // GitHub Pages only serves static files: export fully static HTML in CI.
  ...(isPagesBuild
    ? { output: 'export', ...(pagesBasePath ? { basePath: pagesBasePath } : {}) }
    : {}),
  images: {
    formats: ['image/avif', 'image/webp'],
    // The default image optimizer needs a Node server, which Pages cannot run.
    ...(isPagesBuild ? { unoptimized: true } : {}),
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
