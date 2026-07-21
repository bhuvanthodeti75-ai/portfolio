import Lanyard from './Lanyard';
import FuzzyText from './FuzzyText';
import { HiArrowDown } from 'react-icons/hi';
import myPhoto from '../assets/lanyard/my-photo.png';
import './Hero.css';

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero" aria-label="Hero - Bhuvan Thodeti Portfolio">
      <div className="hero__grid container">
        <div className="hero__text-side">
          <p className="hero__meta-init reveal">[ INITIALIZING - BHUVAN THODETI PORTFOLIO_2026 // DESIGN LAB ONLINE ]</p>

          <h1 className="hero__name reveal" aria-label="Bhuvan Thodeti - AI Developer &amp; Full Stack Developer Portfolio">
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
              Bhuvan Thodeti — AI Developer, Full Stack Developer &amp; Software Engineer Portfolio
            </span>
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.59}
              enableHover={true}
              color="#ffffff"
              fontSize="clamp(3.5rem, 10vw, 8rem)"
              fontWeight={800}
            >
              DESIGN
            </FuzzyText>
            <br />
            <span className="hero__name-accent">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.59}
                enableHover={true}
                color="#3B82F6"
                fontSize="clamp(3.5rem, 10vw, 8rem)"
                fontWeight={800}
              >
                LOUDER
              </FuzzyText>
            </span>
          </h1>

          <div className="hero__label-group reveal">
            <span className="hero__label-item">FULL STACK DEVELOPER</span>
            <span className="hero__label-sep">/</span>
            <span className="hero__label-item">AI DEVELOPER</span>
            <span className="hero__label-sep">/</span>
            <span className="hero__label-item">AUTOMATION ENGINEER</span>
          </div>

          <p className="hero__tagline reveal">
            I'm <strong>Bhuvan Thodeti</strong>, an AI Developer, Full Stack Developer, and second-year B.Tech CSE Data Science student building real-world web applications, AI products, Generative AI models, and web automation experiences.
          </p>

          <div className="hero__meta-footer reveal">
            <span>HYDERABAD, TELANGANA, IN</span>
            <span>B.TECH CSE DATA SCIENCE @ MRDU</span>
          </div>
        </div>

        <div className="hero__lanyard-side reveal" aria-label="Interactive 3D Badge - Bhuvan Thodeti AI Developer">
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={myPhoto} imageFit="cover" />
          <div className="hero__lanyard-instruction">
            <span className="hero__lanyard-dot"></span>
            DRAG &amp; SWING THE BADGE
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator" onClick={scrollToAbout} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToAbout()} aria-label="Scroll to About section">
        <span className="hero__scroll-text">SCROLL TO WORK</span>
        <HiArrowDown className="hero__scroll-arrow" aria-hidden="true" />
      </div>
    </section>
  );
}
