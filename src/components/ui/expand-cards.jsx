import "./expand-cards.css";

/**
 * ExpandSkillCards
 * Receives the same `skillItems` array.
 * Each card collapses to show just the heading; on hover/tap it widens
 * and reveals the list of skills with icons.
 */
const ExpandSkillCards = ({ items = [], activeCategory, setActiveCategory, setActiveSkill }) => {
  return (
    <div className="ec__root">
      <div 
        className="ec__track"
        onMouseLeave={() => {
          setActiveCategory(null);
          if (setActiveSkill) setActiveSkill(null);
        }}
      >
        {items.map((category, idx) => {
          const isOpen = activeCategory 
            ? category.text === activeCategory 
            : idx === 0;

          return (
            <div
              key={idx}
              className={`ec__panel${isOpen ? " ec__panel--open" : ""}`}
              style={{ "--accent": category.accentColor }}
              onMouseEnter={() => setActiveCategory(category.text)}
              onClick={() => setActiveCategory(category.text)}
            >
              {/* ── Collapsed heading (always visible, rotated) ── */}
              <div className="ec__heading">
                <span className="ec__emoji">{category.emoji}</span>
                <span className="ec__title">{category.text}</span>
              </div>

              {/* ── Expanded content ─────────────────────────── */}
              <div className="ec__body">
                <div className="ec__body-header">
                  <span className="ec__body-emoji">{category.emoji}</span>
                  <h3 className="ec__body-title">{category.text}</h3>
                </div>
                <ul className="ec__skill-list">
                  {category.skills.map((skill, sIdx) => (
                    <li 
                      key={sIdx} 
                      className="ec__skill-item"
                      onMouseEnter={() => setActiveSkill && setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill && setActiveSkill(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setActiveSkill) setActiveSkill(skill);
                      }}
                    >
                      <span className="ec__skill-icon">{skill.icon}</span>
                      <span className="ec__skill-name">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* accent bar at the bottom of each panel */}
              <div className="ec__accent-bar" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandSkillCards;
