import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiAngular, 
  SiJavascript,
  SiPandas,
  SiScikitlearn,
  SiTailwindcss,
  SiGit,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiPython
} from 'react-icons/si';
import { FaBrain, FaSpider } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const row1Skills = [
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS3", icon: <SiCss3 /> },
    { name: "React.js", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Angular", icon: <SiAngular /> },
    { name: "JavaScript", icon: <SiJavascript /> }
  ];

  const row2Skills = [
    { name: "Pandas", icon: <SiPandas /> },
    { name: "Scikit-learn", icon: <SiScikitlearn /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    { name: "Git", icon: <SiGit /> },
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Machine Learning", icon: <FaBrain /> },
    { name: "Web Scraping", icon: <FaSpider /> },
    { name: "Python", icon: <SiPython /> }
  ];

  // Double the arrays to ensure a seamless infinite scroll loop
  const duplicatedRow1 = [...row1Skills, ...row1Skills];
  const duplicatedRow2 = [...row2Skills, ...row2Skills];

  return (
    <section id="skills" className="skills-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Tech Stack
      </motion.h2>
      
      <motion.p 
        className="skills-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Technologies and tools I leverage to build highly scalable applications and intelligent AI models.
      </motion.p>

      <div className="skills-marquee-container">
        {/* Row 1: Scrolling Left */}
        <div className="marquee-track">
          <div className="marquee-row scroll-left">
            {duplicatedRow1.map((skill, index) => (
              <div key={`row1-${index}`} className="skill-card glass-card">
                <div className="skill-card-icon">{skill.icon}</div>
                <span className="skill-card-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="marquee-track">
          <div className="marquee-row scroll-right">
            {duplicatedRow2.map((skill, index) => (
              <div key={`row2-${index}`} className="skill-card glass-card">
                <div className="skill-card-icon">{skill.icon}</div>
                <span className="skill-card-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
