import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/services/BlogService';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReactMarkdown from 'react-markdown';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/* ─────────────────────────────────────────────────────────
   generateMetadata — Metadata dinámica por slug  // Ahora se usa id
   Extrae title, excerpt (→ description), coverImage del post
───────────────────────────────────────────────────────── */
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Artículo no encontrado | Jack Utrilla',
            robots: { index: false, follow: false },
        };
    }

    const title = `${blog.title} | Jack Utrilla`;
    const description = blog.excerpt;
    const imageUrl = blog.coverImage || `${BASE_URL}/og-default.png`;
    const canonical = `/blogs/${blog.slug}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            type: 'article',
            url: canonical,
            locale: 'es_ES',
            images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
            article: {
                publishedTime: blog.createdAt,
                modifiedTime: blog.updatedAt,
                authors: [blog.author || 'Jack Gonzalo Utrilla Fernández'],
                tags: blog.tags ?? [],
            },
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
    };
}

/* ──────────────────────────────────────────────────────
   SCHEMA JSON-LD — TechArticle / BlogPosting
   Incluye: headline, image, datePublished, dateModified,
   author, description, keywords, mainEntityOfPage
────────────────────────────────────────────────────── */
function BlogPostingSchema({ blog }) {
    const imageUrl = blog.coverImage || `${BASE_URL}/og-default.png`;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blogs/${blog.slug}`,
        },
        headline: blog.title,
        description: blog.excerpt,
        image: imageUrl,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        author: {
            '@type': 'Person',
            name: blog.author || 'Jack Gonzalo Utrilla Fernández',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Person',
            name: 'Jack Gonzalo Utrilla Fernández',
            url: BASE_URL,
        },
        keywords: blog.tags?.join(', ') || '',
        inLanguage: 'es-ES',
        proficiencyLevel: 'Expert',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/* ──────────────────────────
   BADGE CATEGORÍA (inline)
────────────────────────── */
const CATEGORY_LABELS = {
    web: { label: 'Web', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    ia: { label: 'IA', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
    automatization: { label: 'Automatización', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
};
function CategoryBadge({ category }) {
    const cat = CATEGORY_LABELS[category];
    if (!cat) return null;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.color}`}>
            {cat.label}
        </span>
    );
}

/* ─────────────────────────────────────────────────────────
   PAGE — Server Component
   notFound() → HTTP 404 real para Googlebot si slug no existe
───────────────────────────────────────────────────────── */
export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) notFound();

    const publishDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : null;

    const readingTime = blog.content
        ? Math.ceil(blog.content.split(/\s+/).length / 200)
        : null;

    return (
        <>
            <BlogPostingSchema blog={blog} />

            <main id="main-content" className="min-h-screen pt-24 pb-20">
                <div className="container-custom">

                    {/* ── Migas de pan ── */}
                    <Breadcrumbs
                        items={[
                            { label: 'Inicio', href: '/' },
                            { label: 'Blog', href: '/blogs' },
                            { label: blog.title },
                        ]}
                    />

                    <article
                        className="max-w-3xl mx-auto mt-8"
                        aria-labelledby="article-title"
                        itemScope
                        itemType="https://schema.org/TechArticle"
                    >
                        {/* ── Cover Image (LCP-optimized) ── */}
                        {blog.coverImage && (
                            <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
                                <Image
                                    src={blog.coverImage}
                                    alt={`Imagen de portada: ${blog.title}`}
                                    fill
                                    priority          // ← optimiza LCP
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                        )}

                        {/* ── Article Header ── */}
                        <header className="mb-10">
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <CategoryBadge category={blog.category} />
                                {publishDate && (
                                    <time
                                        dateTime={blog.createdAt}
                                        itemProp="datePublished"
                                        className="text-sm text-gray-500"
                                    >
                                        {publishDate}
                                    </time>
                                )}
                                {readingTime && (
                                    <span className="text-sm text-gray-500 flex items-center gap-1" aria-label={`Tiempo de lectura: ${readingTime} minutos`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {readingTime} min de lectura
                                    </span>
                                )}
                            </div>

                            {/* H1 — único en la página */}
                            <h1
                                id="article-title"
                                itemProp="headline"
                                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
                            >
                                {blog.title}
                            </h1>

                            {/* Excerpt como lead paragraph */}
                            <p
                                className="text-xl text-gray-400 leading-relaxed border-l-4 border-accent-primary pl-5 italic"
                                itemProp="description"
                            >
                                {blog.excerpt}
                            </p>

                            {/* Author */}
                            <div
                                className="flex items-center gap-3 mt-6 pt-6 border-t border-dark-border"
                                itemProp="author"
                                itemScope
                                itemType="https://schema.org/Person"
                            >
                                <div className="w-8 h-8 rounded-full bg-accent-primary/20 border border-accent-primary/40 flex items-center justify-center text-accent-primary text-sm font-bold" aria-hidden="true">
                                    {(blog.author || 'J').charAt(0).toUpperCase()}
                                </div>
                                <span itemProp="name" className="text-sm text-gray-400">
                                    {blog.author || 'Jack Gonzalo Utrilla Fernández'}
                                </span>
                            </div>
                        </header>

                        {/* ── Contenido del artículo ── */}
                        <section
                            className="
                                prose prose-invert prose-lg max-w-none
                                prose-headings:font-bold prose-headings:text-gray-100
                                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-5
                                prose-a:text-accent-primary prose-a:no-underline hover:prose-a:text-accent-secondary
                                prose-code:text-accent-secondary prose-code:bg-dark-card prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                                prose-pre:bg-dark-card prose-pre:border prose-pre:border-dark-border prose-pre:rounded-xl
                                prose-blockquote:border-l-accent-primary prose-blockquote:text-gray-400
                                prose-strong:text-gray-100
                                prose-li:text-gray-300
                                prose-img:rounded-xl
                            "
                            itemProp="articleBody"
                            // El contenido viene del backend como Markdown; 
                            // en producción parsear con 'marked' o 'react-markdown'
                            // por eso usamos dangerouslySetInnerHTML aquí temporalmente.
                            
                        >
                            <ReactMarkdown>
                                {blog.content}
                            </ReactMarkdown>
                        </section>

                        {/* ── Tags ── */}
                        {blog.tags?.length > 0 && (
                            <footer className="mt-12 pt-8 border-t border-dark-border">
                                <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wide">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-dark-card border border-dark-border text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-smooth"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </footer>
                        )}
                    </article>

                    {/* ── Volver al listado ── */}
                    <div className="max-w-3xl mx-auto mt-12">
                        <Link
                            href="/blogs"
                            aria-label="Volver al listado completo de artículos"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent-primary transition-smooth group"
                        >
                            <svg
                                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Volver al Blog
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
