import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StaggeredMenu from './StaggeredMenu';
import './Navbar.css';

const navLinks = [
  { label: 'About', target: 'about', link: '#about' },
  { label: 'Skills', target: 'skills', link: '#skills' },
  { label: 'Projects', target: 'projects', link: '#projects' },
  { label: 'Experience', target: 'experience', link: '#experience' },
  { label: 'Contact', target: 'contact', link: '#contact' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/bhuvanthodeti75-ai' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/bhuvan-thodeti-4b8008338' },
  { label: 'Resume (Re)', link: '/Bhuvan_Thodeti_Resume.pdf' },
  { label: 'Gmail', link: 'mailto:bhuvanthodeti75@gmail.com' },
];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    if (!isHome) return;

    const sections = navLinks.map((l) => document.getElementById(l.target));
    let current = '';
    for (const section of sections) {
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          current = section.id;
        }
      }
    }
    setActive(current);
  }, [isHome]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (target) => {
    if (!isHome) {
      navigate(`/#${target}`);
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStaggeredItemClick = (e, target) => {
    e.preventDefault();
    const cleanTarget = target.replace('#', '').replace('/', '');
    if (cleanTarget) {
      scrollToSection(cleanTarget);
    }
  };

  const goHome = () => {
    if (!isHome) {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <button className="navbar__logo" onClick={goHome}>
          <span className="navbar__logo-name">BHUVAN THODETI</span>
          <span className="navbar__logo-sub">DESIGN LAB / © 26</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="navbar__links navbar__desktop-links">
          {navLinks.map((link) => (
            <button
              key={link.target}
              className={`navbar__link ${active === link.target ? 'navbar__link--active' : ''}`}
              onClick={() => scrollToSection(link.target)}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
          <div className="navbar__status-badge">
            <span className="navbar__status-dot"></span>
            AVAILABLE
          </div>
        </div>

        {/* Mobile / Responsive StaggeredMenu from React Bits */}
        <div className="navbar__mobile-staggered">
          <StaggeredMenu
            position="right"
            items={navLinks}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#3b82f6"
            changeMenuColorOnOpen={true}
            colors={['#1e1b4b', '#1e3a8a', '#3b82f6']}
            accentColor="#3b82f6"
            isFixed={false}
            onItemClick={handleStaggeredItemClick}
          />
        </div>
      </div>
    </nav>
  );
}
