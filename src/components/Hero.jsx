import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const role = "software_engineer()";

const Hero = () => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (currentText.length < role.length) {
      const timer = setTimeout(() => {
        setCurrentText(role.substring(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentText]);

  return (
    <section id="hero" className="hero-container">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">bash - abdulhadi_yaseen.sh</span>
          </div>
          <div className="terminal-body">
            <motion.h3 variants={itemVariants} className="hero-greeting">// greetings</motion.h3>
            <motion.h1 variants={itemVariants} className="hero-name">
              <span className="keyword">const</span> <span className="var-name">name</span> = <span className="string">"Abdulhadi Yaseen"</span>;
            </motion.h1>
            <motion.h2 variants={itemVariants} className="hero-title">
              role: <span className="typewriter-text">{currentText}</span>
              <span className="typewriter-cursor terminal-cursor">_</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="hero-summary-block">
              <span className="code-tag">&lt;p&gt;</span>
              <p className="hero-summary-text">
                Computer Science graduate with hands-on experience in full-stack
                development and AI-integrated applications. Seeking a Software
                Development role to solve real-world problems and continuously
                learn and grow in a collaborative environment.
              </p>
              <span className="code-tag">&lt;/p&gt;</span>
            </motion.div>
            <motion.div variants={itemVariants} className="hero-buttons">
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                view_projects()
              </motion.a>
              <motion.a
                href="/AbdulHadi_Yaseen.pdf"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                download_resume()
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-image-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <div className="hero-avatar-glow"></div>
        <Hero3D />
      </motion.div>
    </section>
  );
};

export default Hero;
