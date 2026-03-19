import Section from '@/components/Section';
import CertificateCard from '@/components/CertificateCard';
import { certifications } from '@/data/certifications';

// Server Component — no requiere 'use client'
export default function CertificateSection() {
    return (
        <Section
            id="certifications"
            title="Certificaciones"
            subtitle="Mis certificaciones"
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((certificate, index) => (
                    <CertificateCard key={index} {...certificate} />
                ))}
            </div>
        </Section>
    );
}
