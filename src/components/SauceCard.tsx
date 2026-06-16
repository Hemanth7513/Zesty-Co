import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
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

export const SauceCard: React.FC<SauceCardProps> = ({ product, onAddToCart, onSelectProduct }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.article 
      className="sauce-card-minimal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ── Image Area ── */}
      <div className="card-minimal-image" onClick={() => onSelectProduct(product)}>
        <img
          src={imageMap[product.imageName] ?? buffalo_sauce}
          alt={product.name}
          className="card-minimal-img"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="card-minimal-badges">
          {product.type === 'Best Seller' && <span className="minimal-badge hit">Best Seller</span>}
          {product.type === 'New' && <span className="minimal-badge new">New Launch</span>}
          <div className="fssai-badge-minimal" title="100% Vegetarian — FSSAI Certified">
            <div className="fssai-dot-minimal" />
          </div>
        </div>

        {/* Hover Action Overlay */}
        <div className="hover-action-overlay">
          <button
            className={`minimal-wishlist-btn ${liked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>

          <button 
            className="minimal-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <span>ADD TO CART</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="card-minimal-content">
        <h3 className="minimal-title" onClick={() => onSelectProduct(product)}>{product.name}</h3>
        <p className="minimal-reviews">★★★★★ <span>12 Reviews</span></p>
        <p className="minimal-price">
          Rs. {product.price} <span className="minimal-size">({product.size})</span>
        </p>
      </div>
    </motion.article>
  );
};
