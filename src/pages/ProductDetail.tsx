import React, { useEffect } from 'react';
import { ShoppingCart, CheckCircle2, Utensils, ArrowLeft } from 'lucide-react';
import type { Product } from '../data/products';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';

import buffalo_sauce from '../assets/buffalo_sauce.png';
import chipotle_ranch from '../assets/chipotle_ranch.png';
import golden_dip from '../assets/golden_dip.png';
import classic_ranch from '../assets/classic_ranch.png';
import creamy_pepper_dip from '../assets/creamy_pepper_dip.png';

const imageMap: Record<string, string> = {
  'buffalo_sauce.png': buffalo_sauce,
  'chipotle_ranch.png': chipotle_ranch,
  'golden_dip.png': golden_dip,
  'classic_ranch.png': classic_ranch,
  'creamy_pepper_dip.png': creamy_pepper_dip,
};

const HEAT_CLASSES = ['l1', 'l2', 'l3', 'l4', 'l5'];

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.id]);

  return (
    <PageTransition>
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        <button onClick={onBack} className="back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#666', marginBottom: '2rem' }}>
          <ArrowLeft size={20} /> Back to Catalog
        </button>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', background: '#f8f8f8', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={imageMap[product.imageName] ?? buffalo_sauce}
              alt={product.name}
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }}
            />
          </div>

          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span className="sauce-tag" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>{product.type}</span>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>
              <p style={{ fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }}>"{product.tagline}"</p>
            </div>

            <div className="sauce-price-box" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              ₹{product.price} <span style={{ fontSize: '1rem', color: '#888', fontWeight: 'normal' }}>/ {product.size}</span>
            </div>

            <div className="diet-tags">
              {product.dietary.map((d) => (
                <span key={d} className="diet-tag" style={{ background: '#e0f7fa', color: '#006064', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem', marginRight: '8px' }}>
                  {d}
                </span>
              ))}
            </div>

            <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{product.description}</p>

            <div>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} /> Clean Ingredients
              </h3>
              <div className="ingredient-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="ingredient-chip" style={{ background: '#f0f0f0', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>{ing}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Utensils size={18} /> Best Paired With
              </h3>
              <div className="pairing-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.pairings.map((p, i) => (
                  <span key={i} className="pairing-chip" style={{ border: '1px solid #ddd', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>{p}</span>
                ))}
              </div>
            </div>

            <div className="heat-row" style={{ marginTop: '1rem' }}>
              <span className="heat-label" style={{ fontWeight: 'bold' }}>Heat Level: {product.heatLevel}/5</span>
              <div className="heat-dots" style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {HEAT_CLASSES.map((cls, i) => (
                  <div
                    key={i}
                    className={`heat-dot ${cls} ${i < product.heatLevel ? 'active' : ''}`}
                    style={{ width: '12px', height: '12px', borderRadius: '50%', background: i < product.heatLevel ? '#ff5722' : '#eee' }}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="add-btn"
              style={{ marginTop: '2rem', padding: '1rem', fontSize: '1.2rem', background: '#e63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart size={20} /> Add to Cart — ₹{product.price}
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
