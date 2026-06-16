import React from 'react';
import type { Product } from '../data/products';
import buffalo_sauce from '../assets/buffalo_sauce.png';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';

interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddToCart: (product: Product) => void;
  setCurrentPage: (page: 'home' | 'catalog' | 'about') => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectProduct: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <PageTransition>
      <div className="page-wrapper">
        
        {/* ── PREMIUM HERO ── */}
        <section className="hero-premium">
          <div className="container hero-premium-grid">
            
            <div className="hero-premium-content">
              <motion.span 
                className="eyebrow-premium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                CRAFTED IN INDIA
              </motion.span>

              <motion.h1 
                className="hero-headline-premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                The New Standard <br />
                <span className="serif-italic">of Flavor</span>
              </motion.h1>

              <motion.p 
                className="hero-subtext-premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Small-batch, 100% vegetarian condiments designed to elevate your everyday meals. Restaurant quality without the artificial nasties.
              </motion.p>

              <motion.button 
                className="shop-now-btn"
                onClick={() => setCurrentPage('catalog')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SHOP THE COLLECTION
              </motion.button>
            </div>

            <div className="hero-premium-visual">
              <motion.div 
                className="hero-bottle-frame"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src={buffalo_sauce}
                  alt="Zesty Co. Signature Sauce"
                  className="hero-premium-img"
                />
              </motion.div>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};
