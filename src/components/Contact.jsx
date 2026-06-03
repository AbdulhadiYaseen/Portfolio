import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        GET_IN_TOUCH
      </motion.h2>
      <motion.p
        className="contact-desc"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        // I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </motion.p>

      <div className="contact-layout">
        <motion.div
          className="connect-card glass-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>let_connect()</h3>

          <div className="contact-item">
            <motion.div className="contact-icon" whileHover={{ scale: 1.1, rotate: 5 }}>
              <FaEnvelope />
            </motion.div>
            <div className="contact-info">

              <a href="mailto:abdulhadiyaseen2004@gmail.com" className="contact-value">abdulhadiyaseen2004@gmail.com</a>
            </div>
          </div>

          <div className="contact-item">
            <motion.div className="contact-icon" whileHover={{ scale: 1.1, rotate: 5 }}>
              <FaLinkedin />
            </motion.div>
            <div className="contact-info">

              <a href="https://linkedin.com/in/abdulhadi-yaseen" target="_blank" rel="noreferrer" className="contact-value">abdulhadi-yaseen</a>
            </div>
          </div>

          <div className="contact-item">
            <motion.div className="contact-icon" whileHover={{ scale: 1.1, rotate: 5 }}>
              <FaGithub />
            </motion.div>
            <div className="contact-info">

              <a href="https://github.com/AbdulhadiYaseen" target="_blank" rel="noreferrer" className="contact-value">AbdulhadiYaseen</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="form-card glass-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <form action="https://formsubmit.co/abdulhadiyaseen2004@gmail.com" method="POST" className="contact-form">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New message from your portfolio!" />

            <div className="form-row">
              <div className="form-group">
                <label> name </label>
                <input type="text" name="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label> email </label>
                <input type="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label> message </label>
              <textarea name="message" rows="5" placeholder="How can I help you?" required></textarea>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="btn-icon" /> send_message()
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>// Built by Abdulhadi Yaseen</p>
      </motion.footer>
    </section>
  );
};

export default Contact;
