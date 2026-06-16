import React from 'react';
import type { Product } from '../data/products';
import buffalo_sauce from '../assets/buffalo_sauce.png';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';

interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddToCart: (product: Product) => void;
  setCurrentPage: (page: 'home' | 'catalog' | 'about') => void;
}

// Marquee strip — concise brand pillars only
const TICKER_ITEMS = [
  'No Artificial Preservatives',
  '100% Eggless',
  'FSSAI Certified',
  'No MSG',
  'No Artificial Colors',
  'Clean Label',
  'Small-Batch Craft',
  'Vegetarian Always',
] as const;

export const Home: React.FC<HomeProps> = () => (
  <PageTransition>
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container hero-grid">

          {/* Left: Copy — one idea per line, nothing extra */}
          <div className="hero-content">
            <motion.span 
              className="eyebrow-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="eyebrow-dot" />
              Indie D2C · India
            </motion.span>

            <motion.h1 
              className="hero-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Western Sauces.<br />
              <em>Indian</em> Soul.<br />
              <strong>Cleaner</strong> Labels.
            </motion.h1>

            <motion.p 
              className="hero-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Premium, eggless condiments crafted for the Indian palate.
              Restaurant-quality flavor — without the nasties.
            </motion.p>
          </div>

          {/* Right: Bottle — image speaks for itself, one badge only */}
          <div className="hero-visual">
            <motion.div 
              className="hero-image-frame"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <img
                src={buffalo_sauce}
                alt="Zesty Co. Fiery Buffalo Sauce"
                className="hero-img"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── MARQUEE ── Low-key brand pulse, nothing to read deeply */}
      <div className="ticker-strip">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot" />
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  </PageTransition>
);
