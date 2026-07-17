import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DotField from './components/DotField';
import Aurora from './components/Aurora';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash-based scrolling when navigating back from project detail pages
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <div className="site-background" aria-hidden="true">
        <Aurora
          colorStops={['#3b82f6', '#1e3a8a', '#0a0a0f']}
          blend={0.6}
          amplitude={1.1}
          speed={0.8}
        />
      </div>
      <div className="site-dotfield" aria-hidden="true">
        <DotField
          dotRadius={2}
          dotSpacing={21}
          bulgeStrength={100}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={750}
          cursorForce={0.39}
          gradientFrom="#3B82F6"
          gradientTo="#3B82F6"
          glowColor="#3e4e6f"
        />
      </div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
