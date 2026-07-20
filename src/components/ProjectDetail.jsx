import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiExternalLink, HiCode } from 'react-icons/hi';
import projects from '../data/projectData';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-detail section">
        <div className="container">
          <div className="project-detail__not-found">
            <h2>Project not found</h2>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/" className="btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      {/* Hero Banner */}
      <div className="project-detail__hero">
        <div className="project-detail__hero-bg">
          <span className="project-detail__hero-letter">{project.title.charAt(0)}</span>
        </div>
        <div className="project-detail__hero-content container">
          <button className="project-detail__back" onClick={() => navigate('/#projects')}>
            <HiArrowLeft /> Back to Projects
          </button>
          <div className="project-detail__hero-tags">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
          <h1>{project.title}</h1>
          <p className="project-detail__hero-tagline">{project.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="project-detail__body section">
        <div className="container">
          <div className="project-detail__grid">
            {/* Main content */}
            <div className="project-detail__main">
              <div className="project-detail__section card">
                <h3>The Problem</h3>
                <p>{project.problem}</p>
              </div>

              <div className="project-detail__section card">
                <h3>My Contribution</h3>
                <p>{project.contribution}</p>
              </div>

              {/* Screenshots Gallery */}
              <div className="project-detail__screenshots">
                <h3>Project Screenshots</h3>
                <div className="project-detail__screenshot-grid">
                  {project.screenshots.map((src, idx) => (
                    <div className="project-detail__screenshot-card card" key={idx}>
                      {src && src !== '#' ? (
                        <a
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-detail__screenshot-link"
                          title="Click to open full high-res screenshot"
                        >
                          <img src={src} alt={`${project.title} screenshot ${idx + 1}`} loading="lazy" />
                        </a>
                      ) : (
                        <div className="project-detail__screenshot-placeholder">
                          <span>Screenshot {idx + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="project-detail__sidebar">
              <div className="project-detail__sidebar-card card">
                <h4>Tech Stack</h4>
                <div className="project-detail__stack-list">
                  {project.techStack.map((tech) => (
                    <span className="tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-detail__sidebar-card card">
                <h4>Year</h4>
                <p>{project.date}</p>
              </div>

              <div className="project-detail__sidebar-links">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <HiExternalLink /> Live Site
                  </a>
                )}
                {project.repoUrl && project.repoUrl !== '#' && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    <HiCode /> Source Code
                  </a>
                )}
                {(!project.liveUrl || project.liveUrl === '#') && (!project.repoUrl || project.repoUrl === '#') && (
                  <p className="project-detail__links-note">Links coming soon</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
