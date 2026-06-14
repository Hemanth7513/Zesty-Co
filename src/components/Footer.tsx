import React from 'react';

interface FooterProps {
  setCurrentPage: (page: 'home' | 'catalog' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const nav = (page: 'home' | 'catalog' | 'about', label: string) => (
    <li key={page}>
      <a href={`#${page}`} onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}>
        {label}
      </a>
    </li>
  );

  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            Zesty <em>Co.</em>
          </div>
          <p className="footer-desc">
            Crafting premium, clean-label, eggless Western-inspired condiments for the Indian palate. No MSG, no artificial colors, no preservatives. Pure, restaurant-quality flavor.
          </p>
          <span className="footer-fssai">
            Vegetarian &nbsp;·&nbsp; FSSAI Lic. 12425999000123
          </span>
        </div>

        {/* Explore */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            {nav('home', 'Home')}
            {nav('catalog', 'Our Sauces')}
            {nav('about', 'Our Story')}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-links">
            <li>hello@zestyco.in</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>

      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Zesty Co. All rights reserved.</p>
        <p>Proudly Indian</p>
      </div>
    </footer>
  );
};
