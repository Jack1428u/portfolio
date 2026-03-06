import Section from '../Section'
import { certifications } from '../../data/certifications'
import CertificateCard from '../CertificateCard'
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

    )
}