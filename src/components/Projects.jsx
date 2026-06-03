import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import enerlyticsImg from '../assets/Enerlytics.png';
import tacticalTalkImg from '../assets/TacticalTalk.png';
import airTravelImg from '../assets/AiR Travel.png';
import autojobImg from '../assets/autojob-logo.png';
import phoneDirectoryImg from '../assets/phone directory logo.png';
import keScraperImg from '../assets/KE-scrapper.png';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Maps mouse position inside the card [0, 1] to tilt rotation degrees [-10, 10]
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  // Maps mouse coordinates to a gorgeous dynamic radial glowing sheen
  const glossBg = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(circle at ${latestX * 100}% ${latestY * 100}%, rgba(56, 189, 248, 0.15) 0%, rgba(255, 255, 255, 0) 65%)`
  );

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const ctaText = project.link === '#' || !project.link
    ? 'in_development()'
    : project.link.includes('github')
      ? 'git_clone()'
      : 'run_project()';

  return (
    <motion.div
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <motion.div
        className="project-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic gloss overlay */}
        <motion.div
          className="project-card-gloss"
          style={{ background: glossBg }}
        />

        {/* Full-bleed background image container */}
        <div className="project-bg-container" style={{ transform: 'translateZ(10px)' }}>
          <img src={project.image} alt={project.title} className="project-bg-image" />
          <div className="project-idle-overlay"></div>
        </div>

        {/* Static Content (Always visible initially at the bottom) */}
        <div className="project-static-content" style={{ transform: 'translateZ(20px)' }}>
          <div className="project-meta-label">project_0{index + 1} //</div>
          <h3 className="project-idle-title">{project.title}</h3>
        </div>

        {/* Hover Glassmorphism Slide-In details */}
        <div className="project-hover-overlay" style={{ transform: 'translateZ(30px)' }}>
          <div className="project-hover-content">
            <div className="project-tech-badges">
              {project.tech.map((tech, i) => (
                <span key={i} className="project-tech-tag">[{tech}]</span>
              ))}
            </div>

            <div className="project-meta-label">project_0{index + 1} //</div>
            <h3 className="project-hover-title">{project.title}</h3>
            <p className="project-hover-desc">{project.description}</p>

            {project.link !== '#' ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-cta-link">
                {ctaText} <span className="arrow">➔</span>
              </a>
            ) : (
              <span className="project-cta-link disabled">
                {ctaText}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
      link: "https://tacticaltalk.vercel.app"
    },
    {
      title: "AutoJob — AI Agent",
      tech: ["Node.js", "Puppeteer", "Gemini API", "MongoDB"],
      description: "An intelligent job discovery and automated recruiter outreach agent. Automates LinkedIn crawling using Puppeteer, leverages Gemini AI to extract recruiter contacts and draft personalized cover letters, and persists applications with robust anti-duplicate guards.",
      image: autojobImg,
      link: "https://github.com/AbdulhadiYaseen/AutoJob-Ai.git"
    },
    {
      title: "KE Web Scraper & Extractor",
      tech: ["Node.js", "Puppeteer", "PDF Parsing", "CSV"],
      description: "A Node.js automation tool that retrieves duplicate electricity bills from the K-Electric portal using Puppeteer, downloads them as PDFs, and extracts key billing data into a structured CSV format.",
      image: keScraperImg,
      link: "https://github.com/AbdulhadiYaseen/KE-Bill-scrapper-and-Extractor.git"
    },
    {
      title: "AiR Travel",
      tech: ["Angular", "Node.js", "MySQL"],
      description: "Comprehensive Flight Management System streamlining flight scheduling, baggage tracking, check-ins, and live status monitoring.",
      image: airTravelImg,
      link: "#"
    },
    {
      title: "Advanced Phone Directory",
      tech: ["C++", "Data Structures", "File Handling", "CLI"],
      description: "A secure console-based contact management system featuring alphanumeric hashed bucket indexing, stack-based contact recovery (recently deleted), custom sorting, and encrypted-like login safeguards.",
      image: phoneDirectoryImg,
      link: "https://github.com/AbdulhadiYaseen/Advanced-Phone-Directory.git"
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
      >
        MY_PROJECTS
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
