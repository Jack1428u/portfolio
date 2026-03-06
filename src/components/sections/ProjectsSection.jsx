import Section from '../Section';
import ProjectCard from '../ProjectCard';
import { projects } from '../../data/portfolio';

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
