import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata = {
    title: 'Portfolio - Desarrollador Full Stack | Jack Gonzalo Utrilla',
    description:
        'Portafolio profesional de Estudiante de Ingeniería de Sistemas especializado en Arquitectura de Software, Full Stack Development y DevOps.',
    keywords: ['Full Stack', 'React', 'Next.js', 'Django', 'Python', 'DevOps', 'PostgreSQL'],
    authors: [{ name: 'Jack Gonzalo Utrilla Fernández' }],
    creator: 'Jack Gonzalo Utrilla Fernández',
    openGraph: {
        title: 'Portfolio - Jack Gonzalo Utrilla',
        description:
            'Desarrollador Full Stack especializado en arquitectura de software, DevOps y análisis de datos.',
        type: 'website',
        locale: 'es_ES',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={`dark ${inter.variable}`}>
            <body className="bg-dark-bg text-gray-50">
                <div className="min-h-screen">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
