/**
 * @type {import('next').NextConfig}
 */

//const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  //distDir: 'build',
  //images: {
  //  unoptimized: true,
  //},
  //BACK_TO_FULLSTACK: remove prefix in production
  // Use the prefix and basePath only in production (when deploying to GitHub Pages)
  //assetPrefix: isProd ? '/houseofcharts.github.io/' : '',
  basePath: '/houseofcharts.github.io'//isProd ? '/houseofcharts.github.io' : '',
};

module.exports = nextConfig;
