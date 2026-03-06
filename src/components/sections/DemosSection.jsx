import Section from '../Section';
import DemoCard from '../DemoCard';
import { demos } from '../../data/portfolio';

function DemosSection() {
    return (
        <Section
            id="demos"
            title="Demos Interactivas"
            subtitle="Experiencias en Vivo"
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demos.map((demo, index) => (
                    <DemoCard key={index} {...demo} />
                ))}
            </div>
        </Section>
    );
}

export default DemosSection;
