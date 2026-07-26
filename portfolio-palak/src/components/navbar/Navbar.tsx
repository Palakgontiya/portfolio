import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaFileDownload } from "react-icons/fa";
import "./Navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const handleResume = () => {
    // Open resume or scroll to contact
    window.open("/resume.pdf", "_blank");
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="#home" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-glass">
            <span className="navbar__logo-symbol">&lt;</span>
            <span className="navbar__logo-name">Palak</span>
            <span className="navbar__logo-symbol">/&gt;</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="navbar__menu">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div className="navbar__actions">
          <button className="navbar__resume" onClick={handleResume}>
            <FaFileDownload className="navbar__resume-icon" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Drawer Navigation */}
        <div className={`navbar__mobile-drawer ${isOpen ? "is-open" : ""}`}>
          <ul className="navbar__mobile-menu">
            <li>
              <a href="#about" onClick={closeMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#projects" onClick={closeMenu}>
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={closeMenu}>
                Experience
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>

          <button className="navbar__mobile-resume" onClick={() => { closeMenu(); handleResume(); }}>
            <FaFileDownload />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;