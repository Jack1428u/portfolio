import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/portfolio';

// Server Component — no requiere 'use client'
function ProjectsSection() {
    return (
        <Section
            id="projects"
            title="Proyectos"
            subtitle="Mi Trabajo"
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </Section>
    );
}

export default ProjectsSection;
