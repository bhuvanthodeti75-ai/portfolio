import { useEffect, useRef, useState } from 'react';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaPython, FaJava, FaGithub
} from 'react-icons/fa';
import {
  SiJavascript, SiExpress, SiSupabase, SiFirebase, SiVercel, SiNetlify, SiPostman, SiTypescript
} from 'react-icons/si';
import { HiSparkles, HiCubeTransparent, HiLightningBolt } from 'react-icons/hi';
import { motion, AnimatePresence } from 'motion/react';
import ExpandSkillCards from './ui/expand-cards';
import TextPressure from './TextPressure';
import './Skills.css';

/* ── skill data ─────────────────────────────────────────── */
const skillItems = [
  {
    text: 'Full Stack',
    emoji: '⚡',
    link: '#',
    accentColor: '#2563eb',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript />, desc: 'A versatile programming language that powers dynamic and interactive web applications.' },
      { name: 'TypeScript', icon: <SiTypescript />, desc: 'A typed superset of JavaScript that enhances development safety and autocomplete tooling.' },
      { name: 'React.js',   icon: <FaReact />, desc: 'A declarative, component-based frontend library for building highly responsive user interfaces.' },
      { name: 'Node.js',    icon: <FaNodeJs />, desc: 'A JavaScript runtime built on Chrome\'s V8 engine to execute code on the server side.' },
      { name: 'Express',    icon: <SiExpress />, desc: 'A lightweight and minimalist web framework for building backend APIs and server logic in Node.js.' },
      { name: 'HTML & CSS', icon: <FaHtml5 />, desc: 'The fundamental layout and styling languages used to build structured, beautiful web pages.' },
    ],
  },
  {
    text: 'Programming',
    emoji: '🖥️',
    link: '#',
    accentColor: '#7c3aed',
    skills: [
      { name: 'Python',      icon: <FaPython />, desc: 'A powerful, readable programming language optimized for scripts, data tasks, and automation.' },
      { name: 'Java',        icon: <FaJava />, desc: 'A robust, object-oriented compiled language designed for building platform-independent software.' },
      { name: 'JavaScript',  icon: <SiJavascript />, desc: 'A versatile programming language that powers dynamic and interactive web applications.' },
      { name: 'Data Science',icon: <FaDatabase />, desc: 'Leveraging data visualization, analytics, and statistical algorithms to extract insights.' },
      { name: 'CSS / SCSS',  icon: <FaCss3Alt />, desc: 'Advanced modular styles utilizing variables and nesting to author clean and scaleable CSS.' },
    ],
  },
  {
    text: 'Backend & Data',
    emoji: '🗄️',
    link: '#',
    accentColor: '#059669',
    skills: [
      { name: 'Supabase',  icon: <SiSupabase />, desc: 'An open-source Firebase alternative providing instant PostgreSQL databases, APIs, and Auth.' },
      { name: 'Firebase',  icon: <SiFirebase />, desc: 'A Google cloud-based mobile and web app development platform offering real-time data storage.' },
      { name: 'REST APIs', icon: <HiLightningBolt />, desc: 'Designing standard stateless web API endpoints for efficient client-server data communications.' },
      { name: 'SQL / NoSQL', icon: <FaDatabase />, desc: 'Designing structured and non-relational database architectures for optimized storage and lookup.' },
    ],
  },
  {
    text: 'AI & Automation',
    emoji: '🤖',
    link: '#',
    accentColor: '#d97706',
    skills: [
      { name: 'OpenAI API',         icon: <HiLightningBolt />, desc: 'Integrating state-of-the-art Generative AI models like GPT-4 into custom software products.' },
      { name: 'Gemini AI',          icon: <HiSparkles />, desc: 'Using Google\'s advanced multimodal AI models for processing text, images, and custom tasks.' },
      { name: 'Prompt Engineering', icon: <HiCubeTransparent />, desc: 'Crafting optimized instructions to steer generative language models to produce high-quality output.' },
      { name: 'Automation',         icon: <HiSparkles />, desc: 'Building automated workflow pipelines to automate manual tasks and accelerate delivery.' },
    ],
  },
  {
    text: 'Tools',
    emoji: '🛠️',
    link: '#',
    accentColor: '#dc2626',
    skills: [
      { name: 'GitHub',   icon: <FaGithub />, desc: 'A cloud hosting platform for git version control, collaboration, pull requests, and CI/CD pipelines.' },
      { name: 'VS Code',  icon: <HiCubeTransparent />, desc: 'A popular, lightweight, and extensible code editor custom-configured for modern web dev workflows.' },
      { name: 'Vercel',   icon: <SiVercel />, desc: 'An instant-deployment cloud hosting platform optimized for frontend frameworks and serverless execution.' },
      { name: 'Netlify',  icon: <SiNetlify />, desc: 'A git-connected hosting environment for deploying static web applications and serverless endpoints.' },
      { name: 'Postman',  icon: <SiPostman />, desc: 'An industry-standard application for building, sharing, testing, and documenting APIs.' },
    ],
  },
  {
    text: 'Soft Skills',
    emoji: '🌟',
    link: '#',
    accentColor: '#db2777',
    skills: [
      { name: 'Problem Solving',     icon: <HiLightningBolt />, desc: 'Analyzing complex logical challenges and building clean, optimized algorithms to solve them.' },
      { name: 'Team Collaboration',  icon: <HiSparkles />, desc: 'Working effectively inside cross-functional environments using collaborative methodologies.' },
      { name: 'Communication',       icon: <HiCubeTransparent />, desc: 'Articulating technical concepts clearly to team members, clients, and project stakeholders.' },
      { name: 'Leadership',          icon: <HiSparkles />, desc: 'Directing development workflows, coordinating tasks, and supporting team members to reach goals.' },
    ],
  },
];

