import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({
  items = [],
  speed = 18,
  textColor = '#f2f0f8',
  bgColor = '#0d0c14',
  marqueeTextColor = '#ffffff',
  borderColor = 'rgba(59, 130, 246, 0.2)'
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link = '#',
  text,
  emoji,
  skills = [],
  accentColor = '#3b82f6',
  speed,
  textColor,
  marqueeTextColor,
  borderColor
}) {
  const itemRef        = useRef(null);
  const marqueeRef     = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef   = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const defaults = { duration: 0.6, ease: 'expo' };

  /* ── edge detection ───────────────────────────────────── */
  const dist = (x, y, x2, y2) => (x - x2) ** 2 + (y - y2) ** 2;
  const closestEdge = (mx, my, w, h) =>
    dist(mx, my, w / 2, 0) < dist(mx, my, w / 2, h) ? 'top' : 'bottom';

  /* ── calculate how many copies fill the viewport ─────── */
  useEffect(() => {
    const calc = () => {
      const part = marqueeInnerRef.current?.querySelector('.marquee__part');
      if (!part) return;
      const cw = part.offsetWidth;
      if (cw === 0) return;
      setRepetitions(Math.max(4, Math.ceil(window.innerWidth / cw) + 2));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, skills]);

  /* ── run infinite marquee ─────────────────────────────── */
  useEffect(() => {
    const setup = () => {
      const inner = marqueeInnerRef.current;
      if (!inner) return;
      const part = inner.querySelector('.marquee__part');
      if (!part) return;
      const cw = part.offsetWidth;
      if (cw === 0) return;
      animationRef.current?.kill();
      animationRef.current = gsap.to(inner, {
        x: -cw,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };
    const t = setTimeout(setup, 50);
    return () => {
      clearTimeout(t);
      animationRef.current?.kill();
    };
  }, [text, skills, repetitions, speed]);

  /* ── mouse handlers ───────────────────────────────────── */
  const onEnter = ev => {
    const rect = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap
      .timeline({ defaults })
      .set(marqueeRef.current,      { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ?  '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const onLeave = ev => {
    const rect = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
    gsap
      .timeline({ defaults })
      .to(marqueeRef.current,      { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ?  '101%' : '-101%' }, 0);
  };

  return (
    <div
      className="menu__item"
      ref={itemRef}
      style={{ borderColor }}
    >
      {/* ── default (non-hover) row ── */}
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={e => e.preventDefault()}
        style={{ color: textColor }}
      >
        <span className="menu__item-emoji">{emoji}</span>
        <span className="menu__item-text">{text}</span>
        <span className="menu__item-count" style={{ color: accentColor }}>
          {skills.length}&nbsp;skills
        </span>
      </a>

      {/* ── hover marquee overlay ── */}
      <div
        className="marquee"
        ref={marqueeRef}
        style={{ backgroundColor: accentColor }}
      >
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, ri) => (
              <div className="marquee__part" key={ri}>
                {skills.map((skill, si) => (
                  <span
                    key={si}
                    className="marquee__skill-badge"
                    style={{ color: marqueeTextColor }}
                  >
                    <span className="marquee__skill-icon">{skill.icon}</span>
                    <span className="marquee__skill-name">{skill.name}</span>
                  </span>
                ))}
                <span className="marquee__sep" style={{ color: marqueeTextColor }}>◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
