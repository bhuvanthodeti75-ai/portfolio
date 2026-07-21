import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiExternalLink, HiCode } from 'react-icons/hi';
import projects from '../data/projectData';
import SEO from './SEO';
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
        <SEO
          title="Project Not Found | Bhuvan Thodeti Portfolio"
          description="The requested project was not found in Bhuvan Thodeti's portfolio."
          path={`/project/${slug || 'not-found'}`}
        />
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

  // Schema.org structured data for Project Page
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.tagline,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "url": project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : `https://bhuvanthodeti.vercel.app/project/${project.slug}`,
        "author": {
          "@type": "Person",
          "name": "Bhuvan Thodeti",
          "url": "https://bhuvanthodeti.vercel.app/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bhuvanthodeti.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://bhuvanthodeti.vercel.app/#projects"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `https://bhuvanthodeti.vercel.app/project/${project.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="project-detail">
      <SEO
        title={`${project.title} | Bhuvan Thodeti`}
        description={`${project.title} — ${project.tagline}. Built by Bhuvan Thodeti, AI Developer & Full Stack Engineer.`}
        keywords={`${project.title}, Bhuvan Thodeti, Bhuvan, ${project.techStack.join(', ')}, AI Developer, Full Stack Developer, Portfolio`}
        image={project.thumbnail ? `https://bhuvanthodeti.vercel.app${project.thumbnail}` : undefined}
        path={`/project/${project.slug}`}
        jsonLd={projectJsonLd}
      />
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
                          <img
                            src={src}
                            alt={`${project.title} Screenshot ${idx + 1} - Bhuvan Thodeti AI Developer & Full Stack Engineer`}
                            loading="lazy"
                            decoding="async"
                          />
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
