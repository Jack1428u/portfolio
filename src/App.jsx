import Header from './components/Header';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import DemosSection from './components/sections/DemosSection';
import Footer from './components/Footer';
import CertificateSection from './components/sections/CertificateSection';
import ContactForm from './components/sections/ContactForm';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        {/* <DemosSection /> */}
        <CertificateSection/>
        <ContactForm/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
