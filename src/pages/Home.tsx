import React from 'react';
import { ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import type { Product } from '../data/products';
import buffalo_sauce from '../assets/buffalo_sauce.png';

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

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => (
  <div className="page-wrapper">

    {/* ── HERO ── */}
    <section className="hero">
      <div className="container hero-grid">

        {/* Left: Copy — one idea per line, nothing extra */}
        <div className="hero-content">
          <span className="eyebrow-badge">
            <span className="eyebrow-dot" />
            Indie D2C · India
          </span>

          <h1 className="hero-headline">
            Western Sauces.<br />
            <em>Indian</em> Soul.<br />
            <strong>Cleaner</strong> Labels.
          </h1>

          <p className="hero-subtext">
            Premium, eggless condiments crafted for the Indian palate.
            Restaurant-quality flavor — without the nasties.
          </p>



          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setCurrentPage('catalog')}>
              Shop Sauces
              <ArrowRight size={17} />
            </button>
            <button className="btn-secondary" onClick={() => setCurrentPage('about')}>
              Our Story
            </button>
          </div>
        </div>

        {/* Right: Bottle — image speaks for itself, one badge only */}
        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src={buffalo_sauce}
              alt="Zesty Co. Fiery Buffalo Sauce"
              className="hero-img"
            />
          </div>
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
);
