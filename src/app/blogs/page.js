import Link from 'next/link';
import { getBlogs } from '@/services/BlogService';

/* ─────────────────────────────────────────────
   METADATA ESTÁTICA — Hub de Contenidos
   50-60 chars title | 140-160 chars description

   ───────────────────────────────────────────── */

//  FUERZA A NEXT.JS A OBTENER DATOS FRESCOS EN CADA VISITA
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog de Desarrollo Full Stack | Jack Utrilla',
  description:
    'Artículos técnicos sobre arquitectura de software, React, Next.js, Django, DevOps e Inteligencia Artificial escritos por Jack Gonzalo Utrilla Fernández.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Blog Técnico | Jack Gonzalo Utrilla',
    description:
      'Contenido experto sobre desarrollo Full Stack, sistemas agénticos, DevOps y arquitectura de software.',
    type: 'website',
    locale: 'es_ES',
    url: '/blogs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Técnico | Jack Gonzalo Utrilla',
    description:
      'Artículos sobre arquitectura, React, Next.js, Django y DevOps.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/* ─────────────────────────────────────────
   SCHEMA JSON-LD — CollectionPage + Blog
───────────────────────────────────────── */
function BlogListSchema({ blogs }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jackutrilla.com';
  if (!blogs || blogs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Jack Gonzalo Utrilla',
    description:
      'Artículos técnicos sobre arquitectura de software, Full Stack, DevOps e IA.',
    url: `${baseUrl}/blogs`,
    author: {
      '@type': 'Person',
      name: 'Jack Gonzalo Utrilla Fernández',
      url: baseUrl,
    },
    blogPost: blogs.map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      url: `${baseUrl}/blogs/${blog.slug}`,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt,
      image: blog.coverImage || undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────
   BADGE DE CATEGORÍA
───────────────────────────── */
const CATEGORY_LABELS = {
  web: { label: 'Web', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  ia: { label: 'IA', color: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
  automatization: { label: 'Automatización', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
};

function CategoryBadge({ category }) {
  const cat = CATEGORY_LABELS[category];
  if (!cat) return null;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.color}`}
      aria-label={`Categoría: ${cat.label}`}
    >
      {cat.label}
    </span>
  );
}

function TagBadge({ tag }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-dark-card border border-dark-border text-gray-400">
      #{tag}
    </span>
  );
}

/* ─────────────────────────────────────────────
   BLOG CARD — <article> semántico
───────────────────────────────────────────── */
function BlogCard({ blog }) {
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
    : null;

  return (
    <article
      className="group card-base flex flex-col overflow-hidden"
      aria-labelledby={`blog-title-${blog.slug}`}
    >
      {blog.coverImage && (
        <div className="relative h-48 overflow-hidden bg-dark-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.coverImage}
            alt={`Imagen de portada: ${blog.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <CategoryBadge category={blog.category} />
          {date && (
            <time dateTime={blog.createdAt} className="text-xs text-gray-500 ml-auto">
              {date}
            </time>
          )}
        </div>

        {/* El Link rodea el título — anti-patrón SEO de "Leer más" evitado */}
        <h2 id={`blog-title-${blog.slug}`} className="text-lg font-semibold mb-2 leading-snug">
          <Link
            href={`/blogs/${blog.slug}`}
            aria-label={`Leer artículo: ${blog.title}`}
            className="text-gray-100 hover:text-accent-primary transition-smooth line-clamp-2"
          >
            {blog.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {blog.tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-dark-border">
          <Link
            href={`/blogs/${blog.slug}`}
            aria-label={`Leer el artículo completo: ${blog.title}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-secondary transition-smooth group/cta"
          >
            Leer artículo
            <svg
              className="w-4 h-4 transition-transform group-hover/cta:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="text-5xl mb-4" aria-hidden="true">✍️</div>
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">
        Próximamente nuevos artículos
      </h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Estoy preparando contenido técnico de alto valor sobre arquitectura de software,
        DevOps e Inteligencia Artificial.
      </p>
    </div>
  );
}

/* ─────────────────────────────
   PAGE — Server Component
───────────────────────────── */
export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <BlogListSchema blogs={blogs} />

      <main className="min-h-screen pt-24 pb-20" id="main-content">
        <div className="container-custom">
          <header className="text-center mb-16">
            <p className="text-accent-primary text-sm font-semibold tracking-wider uppercase mb-3">
              Contenido Técnico
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Blog
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Artículos sobre arquitectura de software, desarrollo Full Stack,
              DevOps e Inteligencia Artificial.
            </p>
          </header>

          {blogs.length > 0 ? (
            <section aria-label="Lista de artículos del blog">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.slug ?? blog._id} blog={blog} />
                ))}
              </div>
            </section>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </>
  );
}