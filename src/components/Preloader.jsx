import { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fluidProgress, setFluidProgress] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    let animationFrameId;
    let startTime = null;
    const duration = 2400; // 2.4s silky smooth loading sequence

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth Ease-Out Quad curve (gentle deceleration, continuous subpixel motion)
      const eased = 1 - (1 - t) * (1 - t);
      const currentFluid = eased * 100;
      const currentInteger = Math.min(100, Math.floor(currentFluid));

      setFluidProgress(currentFluid);
      setDisplayProgress(currentInteger);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setFluidProgress(100);
        setDisplayProgress(100);

        // Pause briefly at 100% before opening curtain
        setTimeout(() => {
          setIsEnding(true);

          // Unmount preloader after curtain lift
          setTimeout(() => {
            setIsHidden(true);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 750);
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className={`preloader ${isEnding ? 'preloader--ending' : ''}`}>
      {/* Background Faint Marquee Text */}
      <div className="preloader__bg-text" aria-hidden="true">
        BHUVAN THODETI • FULL STACK DEVELOPER • AI & AUTOMATION • BUILDER • DESIGN LAB •&nbsp;
        BHUVAN THODETI • FULL STACK DEVELOPER • AI & AUTOMATION • BUILDER • DESIGN LAB •&nbsp;
      </div>

      {/* Top Bar */}
      <div className="preloader__header">
        <div className="preloader__header-left">
          PORTFOLIO <span className="preloader__accent-year">2026</span>
        </div>
        <div className="preloader__header-right">
          Bhuvan / ©26
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="preloader__center">
        {/* Animated Gauge / Wheel Icon */}
        <div className="preloader__icon-wrapper">
          <svg className="preloader__clock-svg" viewBox="0 0 100 100">
            {/* Outer Circle */}
            <circle cx="50" cy="50" r="44" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2.5" fill="none" />
            {/* Ticks */}
            <line x1="50" y1="8" x2="50" y2="14" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
            <line x1="50" y1="86" x2="50" y2="92" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
            <line x1="8" y1="50" x2="14" y2="50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
            <line x1="86" y1="50" x2="92" y2="50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" />
            {/* Continuous Subpixel Rotating Gauge Hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="14"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                transformOrigin: '50px 50px',
                transform: `rotate(${fluidProgress * 3.6}deg)`
              }}
            />
            {/* Accent Pivot Dot */}
            <circle cx="50" cy="50" r="4.5" fill="#3B82F6" />
          </svg>
        </div>

        {/* Large Counter with Superscript % */}
        <div className="preloader__counter">
          <span className="preloader__number">{displayProgress}</span>
          <span className="preloader__percent-sign">%</span>
        </div>

        {/* Headline */}
        <h1 className="preloader__headline">
          WELCOME TO THE <span className="preloader__headline-accent">CREATION</span>
        </h1>

        {/* Sub-tagline */}
        <p className="preloader__tagline">
          WHERE WEIRD WEBSITES GET BUILT
        </p>
      </div>

      {/* Bottom Progress Bar & Footer Info */}
      <div className="preloader__footer-wrapper">
        <div className="preloader__progress-track">
          <div
            className="preloader__progress-line"
            style={{ width: `${fluidProgress}%` }}
          ></div>
        </div>

        <div className="preloader__footer">
          <div className="preloader__footer-left">BHUVAN THODETI</div>
          <div className="preloader__footer-right">
            LOADING ASSETS<span className="preloader__blinking-cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
