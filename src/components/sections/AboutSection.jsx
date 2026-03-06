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

    return (
        <Section
            id="about"
            title="Sobre Mí"
            subtitle="Conoce mi Perfil"
        >
            <div className="max-w-4xl mx-auto">
                {/* Bio */}
                <div className="mb-12">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Soy estudiante de <span className="text-accent-primary font-semibold">Ingeniería de Sistemas de Información</span> con
                        un enfoque estratégico en arquitectura de software y eficiencia operativa. Mi objetivo es aplicar
                        capacidades técnicas sólidas para automatizar procesos y optimizar flujos digitales.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Con experiencia en desarrollo Full Stack (Python, JavaScript, Django, React) y conocimientos en DevOps,
                        busco generar impacto en entornos dinámicos y de alto rendimiento mediante soluciones escalables y bien estructuradas.
                    </p>
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
