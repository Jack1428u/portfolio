import Hero from '@/sections/Hero';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import CertificateSection from '@/sections/CertificateSection';
// import DemosSection from '@/sections/DemosSection'; // Activar cuando esté listo

export default function HomePage() {
    return (
        <>
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <CertificateSection />
        </>
    );
}
