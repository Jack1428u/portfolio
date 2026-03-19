'use client';

import Button from '@/components/Button';
import { scrollToSection } from '@/lib/scroll';

function Hero() {
    return (
        <section className="relative flex flex-col min-h-screen pt-20 pb-16 px-4">
            {/* Background gradient effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Greeting */}
                    <p className="text-accent-primary font-semibold mb-4 tracking-wide uppercase text-sm md:text-base">
                        Hola, soy
                    </p>

                    {/* Name */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="gradient-text">Jack Gonzalo Utrilla Fernández</span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6">
                        Desarrollador Full Stack
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Enfocado en <span className="text-accent-secondary font-medium">arquitectura de software</span> y{' '}
                        <span className="text-accent-secondary font-medium">eficiencia operativa</span>.
                        Especializado en desarrollo Full Stack con Python, JavaScript, Django y React,
                        así como en DevOps y análisis de datos para optimizar flujos digitales en entornos de alto rendimiento.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => scrollToSection('projects')}
                        >
                            Ver Proyectos
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contactar
                        </Button>
                    </div>

                    {/* Skills highlight */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {[
                            { icon: '⚙️', label: 'Full Stack' },
                            { icon: '🏗️', label: 'Arquitectura' },
                            { icon: '🚀', label: 'DevOps' },
                            { icon: '📊', label: 'Data Analysis' },
                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="p-4 bg-dark-card border border-dark-border rounded-lg hover:border-accent-primary transition-smooth"
                            >
                                <div className="text-3xl mb-2">{skill.icon}</div>
                                <div className="text-sm font-medium text-gray-300">{skill.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="
                    relative mt-auto pt-12 pb-4 flex justify-center animate-bounce
                    md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2
                    md:mt-0 md:pt-0 md:pb-0
                    group outline-none
                "
                aria-label="Ir a la sección sobre mí"
            >
                <svg
                    className="w-6 h-6 text-gray-500 group-hover:text-accent-primary transition-colors cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </a>
        </section>
    );
}

export default Hero;
