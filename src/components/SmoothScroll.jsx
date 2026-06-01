import React from 'react';

const SmoothScroll = ({ children }) => {
  // Let the browser handle scrolling natively for 100% lightweight and responsive behavior.
  // Native smooth scrolling is already enabled via CSS `scroll-behavior: smooth` in index.css!
  return <>{children}</>;
};

export default SmoothScroll;
