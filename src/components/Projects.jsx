import React from 'react';
import { motion } from 'framer-motion';
import enerlyticsImg from '../assets/Enerlytics.png';
import tacticalTalkImg from '../assets/TacticalTalk.png';
import airTravelImg from '../assets/AiR Travel.png';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Enerlytics — FYP",
      tech: ["Next.js", "Node.js", "Machine Learning"],
      description: "AI-powered electricity forecasting platform optimizing Karachi household billing. Built real-time weather-integrated analytics and slab-aware billing.",
      image: enerlyticsImg,
      link: "#"
    },
    {
      title: "Tactical Talk",
      tech: ["Next.js", "Node.js", "MongoDB", "OpenAI"],
      description: "Full-stack web app delivering tactical football insights via an AI chatbot. Integrated real-time data scraping and statistics library.",
      image: tacticalTalkImg,
      link: "#"
    },
    {
      title: "AiR Travel",
      tech: ["Angular", "Node.js", "MySQL"],
      description: "Comprehensive Flight Management System streamlining flight scheduling, baggage tracking, check-ins, and live status monitoring.",
      image: airTravelImg,
      link: "#"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            {/* Full-bleed background image container */}
            <div className="project-bg-container">
              <img src={project.image} alt={project.title} className="project-bg-image" />
              <div className="project-idle-overlay"></div>
            </div>

            {/* Static Content (Always visible initially at the bottom) */}
            <div className="project-static-content">
              <h3 className="project-idle-title">{project.title}</h3>
            </div>

            {/* Hover Glassmorphism Slide-In details */}
            <div className="project-hover-overlay">
              <div className="project-hover-content">
                <div className="project-tech-badges">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="project-tech-tag">{tech}</span>
                  ))}
                </div>
                
                <h3 className="project-hover-title">{project.title}</h3>
                <p className="project-hover-desc">{project.description}</p>
                
                <a href={project.link} className="project-cta-link">
                  View Project <span className="arrow">➔</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
