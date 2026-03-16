import { certifications } from '../../data/certifications';
import Section from '../Section';
function AboutSection() {
    const skills = [
        {
            category: 'Frontend',
            items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
        },
        {
            category: 'Backend',
            items: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
        },
        {
            category: 'DevOps',
            items: ['Git', 'Docker', 'CI/CD', 'Linux'],
        },
        {
            category: 'Análisis de Datos',
            items: ['Power BI', 'Excel', 'SQL', 'Python'],
        },
    ];
    const link = certifications.find(c => c.title === "Full Stack Open").link;
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Section
            id="about"
            title="Sobre Mí"
            subtitle="Conoce mi Perfil"
        >
            <div className="max-w-4xl mx-auto">
                {/* Bio */}
                <div className="mb-12">
                    <div className="flex flex-col gap-6 text-lg text-gray-300 leading-relaxed">
                        {/* Presentación */}
                        <p>
                            Transformo visiones complejas en productos digitales escalables, ya seas un emprendedor con una gran idea o una empresa buscando eficiencia. Como desarrollador <span className="text-accent-primary font-semibold">Full Stack</span> con formación en <span className="text-accent-primary font-semibold">Ingeniería de Sistemas</span>, mi enfoque no es solo programar, sino construir soluciones que impulsen tu crecimiento.
                        </p>

                        {/* Bloque destacado para la certificación */}
                        <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50 shadow-sm">
                            <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                                <span className="text-xl">🏆</span> Calidad Certificada por la Universidad de Helsinki
                            </h3>
                            <p className="text-base">
                                <span>Cuento con la certificación{" "}</span>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-accent-primary hover:text-accent-secondary transition-smooth"
                                >
                                    <span className="text-accent-primary font-bold">Full Stack Open</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                , un estándar de élite que garantiza que mi código es limpio, seguro y de nivel industrial. Mi especialidad es el stack <span className="text-accent-primary font-semibold">MERN + FastAPI</span>, combinando la flexibilidad de JavaScript con la potencia y velocidad de Python para microservicios.
                            </p>
                        </div>

                        {/* Lista de beneficios */}
                        <div>
                            <p className="text-accent-primary font-bold text-xl mb-4">
                                ¿Qué obtienes al trabajar conmigo?
                            </p>
                            <ul className="list-disc pl-5 space-y-3 marker:text-accent-primary">
                                <li>
                                    <strong className="text-gray-100 font-medium">Resultados, no solo código:</strong> Automatizo tus procesos para reducir costos y errores.
                                </li>
                                <li>
                                    <strong className="text-gray-100 font-medium">Escalabilidad Real:</strong> Arquitecturas diseñadas para crecer junto a tu negocio.
                                </li>
                                <li>
                                    <strong className="text-gray-100 font-medium">Innovación Basada en Datos:</strong> Uso mi conocimiento en ingeniería para darte herramientas que te permitan tomar mejores decisiones.
                                </li>
                            </ul>
                        </div>

                        {/* Cierre / Call to Action */}
                        <p className="font-semibold text-white mt-2">
                            Dejemos de hablar de tecnología y empecemos a construir tu éxito 🚀
                            <a
                                href="#contact"
                                onClick={() => scrollToSection('contact')}
                                className="inline-flex items-center gap-2 text-sm text-accent-primary hover:text-accent-secondary transition-smooth"
                            >
                                <span className="text-accent-primary font-bold">Contactar</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>

                {/* Skills Grid */}
                <div>
                    <h3 className="text-2xl font-semibold mb-8 text-center">
                        Stack Tecnológico
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skillGroup, index) => (
                            <div
                                key={index}
                                className="card-base p-6"
                            >
                                <h4 className="text-accent-primary font-semibold mb-4 text-lg">
                                    {skillGroup.category}
                                </h4>
                                <ul className="space-y-2">
                                    {skillGroup.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-center gap-2 text-gray-400"
                                        >
                                            <svg
                                                className="w-4 h-4 text-accent-success flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Focus Areas */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Arquitectura de Software',
                            description: 'Diseño de sistemas escalables y sostenibles con enfoque en la calidad del código.',
                            icon: '🏗️',
                        },
                        {
                            title: 'Automatización',
                            description: 'Optimización de procesos mediante scripts y herramientas DevOps.',
                            icon: '⚡',
                        },
                        {
                            title: 'Análisis de Datos',
                            description: 'Transformación de datos en insights accionables con Power BI y Python.',
                            icon: '📊',
                        },
                    ].map((area, index) => (
                        <div
                            key={index}
                            className="p-6 bg-dark-surface border border-dark-border rounded-lg hover:border-accent-primary transition-smooth"
                        >
                            <div className="text-4xl mb-3">{area.icon}</div>
                            <h4 className="text-lg font-semibold mb-2">{area.title}</h4>
                            <p className="text-gray-400 text-sm">{area.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default AboutSection;
