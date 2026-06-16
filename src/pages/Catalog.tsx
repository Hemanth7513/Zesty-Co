import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '../data/products';
import { products } from '../data/products';
import { SauceCard } from '../components/SauceCard';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

type Filter = 'All' | 'Hot Sauce' | 'Dips & Dressings';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const [query, setQuery]       = useState('');
  const [filter, setFilter]     = useState<Filter>('All');

  const visible = useMemo(() => {
    return products.filter((p) => {
      const matchFilter = filter === 'All' || p.type === filter;
      const matchQuery  =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [query, filter]);

  return (
    <PageTransition>
      <div className="page-wrapper" style={{ paddingTop: '76px', minHeight: '100vh' }}>
        <section className="section">
          <div className="container">

            {/* Page heading */}
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <span className="section-label">D2C Store</span>
              <h1 className="section-title">Our Small-Batch Sauces</h1>
              <p className="section-body">
                Five launch sauces. All clean-label, eggless, and made for the Indian palate. Order directly through WhatsApp — flat delivery rate across India.
              </p>
            </div>

            {/* Filters */}
            <div className="catalog-header-row">
              <div className="filter-chip-row">
                {(['All', 'Hot Sauce', 'Dips & Dressings'] as Filter[]).map((f) => (
                  <button
                    key={f}
                    className={`filter-chip ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'All' ? 'All Sauces' : f}
                  </button>
                ))}
              </div>

              <div className="search-wrapper">
                <Search className="search-icon" size={16} />
                <input
                  type="text"
                  className="search-field"
                  placeholder="Search by flavor or type…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Grid */}
            {visible.length === 0 ? (
              <div className="empty-state">
                <h3>No sauces found</h3>
                <p>Try a different filter or clear your search.</p>
              </div>
            ) : (
              <motion.div 
                className="sauces-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={filter + query} // re-animate on filter change
              >
                {visible.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <SauceCard product={product} onAddToCart={onAddToCart} />
                  </motion.div>
                ))}
              </motion.div>
            )}

          </div>
        </section>
      </div>
    </PageTransition>
  );
};