const categoryDescriptions = {
  'Full Stack': 'Building responsive, modern user interfaces and connecting them with secure, optimized backend systems.',
  'Programming': 'Developing clean, efficient, and structured code in Python, Java, and JavaScript for various platforms.',
  'Backend & Data': 'Designing databases, handling secure user authentication, and orchestrating server APIs.',
  'AI & Automation': 'Integrating Generative AI models, writing advanced prompt workflows, and automated tasks.',
  'Tools': 'Utilizing modern version control, hosting environments, and API testing configurations.',
  'Soft Skills': 'Applying strong collaboration, communication, and creative problem-solving to every project.',
  'default': 'Hover over any category on the left to see the tools, frameworks, and programming languages I use to build applications.'
};

/* ── Skills section ─────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const hoveredCategoryData = skillItems.find(item => item.text === activeCategory);
  
  const featuredSkills = [
    { name: 'React.js', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Supabase', icon: <SiSupabase /> },
    { name: 'Gemini AI', icon: <HiSparkles /> }
  ];

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-divider reveal">
          <div className="section-divider__box">02</div>
          <span className="section-divider__text">SKILLS – THE TOOLS OF THE TRADE</span>
          <div className="section-divider__line"></div>
        </div>
        
        <div className="skills__large-header reveal" style={{ position: 'relative', height: 'clamp(100px, 14vw, 180px)', marginTop: '60px', marginBottom: '70px' }}>
          <TextPressure
            text="MY TOOLKIT"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={48}
            scale={false}
          />
        </div>

        <div className="skills__container">
          {/* ── Heading Side (Right) ─────────────────────────────── */}
          <div className="skills__text-side reveal">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '260px' }}>
              <AnimatePresence mode="wait">
                {activeSkill ? (
                  <motion.div
                    key={`skill-${activeSkill.name}`}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="skills__text-container"
                  >
                    <div className="skills__showcase-icon-wrapper">
                      {activeSkill.icon}
                    </div>
                    <h2 className={`skills__showcase-name ${activeSkill.name.length > 12 ? 'skills__showcase-name--small' : ''}`}>
                      {activeSkill.name}
                    </h2>
                    <p className="skills__showcase-desc">
                      {activeSkill.desc || "Experienced in this technology to build scalable, modern products."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategory || "default"}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="skills__text-container"
                  >
                    <h2 style={{ margin: '0 0 16px 0' }}>
                      {activeCategory || "Skills"}
                    </h2>
                    <p style={{ margin: '0 0 24px 0', fontSize: '1.05rem', opacity: 0.95 }}>
                      {categoryDescriptions[activeCategory] || categoryDescriptions['default']}
                    </p>
                    
                    <div className="skills__sub-skills-grid">
                      {(hoveredCategoryData ? hoveredCategoryData.skills : featuredSkills).map((skill, index) => (
                        <span key={index} className="skills__sub-skill-tag">
                          <span className="skills__sub-skill-icon">{skill.icon}</span>
                          <span className="skills__sub-skill-name">{skill.name}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Expand-on-hover tech gallery (Left) ───────────────── */}
          <div className="skills__gallery-wrapper reveal" style={{ transitionDelay: '0.2s' }}>
            <ExpandSkillCards 
              items={skillItems} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              setActiveSkill={setActiveSkill}
            />
            <p className="skills__subtitle-below">Hover over a category to see the technologies inside</p>
          </div>
        </div>
      </div>
    </section>
  );
}
