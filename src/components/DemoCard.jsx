function DemoCard({ title, description, technologies, demoLink, image, isLive = true }) {
    return (
        <div className="card-base p-6 group">
            {/* Image/Preview */}
            <div className="mb-4 h-48 bg-dark-surface rounded-lg overflow-hidden relative">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
                {isLive && (
                    <div className="absolute top-3 right-3">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-success text-white text-xs font-semibold rounded-full">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-smooth">
                {title}
            </h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {description}
            </p>

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-dark-surface text-accent-secondary border border-dark-border-emphasis rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}

            {/* Action */}
            {demoLink && (
                <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-secondary text-white text-sm font-medium rounded-lg transition-smooth w-full justify-center mt-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ver Demo en Vivo</span>
                </a>
            )}
        </div>
    );
}

export default DemoCard;
