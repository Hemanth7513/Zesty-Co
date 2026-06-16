import React, { useEffect } from 'react';
import { ShoppingCart, CheckCircle2, Utensils, ArrowLeft } from 'lucide-react';
import type { Product } from '../data/products';
import { products } from '../data/products';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

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
  onAddToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!product) {
    return (
      <PageTransition>
        <div className="page-wrapper" style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Product Not Found</h2>
          <button className="premium-back-btn" onClick={() => navigate('/catalog')} style={{ marginTop: '2rem' }}>
            <ArrowLeft size={18} /> Back to Collection
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="page-wrapper" style={{ paddingTop: '76px' }}>
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button type="button" onClick={() => navigate('/catalog')} className="premium-back-btn" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>
                <ArrowLeft size={18} /> Back to Collection
              </button>
            <div style={{ background: '#f8f8f8', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
              <img
                src={imageMap[product.imageName] ?? buffalo_sauce}
                alt={product.name}
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }}
              />
            </div>
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
                <span key={d} className="premium-diet-tag">
                  {d}
                </span>
              ))}
            </div>

            <p className="premium-product-desc">{product.description}</p>

            <div className="premium-detail-section">
              <h3 className="premium-section-title">
                <CheckCircle2 size={18} className="brand-icon" /> Clean Ingredients
              </h3>
              <div className="ingredient-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="premium-ingredient-chip">{ing}</span>
                ))}
              </div>
            </div>

            <div className="premium-detail-section">
              <h3 className="premium-section-title">
                <Utensils size={18} className="brand-icon" /> Best Paired With
              </h3>
              <div className="pairing-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.pairings.map((p, i) => (
                  <span key={i} className="premium-pairing-chip">{p}</span>
                ))}
              </div>
            </div>

            <div className="premium-detail-section heat-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="premium-section-title" style={{ marginBottom: 0 }}>Heat Level: {product.heatLevel}/5</span>
                <div className="heat-dots" style={{ display: 'flex', gap: '6px' }}>
                  {HEAT_CLASSES.map((cls, i) => (
                    <div
                      key={i}
                      className={`heat-dot ${cls} ${i < product.heatLevel ? 'active' : ''}`}
                      style={{ 
                        width: '14px', 
                        height: '14px', 
                        borderRadius: '50%', 
                        background: i < product.heatLevel ? 'var(--brand)' : 'var(--surface-2)',
                        transition: 'background var(--t-fast)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="premium-detail-add-btn"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart size={20} /> Add to Cart — ₹{product.price}
            </motion.button>
          </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
