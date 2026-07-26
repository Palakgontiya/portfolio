import { FaBriefcase, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import "./Experience.scss";

const highlights = [
  "Developed and maintained scalable React and Angular frontend applications.",
  "Engineered modular, reusable UI component libraries for core product features.",
  "Integrated REST APIs with state management (Redux Toolkit & BehaviorSubject).",
  "Contributed key modules to high-traffic platforms (Resume Builder & Interview Library).",
  "Optimized bundle size, lazy loading, and overall web app performance.",
  "Worked closely with UI/UX designers, backend engineers, and product stakeholders.",
];

const techStack = [
  "React.js",
  "Angular",
  "TypeScript",
  "SCSS",
  "Redux Toolkit",
  "REST APIs",
  "Git",
];

const timeline = [
  {
    year: "2024 - Present",
    role: "Frontend Engineer",
    company: "Unstop (Formerly Dare2Compete)",
    description: "Architecting user-facing web applications, optimizing search and recommendation flows, and refactoring legacy UI modules into modern component libraries.",
    current: true,
  },
  {
    year: "2023 - 2024",
    role: "React Developer Intern",
    company: "Inoffice Labs Pvt. Ltd.",
    description: "Built responsive dashboards, user management forms, and REST API integrations for client-facing SaaS platforms.",
    current: false,
  },
  {
    year: "2019 - 2023",
    role: "Associate CRM",
    company: "Refteck Solutions Pvt. Ltd.",
    description: "Managed client relationship tools, analyzed data workflows, and coordinated software requirement specs with development teams.",
    current: false,
  },
];

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <span className="section-tag">PROFESSIONAL JOURNEY</span>

        <h2 className="section-title">
          Building products that
          <br />
          create real impact.
        </h2>

        <p className="section-description">
          My career spans modern frontend engineering, scalable UI architecture,
          and building digital products used by thousands of active users.
        </p>

        {/* Primary Current Role Card */}
        <div className="experience-card">
          <div className="experience-left">
            <span className="company-tag">
              <span className="dot"></span> CURRENT ROLE
            </span>

            <h3>Unstop</h3>
            <h4>Frontend Engineer</h4>

            <p>
              Leading frontend development for core growth modules, designing accessible
              interfaces, optimizing web performance, and integrating complex APIs into
              reactive state architectures.
            </p>

            <div className="tech-stack">
              {techStack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="experience-right">
            <h4>Key Responsibilities & Achievements</h4>
            <ul>
              {highlights.map((item) => (
                <li key={item}>
                  <FaCheckCircle className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline Path */}
        <div className="career-path">
          <div className="career-path__header">
            <FaBriefcase className="career-path__icon" />
            <h3>Career Timeline</h3>
          </div>

          <div className="timeline">
            {timeline.map((item) => (
              <div className={`timeline-item ${item.current ? "is-current" : ""}`} key={item.company}>
                <div className="timeline-node"></div>
                <div className="timeline-date">
                  <FaCalendarAlt className="date-icon" />
                  <span>{item.year}</span>
                </div>
                <div className="timeline-content">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;