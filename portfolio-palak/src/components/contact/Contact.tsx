import "./Contact.scss";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const contactData = [
  {
    icon: <FaEnvelope />,
    title: "Email",
    value: "palakgontiya1998@gmail.com",
    link: "mailto:palakgontiya1998@gmail.com",
  },
  {
    icon: <FaGithub />,
    title: "GitHub",
    value: "github.com/Palakgontiya",
    link: "https://github.com/Palakgontiya",
  },
  {
    icon: <FaLinkedin />,
    title: "LinkedIn",
    value: "linkedin.com/in/palak-gontiya/",
    link: "https://www.linkedin.com/in/palak-gontiya/",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Delhi, India",
    link: "https://maps.google.com/?q=Delhi,India",
  },
];

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <span className="section-tag">GET IN TOUCH</span>

        <h2>
          Let's build something
          <br />
          meaningful together.
        </h2>

        <p>
          I'm always open to discussing new opportunities, collaborating on
          exciting products, or simply connecting with fellow developers.
        </p>

        <a href="mailto:palakgontiya1998@gmail.com" className="contact-btn">
          Let's Talk
        </a>

        <div className="contact-grid">
          {contactData.map((item) => (
            <a
              href={item.link}
              className="contact-card"
              key={item.title}
              target="_blank"
              rel="noreferrer"
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
