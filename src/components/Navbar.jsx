import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: './home', href: '#hero' },
    { name: './education', href: '#education' },
    { name: './experience', href: '#experience' },
    { name: './projects', href: '#projects' },
    { name: './skills', href: '#skills' },
    { name: 'hire_me()', href: '#contact', isCta: true }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo">
          AY<span className="terminal-cursor">_</span>
        </a>
        <ul className="nav-menu">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a href={link.href} className={`nav-link ${link.isCta ? 'nav-cta' : ''}`}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
