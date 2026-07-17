import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
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
            href="https://linkedin.com/in/bhuvan-thodeti"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <p className="footer__copy">
          © {currentYear} Bhuvan Thodeti. Built with React & passion.
        </p>
      </div>
    </footer>
  );
}
