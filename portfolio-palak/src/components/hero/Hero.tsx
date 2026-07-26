import { FaArrowDown, FaFileDownload, FaCode } from "react-icons/fa";
import "./Hero.scss";

const Hero = () => {
  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section className="hero" id="home">
      <div className="container hero__container">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__pulse"></span>
            <span>Available for Opportunities</span>
          </div>

          <p className="hero__subtitle">FRONTEND ENGINEER</p>

          <h1 className="hero__title">
            Crafting
            <br />
            Digital Experiences
            <br />
            <span className="hero__title-highlight">That Matter.</span>
          </h1>

          <p className="hero__description">
            Passionate about building elegant, scalable and user-focused web
            applications with modern technologies. Specialized in React, Angular,
            TypeScript and full-stack integration.
          </p>

          <div className="hero__buttons">
            <button className="hero__primary" onClick={handleScrollToProjects}>
              <span>View Projects</span>
              <FaArrowDown className="hero__btn-icon" />
            </button>

            <button className="hero__secondary" onClick={handleDownloadResume}>
              <FaFileDownload className="hero__btn-icon" />
              <span>Resume</span>
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat-item">
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>

            <div className="hero__stat-item">
              <h3>15+</h3>
              <p>Projects Built</p>
            </div>

            <div className="hero__stat-item">
              <h3>100%</h3>
              <p>Commitment</p>
            </div>
          </div>
        </div>

        {/* RIGHT - CODE CARD */}
        <div className="hero__right">
          <div className="code-card">
            <div className="code-card__header">
              <div className="code-card__dots">
                <span className="dot dot--red"></span>
                <span className="dot dot--yellow"></span>
                <span className="dot dot--green"></span>
              </div>
              <div className="code-card__title">
                <FaCode className="code-card__icon" />
                <span>developer.ts</span>
              </div>
            </div>

            <pre className="code-card__body">
              <code>
                <span className="kw">const</span> <span className="var">developer</span> = <span className="punct">&#123;</span>{"\n"}
                {"  "}<span className="prop">name</span><span className="punct">:</span> <span className="str">"Palak Gontiya"</span><span className="punct">,</span>{"\n"}
                {"  "}<span className="prop">role</span><span className="punct">:</span> <span className="str">"Frontend Developer"</span><span className="punct">,</span>{"\n"}
                {"  "}<span className="prop">skills</span><span className="punct">: [</span>{"\n"}
                {"    "}<span className="str">"React"</span><span className="punct">,</span> <span className="str">"TypeScript"</span><span className="punct">,</span>{"\n"}
                {"    "}<span className="str">"Angular"</span><span className="punct">,</span> <span className="str">"Node.js"</span><span className="punct">,</span>{"\n"}
                {"    "}<span className="str">"SCSS"</span><span className="punct">,</span> <span className="str">"REST APIs"</span>{"\n"}
                {"  "}<span className="punct">],</span>{"\n"}
                {"  "}<span className="prop">focus</span><span className="punct">:</span> <span className="str">"Scalable UX & UI"</span>{"\n"}
                <span className="punct">&#125;;</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
