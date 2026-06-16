import React, { useState } from 'react';
import { ShoppingCart, Heart, Utensils, CheckCircle2 } from 'lucide-react';
import type { Product } from '../data/products';
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

interface SauceCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

type TabType = 'about' | 'ingredients' | 'pairings';

const HEAT_CLASSES = ['l1', 'l2', 'l3', 'l4', 'l5'];

const getDietTagClass = (d: string) => {
  if (d === 'Vegan') return 'vegan';
  if (d === 'Eggless') return 'egg-free';
  if (d === 'Gluten-Free') return 'gf';
  return 'veg';
};

export const SauceCard: React.FC<SauceCardProps> = ({ product, onAddToCart, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [liked, setLiked] = useState(false);

  return (
    <article className="sauce-card">
      {/* ── Image ── */}
      <div className="sauce-card-image-box" onClick={() => onSelectProduct(product)} style={{ cursor: 'pointer' }}>
        <img
          src={imageMap[product.imageName] ?? buffalo_sauce}
          alt={product.name}
          className="sauce-card-img"
          loading="lazy"
        />
        <span className="sauce-tag">{product.type}</span>
        <div className="fssai-badge" title="100% Vegetarian / Eggless — FSSAI Certified">
          <div className="fssai-dot" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="sauce-card-content">
        {/* Header row */}
        <div className="sauce-card-header">
          <h3 className="sauce-name" onClick={() => onSelectProduct(product)} style={{ cursor: 'pointer' }}>{product.name}</h3>
          <div className="sauce-price-box">
            <div className="sauce-price">₹{product.price}</div>
            <div className="sauce-price-label">{product.size}</div>
          </div>
        </div>

        {/* Tagline */}
        <p className="sauce-tagline">"{product.tagline}"</p>

        {/* Dietary tags */}
        <div className="diet-tags">
          {product.dietary.map((d) => (
            <span key={d} className={`diet-tag ${getDietTagClass(d)}`}>
              {d}
            </span>
          ))}
        </div>

        {/* Info Panel */}
        <div>
          <div className="panel-tabs-row">
            {(['about', 'ingredients', 'pairings'] as const).map((tab) => (
              <button
                key={tab}
                className={`panel-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'about' ? 'About' : tab === 'ingredients' ? 'No Nasties' : 'Pairings'}
              </button>
            ))}
          </div>

          <div className="panel-content-area" style={{ marginTop: '12px' }}>
            {activeTab === 'about' && <p>{product.description}</p>}

            {activeTab === 'ingredients' && (
              <div>
                <div className="ingredient-chips">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-chip">{ing}</span>
                  ))}
                </div>
                <p className="clean-promise"><CheckCircle2 size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />No MSG · No Artificial Colors · No Preservatives</p>
              </div>
            )}

            {activeTab === 'pairings' && (
              <div className="pairing-chips">
                {product.pairings.map((p, i) => (
                  <span key={i} className="pairing-chip"><Utensils size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{p}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Heat level */}
        <div className="heat-row">
          <span className="heat-label">
            {product.heatLevel === 0 ? 'Mild' : product.heatLevel <= 2 ? 'Medium' : product.heatLevel <= 3 ? 'Spicy' : 'Extra Hot'} ({product.heatLevel}/5)
          </span>
          <div className="heat-dots">
            {HEAT_CLASSES.map((cls, i) => (
              <div
                key={i}
                className={`heat-dot ${cls} ${i < product.heatLevel ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="card-footer">
          <span className="size-label">{product.size} glass jar</span>
          <div className="card-actions">
            <button
              className={`wishlist-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
              title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="add-btn" 
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart size={15} />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </article>
  );
};
