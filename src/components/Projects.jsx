import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import projects from '../data/projectData';
import InfiniteMenu from './ui/InfiniteMenu';
import ASCIIText from './ASCIIText';
import './Projects.css';

/* ── Map each project into an InfiniteMenu item ─────────── */
const projectItems = projects.map((p, i) => {
  // Use distinct Unsplash tech images per project
  const unsplashImages = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  ];
  return {
    image: unsplashImages[i % unsplashImages.length],
    link: `/project/${p.slug}`,
    title: p.title,
    description: p.tagline,
    slug: p.slug,
  };
});

export default function Projects() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Override link handler to use React Router for internal links
  const itemsWithRouter = projectItems.map(item => ({
    ...item,
    // Keep link as-is; InfiniteMenu's action button will open it
    // We patch window.open only for internal routes via the component's click
  }));

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">03</div>
          <span className="section-divider__text">PROJECTS – THE WORKSHOP OF CREATION</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="section-header reveal" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '180px', margin: '0 auto' }}>
            <ASCIIText
              text="PROJECTS"
              enableWaves={false}
              asciiFontSize={9}
              textFontSize={300}
              planeBaseHeight={15.5}
              textColor="#ffffff"
            />
          </div>
          <p style={{ marginTop: '16px' }}>Things I've built — drag the globe to explore, click ↗ to view</p>
        </div>

        <div className="projects__globe-wrapper reveal" style={{ transitionDelay: '0.15s' }}>
          <InfiniteMenu items={itemsWithRouter} scale={1.05} />
        </div>
      </div>
    </section>
  );
}
