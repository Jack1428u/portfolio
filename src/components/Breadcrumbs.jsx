import Link from 'next/link';

/**
 * Breadcrumbs — Componente semántico de navegación en migas de pan.
 *
 * SEO:
 * - Usa <nav aria-label="breadcrumb"> + <ol> para señalizar estructura a los crawlers.
 * - El último elemento NO es un link (página actual).
 * - El schema BreadcrumbList se genera en la página padre via JSON-LD.
 *
 * @param {{ items: Array<{ label: string, href?: string }> }} props
 */
export default function Breadcrumbs({ items = [] }) {
    if (!items.length) return null;

    return (
        <nav aria-label="Ruta de navegación (breadcrumb)" className="mb-2">
            <ol
                className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li
                            key={index}
                            className="flex items-center gap-1.5"
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            {/* Separador — oculto para lectores de pantalla */}
                            {index > 0 && (
                                <svg
                                    className="w-3 h-3 text-gray-600 flex-shrink-0"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}

                            {isLast ? (
                                /* Página actual: aria-current + no es link */
                                <span
                                    itemProp="name"
                                    aria-current="page"
                                    className="text-gray-300 font-medium truncate max-w-[200px] md:max-w-xs"
                                    title={item.label}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={item.href}
                                        itemProp="item"
                                        className="hover:text-accent-primary transition-smooth truncate max-w-[120px]"
                                        title={item.label}
                                    >
                                        <span itemProp="name">{item.label}</span>
                                    </Link>
                                    <meta itemProp="position" content={String(index + 1)} />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
