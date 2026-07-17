import { useEffect, useRef } from 'react';
import { FaGraduationCap, FaTrophy, FaLaptopCode, FaAward, FaCode } from 'react-icons/fa';
import Stack from './Stack';
import MagicRings from './MagicRings';
import TrueFocus from './TrueFocus';
import './Experience.css';

const items = [
  {
    text: 'Pursuing Computer Science & Engineering with a Data Science specialization at Malla Reddy Deemed to be University. Currently in 2nd year.',
    title: 'B.Tech CSE (Data Science)',
    subtitle: 'MRDU (2025 - 2029)',
    icon: <FaGraduationCap />,
  },
  {
    text: 'Won 2nd Prize at PRAESTO 2K26, organized by MRDU and GeeksforGeeks, for building with generative AI concepts and practical product thinking.',
    title: 'Generative AI Hackathon',
    subtitle: '2nd Prize - 2026',
    icon: <FaTrophy />,
  },
  {
    text: 'Completed a professional educational institution website with responsive UI, optimized UX, and full deployment for a real client.',
    title: 'RB Educations Website',
    subtitle: 'Client Project - 2026',
    icon: <FaLaptopCode />,
  },
  {
    text: 'Participated in CODE-A-THON by Forge Alumnus, Forge Inspira at IIT Hyderabad, NOVUS 24-Hr Hackathon, and ARTIX 2026 Project Expo.',
    title: 'Hackathons & Events',
    subtitle: 'Certificates & Participation',
    icon: <FaAward />,
  },
  {
    text: 'Built 5+ real-world web applications, including 3 deployed live projects, focusing on full-stack development, AI products, and automation.',
    title: 'Full-Stack & AI Apps',
    subtitle: 'Ongoing Development',
    icon: <FaCode />,
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience section" id="experience" ref={sectionRef} style={{ position: 'relative' }}>
      {/* Background Magic Rings covering the entire section */}
      <div className="experience__rings-bg">
        <MagicRings
          color="#3366F1"
          colorTwo="#42fcff"
          ringCount={6}
          speed={0.9}
          attenuation={11.5}
          lineThickness={3.5}
          baseRadius={0.38}
          radiusStep={0.10}
          scaleRate={0.12}
          opacity={0.85}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-divider reveal">
          <div className="section-divider__box">04</div>
          <span className="section-divider__text">EXPERIENCE – THE PATH ACCOMPLISHED</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="section-header reveal" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TrueFocus 
            sentence="Experience & Achievements"
            manualMode={false}
            blurAmount={3}
            borderColor="#3366F1"
            glowColor="rgba(51, 102, 241, 0.6)"
            animationDuration={1.2}
            pauseBetweenAnimations={1.5}
          />
          <p style={{ marginTop: '16px' }}>Education, client work, hackathons, and project milestones — drag or click cards to browse</p>
        </div>

        <div className="experience__stack-wrapper reveal" style={{ transitionDelay: '0.15s' }}>
          {/* Interactive Card Stack */}
          <div className="experience__stack-content">
            <Stack
              randomRotation={true}
              sensitivity={150}
              sendToBackOnClick={true}
              autoplay={false}
              cards={items.map((item, idx) => (
                <div
                  className="experience__card card"
                  key={idx}
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', margin: 0, padding: '32px' }}
                >
                  <div className="experience__icon">
                    {item.icon}
                  </div>
                  <p className="experience__text">{item.text}</p>
                  <div className="experience__author">
                    <div className="experience__author-avatar">
                      {item.title.charAt(0)}
                    </div>
                    <div>
                      <span className="experience__name">{item.title}</span>
                      <span className="experience__role">{item.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

