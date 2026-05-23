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

const role = "Software Engineer";

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
        <motion.h3 variants={itemVariants} className="hero-greeting">Hi, I'm</motion.h3>
        <motion.h1 variants={itemVariants} className="hero-name">Abdulhadi Yaseen</motion.h1>
        <motion.h2 variants={itemVariants} className="hero-title">
          <span className="typewriter-text">{currentText}</span>
          <span className="typewriter-cursor">|</span>
        </motion.h2>
        <motion.p variants={itemVariants} className="hero-summary">
          Computer Science graduate with hands-on experience in full-stack development and AI-integrated applications. Seeking
          a Software Development role where I can utilize my technical skills, solve real-world problems, and continuously learn
          and grow within a collaborative environment.
        </motion.p>
        <motion.div variants={itemVariants} className="hero-buttons">
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/AbdulHadi_Yaseen.pdf"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
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
