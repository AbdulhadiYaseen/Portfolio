import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Enerlytics – AI-Driven Smart Electricity Management",
      tech: ["Next.js", "Node.js", "Machine Learning (Bi-LSTM, TFT, XGBoost)"],
      description: "Developed an AI-powered smart electricity forecasting platform predicting electricity consumption and optimizing billing for Karachi households. Built real-time forecasting and analytics with web scraping, weather-integrated insights, and slab-aware billing."
    },
    {
      title: "Tactical Talk – AI-Powered Football Tactics",
      tech: ["Next.js", "Node.js", "MongoDB", "OpenAI"],
      description: "Developed a full-stack web app delivering tactical football insights via an AI chatbot powered by OpenAI. Integrated real-time football data (matches, lineups, stats) using web scraping and built a tactics library."
    },
    {
      title: "AiR Travel",
      tech: ["Node.js", "Express.js", "MySQL", "Angular"],
      description: "Designed a comprehensive Flight Management System streamlining flight scheduling, passenger check-ins, baggage tracking, and real-time flight status monitoring. Included AngularGuard for route protection."
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
            className="project-card glass-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 40px rgba(37, 99, 235, 0.2)",
              borderColor: "rgba(37, 99, 235, 0.4)"
            }}
          >
            <h3 className="project-title">{project.title}</h3>
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <p className="project-desc">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
