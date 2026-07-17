import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
    if (!isHome) {
      navigate(`/#${target}`);
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    setMenuOpen(false);
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
          <span className="navbar__logo-sub">DESIGN LAB / ©26</span>
        </button>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
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

        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </nav>
  );
}
