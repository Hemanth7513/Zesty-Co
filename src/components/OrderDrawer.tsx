import React, { useState } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import type { Product } from '../data/products';

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

interface CartItem { product: Product; quantity: number; }

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [name, setName]       = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes]     = useState('');

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = 50;
  const total    = subtotal + delivery;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let msg = `*NEW ORDER — ZESTY CO.*\n\n`;
    cartItems.forEach((i) => {
      msg += `• *${i.product.name}* (${i.product.size}) × ${i.quantity} — ₹${i.product.price * i.quantity}\n`;
    });
    msg += `\n*Subtotal:* ₹${subtotal}\n*Delivery:* ₹${delivery} (flat D2C)\n*Total:* ₹${total}\n\n`;
    msg += `*Customer:* ${name}\n*Address:* ${address}`;
    if (notes) msg += `\n*Notes:* ${notes}`;
    msg += `\n\nThank you! Please share payment details.`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const canCheckout = name.trim() && address.trim();

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Your Order</h2>
          <button className="drawer-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon"><ShoppingBag size={32} /></div>
              <h3>Bag is empty</h3>
              <p>Add some Zesty Co. sauces to start your order.</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="cart-item" key={item.product.id}>
                  <img
                    src={imageMap[item.product.imageName]}
                    alt={item.product.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-info">
                    <div>
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-size">{item.product.size}</div>
                    </div>
                    <div className="cart-item-row">
                      <span className="cart-item-price">₹{item.product.price * item.quantity}</span>
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => onUpdateQuantity(item.product.id, -1)}>−</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => onUpdateQuantity(item.product.id, +1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => onRemoveItem(item.product.id)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery details */}
              <div className="form-section">
                <h4>Delivery Details</h4>

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Street, Area, City, PIN code"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Special Instructions</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ring bell, leave at door"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((n, i) => n + i.quantity, 0)} items)</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery (D2C flat rate)</span>
              <span>₹{delivery}</span>
            </div>
            <div className="summary-row">
              <span className="summary-total">Total</span>
              <span className="summary-total-price">₹{total}</span>
            </div>

            <button
              className="whatsapp-btn"
              onClick={handleCheckout}
              disabled={!canCheckout}
            >
              <MessageCircle size={20} fill="currentColor" />
              Order via WhatsApp
            </button>

            {!canCheckout && (
              <p className="checkout-hint">Fill in your name and address to unlock checkout.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
