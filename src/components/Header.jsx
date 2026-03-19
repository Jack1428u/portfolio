'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToSection, scrollToTop } from '@/lib/scroll';

/**
 * Navigación híbrida cross-page:
 * - En "/" (home): scroll suave entre secciones con IntersectionObserver para highlight activo.
 * - En "/blogs" o "/blogs/[slug]": usa rutas absolutas con hash (e.g. /#about) via next/link
 *   para distribuir Link Juice sin recargar la SPA innecesariamente.
 */

const NAV_SECTIONS = [
    { id: 'about',          label: 'Sobre Mí',        ariaLabel: 'Ir a la sección Sobre Mí' },
    { id: 'projects',       label: 'Proyectos',        ariaLabel: 'Ir a la sección Proyectos' },
    { id: 'certifications', label: 'Certificaciones',  ariaLabel: 'Ir a la sección Certificaciones' },
    { id: 'contact',        label: 'Contacto',         ariaLabel: 'Ir a la sección Contacto' },
];

const BLOG_NAV = {
    id: 'blogs',
    label: 'Blog',
    href: '/blogs',
    ariaLabel: 'Ir al Blog de Jack Gonzalo Utrilla',
};

export default function Header() {
    const pathname     = usePathname();
    const isHome       = pathname === '/';
    const isBlogRoute  = pathname.startsWith('/blogs');

    const [isScrolled,       setIsScrolled]       = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection,    setActiveSection]    = useState('');

    /* ── Scroll listener ── */
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ── IntersectionObserver para highlight activo — solo en Home ── */
    useEffect(() => {
        if (!isHome) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [isHome]);

    /* ── Cierra menú móvil al cambiar de ruta ── */
    useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

    /* ── Click en ítem de nav: scroll en home / link absolute en otras rutas ── */
    const handleSectionClick = useCallback((e, sectionId) => {
        if (isHome) {
            e.preventDefault();
            scrollToSection(sectionId);
            setIsMobileMenuOpen(false);
        }
        // Si no estamos en home, next/link maneja la navegación normalmente
    }, [isHome]);

    const logoAction = isHome
        ? { onClick: (e) => { e.preventDefault(); scrollToTop(); }, href: '/' }
        : { href: '/' };

    /* ── Clases de ítem activo ── */
    const itemClass = (id) =>
        `text-sm font-medium transition-smooth ${
            activeSection === id && isHome
                ? 'text-accent-primary'
                : 'text-gray-300 hover:text-accent-primary'
        }`;

    const renderNavItem = (item, mobile = false) => {
        const href = isHome ? `#${item.id}` : `/#${item.id}`;
        return (
            <Link
                key={item.id}
                href={href}
                onClick={(e) => handleSectionClick(e, item.id)}
                aria-label={item.ariaLabel}
                title={item.label}
                className={`${itemClass(item.id)} ${mobile ? 'text-left py-1' : ''}`}
            >
                {item.label}
            </Link>
        );
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
                isScrolled
                    ? 'bg-dark-surface/95 backdrop-blur-md border-b border-dark-border'
                    : 'bg-transparent'
            }`}
            role="banner"
        >
            <nav
                className="container-custom py-4"
                aria-label="Navegación principal"
            >
                <div className="flex items-center justify-between">

                    {/* ── Logo / Home ── */}
                    <Link
                        href={logoAction.href}
                        onClick={logoAction.onClick}
                        aria-label="Ir al inicio del portfolio"
                        className="text-xl font-bold gradient-text hover:opacity-80 transition-smooth"
                    >
                        Portfolio
                    </Link>

                    {/* ── Desktop Navigation ── */}
                    <div
                        className="hidden md:flex items-center gap-8"
                        role="list"
                        aria-label="Menú de navegación principal"
                    >
                        {NAV_SECTIONS.map((item) => (
                            <div key={item.id} role="listitem">
                                {renderNavItem(item)}
                            </div>
                        ))}

                        {/* Blog: siempre es una ruta real */}
                        <div role="listitem">
                            <Link
                                href={BLOG_NAV.href}
                                aria-label={BLOG_NAV.ariaLabel}
                                title={BLOG_NAV.label}
                                className={`text-sm font-medium transition-smooth ${
                                    isBlogRoute
                                        ? 'text-accent-primary'
                                        : 'text-gray-300 hover:text-accent-primary'
                                }`}
                            >
                                {BLOG_NAV.label}
                            </Link>
                        </div>
                    </div>

                    {/* ── Mobile Toggle ── */}
                    <button
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className="md:hidden text-gray-300 hover:text-accent-primary transition-smooth p-2"
                        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            {isMobileMenuOpen
                                ? <path d="M6 18L18 6M6 6l12 12" />
                                : <path d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* ── Mobile Menu ── */}
                {isMobileMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden mt-4 py-4 border-t border-dark-border"
                        role="navigation"
                        aria-label="Menú móvil"
                    >
                        <div className="flex flex-col gap-3">
                            {NAV_SECTIONS.map((item) => renderNavItem(item, true))}
                            <Link
                                href={BLOG_NAV.href}
                                aria-label={BLOG_NAV.ariaLabel}
                                className={`text-sm font-medium transition-smooth text-left py-1 ${
                                    isBlogRoute ? 'text-accent-primary' : 'text-gray-300 hover:text-accent-primary'
                                }`}
                            >
                                {BLOG_NAV.label}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}