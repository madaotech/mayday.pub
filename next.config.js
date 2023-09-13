/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['upload.wikimedia.org'],
        loader: 'custom',
        loaderFile: './src/lib/img-loader.ts',
    },
}

module.exports = nextConfig
