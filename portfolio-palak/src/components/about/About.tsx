import "./About.scss";
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaDocker,
  FaCheckCircle,
} from "react-icons/fa";

import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiFirebase,
  SiExpress,
  SiTailwindcss,
  SiPostman,
  SiVite,
  SiHtml5,
  SiSass,
  SiAuth0,
  SiGithubactions,
  SiKubernetes,
  SiRedux,
} from "react-icons/si";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-tag">ABOUT ME</div>

        <h2 className="about-title">
          Building products with passion,
          <br />
          precision and purpose.
        </h2>

        <p className="about-description">
          I enjoy creating modern web applications that combine beautiful, accessible
          interfaces with scalable frontend architecture. Over the last three years,
          I've specialized in React, Angular and TypeScript while building full-stack
          capabilities with Node.js, Express, and MongoDB.
        </p>

        <div className="about-grid">
          {/* Tech Arsenal Card */}
          <div className="glass-card about-card--arsenal">
            <h3>Tech Arsenal</h3>

            <div className="category">
              <span>Frontend</span>
              <div className="tech">
                <div><FaReact /> React</div>
                <div><FaAngular /> Angular</div>
                <div><SiTypescript /> TypeScript</div>
                <div><SiJavascript /> JavaScript</div>
                <div><SiRedux /> Redux</div>
                <div><SiHtml5 /> HTML5</div>
                <div><SiSass /> SCSS</div>
                <div><SiTailwindcss /> Tailwind</div>
              </div>
            </div>

            <div className="category">
              <span>Backend & Database</span>
              <div className="tech">
                <div><FaNodeJs /> Node.js</div>
                <div><SiExpress /> Express.js</div>
                <div><SiMongodb /> MongoDB</div>
                <div><SiFirebase /> Firebase</div>
              </div>
            </div>

            <div className="category">
              <span>Tools & Workflow</span>
              <div className="tech">
                <div><FaGitAlt /> Git</div>
                <div><FaGithub /> GitHub</div>
                <div><SiVite /> Vite</div>
                <div><SiPostman /> Postman</div>
              </div>
            </div>
          </div>

          {/* My Approach Card */}
          <div className="glass-card about-card--approach">
            <h3>My Engineering Approach</h3>
            <ul>
              <li><FaCheckCircle className="check-icon" /> Clean & Maintainable Code</li>
              <li><FaCheckCircle className="check-icon" /> Responsive & Fluid Interfaces</li>
              <li><FaCheckCircle className="check-icon" /> Component-Driven Architecture</li>
              <li><FaCheckCircle className="check-icon" /> RESTful API Integration</li>
              <li><FaCheckCircle className="check-icon" /> Performance & Asset Optimization</li>
              <li><FaCheckCircle className="check-icon" /> Web Accessibility Standards</li>
              <li><FaCheckCircle className="check-icon" /> Strategic Problem Solving</li>
              <li><FaCheckCircle className="check-icon" /> Continuous Skill Enhancement</li>
            </ul>
          </div>

          {/* Currently Learning Card - Spans full width */}
          <div className="glass-card learning-card">
            <h3>Currently Expanding Knowledge</h3>
            <div className="tech">
              <div><FaDocker /> Docker</div>
              <div><SiKubernetes /> System Design</div>
              <div><FaAws /> AWS Cloud</div>
              <div><SiGithubactions /> CI/CD Automation</div>
              <div><SiAuth0 /> Auth & Security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;