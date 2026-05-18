import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutEducation from './components/AboutEducation';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';

function App() {
  const { scrollY } = useScroll();
  // glow-1 moves down 400px over 3000px scroll (slower than page)
  const y1 = useTransform(scrollY, [0, 3000], [0, 400]); 
  // glow-2 moves up 300px over 3000px scroll (faster/parallax)
  const y2 = useTransform(scrollY, [0, 3000], [0, -300]); 

  return (
    <SmoothScroll>
      <motion.div className="ambient-glow glow-1" style={{ y: y1 }}></motion.div>
      <motion.div className="ambient-glow glow-2" style={{ y: y2 }}></motion.div>
      <BackgroundAnimation />
      <Navbar />
      <main>
        <Hero />
        <AboutEducation />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
