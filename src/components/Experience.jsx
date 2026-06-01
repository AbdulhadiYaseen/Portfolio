import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: "Internee Full-Stack Web Developer",
      company: "10-PEARLS",
      date: "March 2025 – May 2025",
      points: [
        "Developed and maintained a full-stack web application using React.js, Node.js, and MySQL.",
        "Implemented robust APIs, integrated logging with Pino, wrote unit tests using Mocha/Chai and Jest, and ensured code quality with SonarQube."
      ]
    },
    {
      title: "Internee Web Developer",
      company: "Zehenify",
      date: "Oct 2024 – Nov 2024",
      points: [
        "Gained hands-on experience in developing and optimizing a web application for E-psychiatric consultation using Next.js.",
        "Collaborated with the team to implement dynamic features, ensuring responsive and efficient user interfaces."
      ]
    },
    {
      title: "Data Structures Student Lab Assistant",
      company: "FAST-NUCES",
      date: "Additional Experience",
      points: [
        "Assisted students with understanding and implementing core Data Structures in C/C++.",
        "Evaluated lab tasks and provided constructive feedback to help students improve problem-solving skills."
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
      >
        Experience
      </motion.h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <motion.div 
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ type: "spring", stiffness: 300, delay: (index * 0.08) + 0.15 }}
            ></motion.div>
            <div className="timeline-content glass-card">
              <div className="exp-header">
                <h3>{exp.title} <span className="company-name">@ {exp.company}</span></h3>
                <span className="exp-date">{exp.date}</span>
              </div>
              <ul className="exp-points">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
