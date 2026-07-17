import { useEffect, useRef } from 'react';
import Magnet from './Magnet';
import './Contact.css';

export default function Contact() {
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

  const formContainerRef = useRef(null);

  useEffect(() => {
    if (formContainerRef.current) {
      // Clear any existing elements
      formContainerRef.current.innerHTML = '';

      // Dynamically create the visme_d element so React does not track it
      const vismeDiv = document.createElement('div');
      vismeDiv.className = 'visme_d';
      vismeDiv.setAttribute('data-title', 'Newsletter Signup Form');
      vismeDiv.setAttribute('data-url', 'wpenjekr-newsletter-signup-form');
      vismeDiv.setAttribute('data-domain', 'forms');
      vismeDiv.setAttribute('data-full-page', 'false');
      vismeDiv.setAttribute('data-min-height', '500px');
      vismeDiv.setAttribute('data-form-id', '191001');
      vismeDiv.style.width = '100%';
      vismeDiv.style.maxWidth = '600px';
      vismeDiv.style.minHeight = '500px';

      formContainerRef.current.appendChild(vismeDiv);
    }

    const scriptId = 'visme-forms-embed-script';
    let script = document.getElementById(scriptId);

    const handleLoad = () => {
      if (window.vismeForms) {
        window.vismeForms.setupVisme();
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      script.addEventListener('load', handleLoad);
      document.body.appendChild(script);
    } else {
      if (window.vismeForms) {
        window.vismeForms.setupVisme();
      } else {
        script.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (script) {
        script.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">05</div>
          <span className="section-divider__text">CONTACT – THE COMMUNICATION HUB</span>
          <div className="section-divider__line"></div>
        </div>
        <div className="section-header reveal" style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Magnet padding={50} disabled={false} magnetStrength={10}>
            <h2>Get <span style={{ color: 'var(--accent)' }}>In</span> Touch</h2>
          </Magnet>
          <p>Have an opportunity, project, or collaboration in mind? Let's talk.</p>
        </div>

        <div className="contact__form-container reveal" ref={formContainerRef}></div>
      </div>
    </section>
  );
}
