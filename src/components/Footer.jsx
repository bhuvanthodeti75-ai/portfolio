import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__socials">
          <a
            href="https://github.com/bhuvanthodeti75-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bhuvan-thodeti-4b8008338?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://x.com/BhuvanThod88374"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="X (formerly Twitter)"
          >
            <FaXTwitter />
          </a>
        </div>

        <p className="footer__copy">
          © {currentYear} Bhuvan Thodeti. Built with React & passion.
        </p>
      </div>
    </footer>
  );
}
