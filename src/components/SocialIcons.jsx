import { useRef, useEffect } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './SocialIcons.css';

function MagneticIcon({ href, children, ariaLabel }) {
  const containerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    if (!container || !icon) return;

    let mouseX = 25; // center of 50px
    let mouseY = 25; // center of 50px
    let currentX = 25;
    let currentY = 25;
    let animationFrameId = null;

    const updatePosition = () => {
      // Smooth interpolation (lerp)
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      icon.style.setProperty('--siLeft', `${currentX}px`);
      icon.style.setProperty('--siTop', `${currentY}px`);

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Inside or near the 50x50 span
      if (x >= 0 && x <= 50 && y >= 0 && y <= 50) {
        // Apply magnetic pull: scale down the offset slightly to keep it within bounds
        mouseX = 25 + (x - 25) * 0.6;
        mouseY = 25 + (y - 25) * 0.6;
      } else {
        mouseX = 25;
        mouseY = 25;
      }
    };

    const handleMouseLeave = () => {
      mouseX = 25;
      mouseY = 25;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation loop
    updatePosition();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <span ref={containerRef} className="social-icon-wrapper">
      <a
        ref={iconRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        style={{
          '--siLeft': '25px',
          '--siTop': '25px',
        }}
      >
        {children}
      </a>
    </span>
  );
}

export default function SocialIcons() {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <MagneticIcon href="https://github.com/bhuvanthodeti75-ai" ariaLabel="GitHub">
          <FaGithub />
        </MagneticIcon>
        <MagneticIcon
          href="https://www.linkedin.com/in/bhuvan-thodeti-4b8008338?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          ariaLabel="LinkedIn"
        >
          <FaLinkedinIn />
        </MagneticIcon>
        <MagneticIcon href="https://x.com/BhuvanThod88374" ariaLabel="X (formerly Twitter)">
          <FaXTwitter />
        </MagneticIcon>
        <MagneticIcon href="https://instagram.com" ariaLabel="Instagram">
          <FaInstagram />
        </MagneticIcon>
      </div>
    </div>
  );
}
