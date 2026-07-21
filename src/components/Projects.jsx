import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import projects from '../data/projectData';
import InfiniteMenu from './ui/InfiniteMenu';
import ASCIIText from './ASCIIText';
import './Projects.css';

/* ── Map each project into an InfiniteMenu item ─────────── */
const projectItems = projects.map((p, i) => {
  const unsplashImages = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  ];
  return {
    image: (p.thumbnail && p.thumbnail !== '#' && !p.thumbnail.includes('thumb.jpg')) ? p.thumbnail : unsplashImages[i % unsplashImages.length],
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

  return (
    <section className="projects section" id="projects" ref={sectionRef} aria-label="Projects &amp; Work - Bhuvan Thodeti">
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">03</div>
          <span className="section-divider__text">PROJECTS – CREATIONS BY BHUVAN THODETI</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="section-header reveal" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
            Projects — Built by Bhuvan Thodeti | AI Developer &amp; Full Stack Engineer
          </h2>
          <div className="projects__ascii-header" style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '180px', margin: '0 auto' }} aria-label="Projects Heading">
            <ASCIIText
              text="PROJECTS"
              enableWaves={false}
              asciiFontSize={9}
              textFontSize={300}
              planeBaseHeight={15.5}
              textColor="#ffffff"
            />
          </div>
          <p style={{ marginTop: '16px' }}>Full Stack web applications, AI tools &amp; client products engineered by Bhuvan Thodeti — drag the globe to explore, click ↗ to view</p>
        </div>

        <div className="projects__globe-wrapper reveal" style={{ transitionDelay: '0.15s' }}>
          <InfiniteMenu items={projectItems} scale={1.05} />
        </div>
      </div>
    </section>
  );
}
