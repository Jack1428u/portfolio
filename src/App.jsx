import Header from './components/Header';
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import DemosSection from './components/sections/DemosSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        {/* <DemosSection /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
