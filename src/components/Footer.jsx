import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
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
            rel="me noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub Profile of Bhuvan Thodeti"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bhuvan-thodeti-4b8008338?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="me noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn Profile of Bhuvan Thodeti"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="/Bhuvan_Thodeti_Resume.pdf"
            target="_blank"
            rel="me noopener noreferrer"
            className="footer__social-link"
            aria-label="Bhuvan Thodeti Resume (PDF)"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '1.1rem' }}
          >
            Re
          </a>
          <a
            href="mailto:bhuvanthodeti75@gmail.com"
            target="_blank"
            rel="me noopener noreferrer"
            className="footer__social-link"
            aria-label="Email Bhuvan Thodeti via Gmail"
          >
            <SiGmail />
          </a>
        </div>

        <p className="footer__copy">
          © {currentYear} Bhuvan Thodeti — AI Developer &amp; Full Stack Engineer. Built with React &amp; passion.
        </p>
      </div>
    </footer>
  );
}
