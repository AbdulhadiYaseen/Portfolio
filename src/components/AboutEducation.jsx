import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookOpen, FaSchool } from 'react-icons/fa';
import './AboutEducation.css';

const AboutEducation = () => {
  const education = [
    {
      institution: "National University of Computer and Emerging Sciences (FAST-NUCES)",
      degree: "Bachelors in Computer Science",
      date: "2022 – 2026",
      coursework: "Object-Oriented Programming, Data Structures, Database Systems, Software Design and Analysis, Artificial Intelligence, Software Engineering and Testing, Fundamentals of Software Project Management, DevOps, AgenticAI"
    },
    {
      institution: "Private Candidate",
      degree: "O and A Levels",
      date: "Completed",
      coursework: "Completed Cambridge O and A levels with a strong foundation in core sciences and mathematics, preparing me for advanced studies in Computer Science."
    },
    {
      institution: "Pakistan International School, Buraydah, K.S.A",
      degree: "Primary & Middle School Education",
      date: "2009 – 2019",
      coursework: "Built early academic foundations in an international schooling environment in Saudi Arabia."
    }
  ];

  const getIcon = (institution) => {
    if (institution.includes("FAST-NUCES")) return <FaGraduationCap />;
    if (institution.includes("Private Candidate")) return <FaBookOpen />;
    return <FaSchool />;
  };

  return (
    <section id="education" className="education-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
      >
        ACADEMIC_JOURNEY
      </motion.h2>
      <div className="edu-timeline">
        {education.map((edu, index) => {
          const isUniversity = edu.institution.includes("FAST-NUCES");
          const courses = isUniversity 
            ? edu.coursework.split(',').map(course => course.trim()) 
            : null;

          return (
            <motion.div 
              key={index} 
              className={`edu-timeline-item ${isUniversity ? 'featured-item' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <motion.div 
                className={`edu-timeline-dot ${isUniversity ? 'featured-dot' : ''}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ type: "spring", stiffness: 300, delay: (index * 0.08) + 0.15 }}
              ></motion.div>
              <div className={`edu-timeline-content glass-card ${isUniversity ? 'featured-card' : ''}`}>
                <div className="edu-header">
                  <div className="edu-title-wrapper">
                    <span className="edu-icon-badge">{getIcon(edu.institution)}</span>
                    <div className="edu-title-text">
                      <div className="edu-meta-label">edu_0{index + 1} //</div>
                      <h3>{edu.institution}</h3>
                      <h4 className="edu-degree">{edu.degree}</h4>
                    </div>
                  </div>
                  <span className="edu-date">{edu.date}</span>
                </div>
                
                {isUniversity ? (
                  <div className="coursework-section">
                    <h5 className="coursework-title">// key_coursework_focus_areas</h5>
                    <div className="coursework-tags">
                      {courses.map((course, idx) => (
                        <motion.span 
                          key={idx} 
                          className="course-tag"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="edu-coursework-desc">{edu.coursework}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutEducation;
