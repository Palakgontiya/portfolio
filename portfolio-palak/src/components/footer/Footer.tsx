import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="logo" onClick={scrollToTop}>
            <span>P</span>
            <span>G</span>
          </div>

          <h2>
            Thanks for taking the time
            <br />
            to explore my work.
          </h2>

          <p>
            Let's build modern, accessible digital experiences together.
            Whether you have a project idea, a job opportunity, or just want to connect,
            feel free to reach out!
          </p>

          <div className="socials">
            <a
              href="https://github.com/Palakgontiya"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/palak-gontiya/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:palakgontiya1998@gmail.com"
              aria-label="Send Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Palak Gontiya. Designed & Developed with React & SCSS.
          </p>

          <button className="back-to-top" onClick={scrollToTop}>
            <FaArrowUp />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;