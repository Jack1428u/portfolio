// Server Component — wrapper de sección reutilizable
function Section({ id, title, subtitle, children, className = '' }) {
    return (
        <section id={id} className={`section-spacing ${className}`}>
            <div className="container-custom">
                {title && (
                    <div className="text-center mb-12 md:mb-16">
                        {subtitle && (
                            <p className="text-accent-primary text-sm font-semibold tracking-wider uppercase mb-2">
                                {subtitle}
                            </p>
                        )}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
                            {title}
                        </h2>
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}

export default Section;
