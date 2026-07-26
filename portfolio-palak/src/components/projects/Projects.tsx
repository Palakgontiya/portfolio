import { FaExternalLinkAlt, FaGithub, FaLayerGroup, FaSearch, FaLock, FaFilm } from "react-icons/fa";
import "./Projects.scss";

const projects = [
  {
    id: "resume-builder",
    title: "Resume Builder",
    category: "Featured Project",
    description:
      "A modern, responsive resume builder application with real-time preview, multiple customizable design templates, and instant PDF export capabilities. Built with React and TypeScript.",
    tech: ["React", "TypeScript", "SCSS", "Redux Toolkit", "PDF Export"],
    demoLink: "https://github.com/Palakgontiya",
    githubLink: "https://github.com/Palakgontiya",
    icon: <FaLayerGroup />,
    mockBadge: "LIVE PREVIEW",
  },
  {
    id: "job-portal",
    title: "Job Recommendation Portal",
    category: "Web Application",
    description:
      "An intelligent job searching platform featuring dynamic filtering, skill-based recommendations, bookmarking, and personalized applicant dashboards.",
    tech: ["React", "Redux", "SCSS", "REST API"],
    demoLink: "https://github.com/Palakgontiya",
    githubLink: "https://github.com/Palakgontiya",
    icon: <FaSearch />,
  },
  {
    id: "auth-system",
    title: "Authentication & Role System",
    category: "Full Stack",
    description:
      "Production-grade MERN authentication system with JWT access/refresh tokens, role-based authorization, email verification, and secure password hashing.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    demoLink: "https://github.com/Palakgontiya",
    githubLink: "https://github.com/Palakgontiya",
    icon: <FaLock />,
  },
  {
    id: "movie-explorer",
    title: "Movie Explorer App",
    category: "Frontend Application",
    description:
      "A sleek movie discovery platform integrated with TMDB API featuring instant search, infinite scrolling, category filtering, and personal watchlist persistence.",
    tech: ["React", "TypeScript", "TMDB API", "SCSS"],
    demoLink: "https://github.com/Palakgontiya",
    githubLink: "https://github.com/Palakgontiya",
    icon: <FaFilm />,
  },
];

const Projects = () => {
  const featured = projects[0];
  const remainingProjects = projects.slice(1);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <span className="section-tag">FEATURED WORK</span>

        <h2 className="section-title">
          Selected projects that showcase
          <br />
          my engineering & design skills.
        </h2>

        <p className="section-description">
          Every project is built with emphasis on performance, clean codebase
          architecture, and refined user experience.
        </p>

        {/* Featured Project Card */}
        <div className="featured-project">
          <div className="featured-image">
            <div className="project-mockup">
              <div className="project-mockup__header">
                <span className="dot dot--red"></span>
                <span className="dot dot--yellow"></span>
                <span className="dot dot--green"></span>
                <span className="project-mockup__url">resumebuilder.app</span>
              </div>
              <div className="project-mockup__body">
                <div className="mock-sidebar"></div>
                <div className="mock-preview-area">
                  <div className="mock-line mock-line--header"></div>
                  <div className="mock-line mock-line--sub"></div>
                  <div className="mock-blocks">
                    <div className="mock-block"></div>
                    <div className="mock-block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="featured-content">
            <p className="project-category">{featured.category}</p>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>

            <div className="tech-stack">
              {featured.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="buttons">
              <a
                href={featured.demoLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt />
              </a>

              <a
                href={featured.githubLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline"
              >
                <span>GitHub</span>
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Remaining Projects Grid */}
        <div className="projects-grid">
          {remainingProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="card-image">
                <div className="card-image__icon">{project.icon}</div>
                <span className="card-image__badge">{project.category}</span>
              </div>

              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link"
                  >
                    <span>Demo</span>
                    <FaExternalLinkAlt />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link card-link--github"
                  >
                    <span>Code</span>
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;