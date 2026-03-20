/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
        // Acepta coverImages de cualquier origen HTTPS externo (Cloudinary, S3, CDNs, etc.)
        // En producción con fuentes conocidas, reemplazar el wildcard por entradas específicas.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

module.exports = nextConfig;
