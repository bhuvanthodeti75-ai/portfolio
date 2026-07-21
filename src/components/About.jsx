import { useEffect, useRef } from 'react';
import { HiSparkles } from 'react-icons/hi';
import './About.css';
import Folder from './Folder';
import VariableProximity from './VariableProximity';
import DecryptedText from './DecryptedText';

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const paperItems = [
    <div className="paper-content" key="full-stack">
      <div className="paper-header">
        <HiSparkles className="paper-icon" />
        <h3>Full Stack Developer</h3>
      </div>
      <p className="paper-text">
        Hey I'm <strong>Bhuvan Thodeti</strong>, a second-year B.Tech student
        in Computer Science & Engineering (Data Science) Passionate about developing end-to-end web applications using
        modern technologies. I enjoy designing responsive interfaces, building secure APIs, managing databases,
        and deploying applications
      </p>
    </div>,
    <div className="paper-content" key="ai-automation">
      <div className="paper-header">
        <HiSparkles className="paper-icon" />
        <h3>AI & Automation Builder</h3>
      </div>
      <p className="paper-text">
        My work focuses on <strong>web development, AI applications, automation, and
          full-stack development</strong>. I have built 5+ real-world web applications,
        including live client projects, and I like turning ideas into deployed products
        that people can actually use.
      </p>
    </div>,
    <div className="paper-content" key="hackathon-winner">
      <div className="paper-header">
        <HiSparkles className="paper-icon" />
        <h3>Hackathon Prize Winner</h3>
      </div>
      <p className="paper-text">
        I have completed 3 real client projects, participated in multiple hackathons
        and codeathons, and won <strong>2nd Prize at the PRAESTO 2K26 Generative AI Hackathon</strong>.
        I am looking for opportunities to gain practical experience and contribute to
        innovative, impactful products.
      </p>
    </div>
  ];

  return (
    <section className="about section" id="about" ref={sectionRef} aria-label="About Bhuvan Thodeti - AI Developer &amp; Full Stack Developer">
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">01</div>
          <span className="section-divider__text">ABOUT – BHUVAN THODETI</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="about__layout">
          <div className="about__header reveal" ref={headerRef} style={{ position: 'relative' }}>
            <h2 aria-label="About Bhuvan Thodeti">
              <VariableProximity
                label="ABOUT"
                containerRef={headerRef}
                radius={250}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 900"
                style={{ color: '#ffffff', display: 'inline-block' }}
              />{' '}
              <VariableProximity
                label="ME"
                containerRef={headerRef}
                radius={250}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 900"
                style={{ color: '#3B82F6', display: 'inline-block' }}
              />
            </h2>
            <h3 className="about__subtitle">
              I'm <strong>Bhuvan Thodeti</strong> — an AI Developer, Full Stack Developer, Generative AI Enthusiast &amp; student at <span className="about__subtitle-uni">Malla Reddy University</span>.
            </h3>
            <p className="about__intro">
              I'm Bhuvan Thodeti, a Software Engineer, Full Stack Developer, and React Developer passionate about building modern, responsive, and user-focused web applications and AI products. I combine clean UI design with efficient engineering to deliver scalable digital experiences.
            </p>
            <div className="about__table">
              <div className="about__table-row">
                <div className="about__table-label">EDUCATION</div>
                <div className="about__table-value">
                  <div className="value-line-1">B.Tech – CSE (Data Science)</div>
                  <div className="value-line-2">Malla Reddy University</div>
                </div>
              </div>
              <div className="about__table-row">
                <div className="about__table-label">BASED</div>
                <div className="about__table-value">Hyderabad, Telangana, India</div>
              </div>
              <div className="about__table-row">
                <div className="about__table-label">FOCUS</div>
                <div className="about__table-value">AI Development, Full-Stack Web Development &amp; Automation</div>
              </div>
              <div className="about__table-row">
                <div className="about__table-label">STATUS</div>
                <div className="about__table-value">Open to Internships &amp; Freelance Opportunities</div>
              </div>
            </div>
          </div>

          <div className="about__content reveal">
            <div className="folder-container">
              <Folder color="#3B82F6" size={1.3} items={paperItems} />
              <div className="folder-instruction">Click the folder to explore Bhuvan Thodeti's journey</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




