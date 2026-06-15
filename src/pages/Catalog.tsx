import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { Product } from '../data/products';
import { products } from '../data/products';
import { SauceCard } from '../components/SauceCard';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

type Filter = 'All' | 'Hot Sauce' | 'Dips & Dressings';

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart, onSelectProduct }) => {
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
            <div className="sauces-grid">
              {visible.map((product) => (
                <SauceCard key={product.id} product={product} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
