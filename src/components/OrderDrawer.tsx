import React, { useState, useEffect } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
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
  clearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  clearCart
}) => {
  const { user: clerkUser } = useUser();
  
  const [name, setName]       = useState('');
  const [mobile, setMobile]   = useState('');
  const [doorNo, setDoorNo]   = useState('');
  const [street, setStreet]   = useState('');
  const [city, setCity]       = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes]     = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const storageKey = clerkUser ? `zesty_customer_details_${clerkUser.id}` : 'zesty_customer_details';

  // Load saved details on mount or user change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const d = JSON.parse(saved);
        setName(d.name || clerkUser?.fullName || '');
        setMobile(d.mobile || '');
        setDoorNo(d.doorNo || '');
        setStreet(d.street || '');
        setCity(d.city || '');
        setPincode(d.pincode || '');
        if (d.paymentMethod) setPaymentMethod(d.paymentMethod);
      } else if (clerkUser) {
        setName(clerkUser.fullName || '');
        setMobile('');
        setDoorNo('');
        setStreet('');
        setCity('');
        setPincode('');
      }
    } catch (err) {
      console.error(err);
    }
  }, [clerkUser, storageKey]);

  // Save details whenever they change
  useEffect(() => {
    const details = { name, mobile, doorNo, street, city, pincode, paymentMethod };
    localStorage.setItem(storageKey, JSON.stringify(details));
  }, [name, mobile, doorNo, street, city, pincode, paymentMethod, storageKey]);

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = 50;
  const total    = subtotal + delivery;

  // Validation
  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);
  const isValidPincode = /^[1-9][0-9]{5}$/.test(pincode);

  const canCheckout = name.trim() && isValidMobile && doorNo.trim() && street.trim() && city.trim() && isValidPincode && paymentMethod;

  const handleCheckout = () => {
    if (cartItems.length === 0 || !canCheckout) return;

    // Save to order history
    try {
      const historyKey = clerkUser ? `zesty_order_history_${clerkUser.id}` : 'zesty_order_history';
      const saved = localStorage.getItem(historyKey);
      const history = saved ? JSON.parse(saved) : [];
      history.unshift({
        id: Math.random().toString(36).substring(2, 10),
        date: new Date().toISOString(),
        total,
        items: cartItems
      });
      localStorage.setItem(historyKey, JSON.stringify(history));
    } catch (err) {
      console.error(err);
    }

    let msg = `*NEW ORDER — ZESTY CO.*\n\n`;
    cartItems.forEach((i) => {
      msg += `• *${i.product.name}* (${i.product.size}) × ${i.quantity} — ₹${i.product.price * i.quantity}\n`;
    });
    msg += `\n*Subtotal:* ₹${subtotal}\n*Delivery:* ₹${delivery} (flat D2C)\n*Total:* ₹${total}\n\n`;
    msg += `*Payment Method:* ${paymentMethod}\n\n`;
    msg += `*Customer:* ${name}\n*Mobile:* ${mobile}\n*Address:* ${doorNo}, ${street}, ${city} - ${pincode}`;
    if (notes) msg += `\n*Notes:* ${notes}`;
    
    if (paymentMethod === 'UPI' || paymentMethod === 'Card / Netbanking') {
      msg += `\n\nThank you! Please share the payment link/details.`;
    } else {
      msg += `\n\nThank you! We will collect ₹${total} via Cash on Delivery.`;
    }

    clearCart();
    onClose();
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

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
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    className={`form-input ${mobile && !isValidMobile ? 'invalid' : ''}`}
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  {mobile && !isValidMobile && <span style={{ color: '#e63946', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Please enter a valid 10-digit Indian mobile number.</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Door No. / Flat No. *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Flat 204 or House No. 12"
                    value={doorNo}
                    onChange={(e) => setDoorNo(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Street / Area *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. MG Road, Indiranagar"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bangalore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input
                    type="text"
                    className={`form-input ${pincode && !isValidPincode ? 'invalid' : ''}`}
                    placeholder="6-digit PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  {pincode && !isValidPincode && <span style={{ color: '#e63946', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>Please enter a valid 6-digit PIN code.</span>}
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
              <div className="form-section">
                <h4>Payment Method</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    UPI (Google Pay, PhonePe)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="paymentMethod" value="Card / Netbanking" checked={paymentMethod === 'Card / Netbanking'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    Card / Netbanking
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    Cash on Delivery
                  </label>
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
              style={{ opacity: canCheckout ? 1 : 0.6 }}
            >
              <MessageCircle size={20} fill="currentColor" />
              Order via WhatsApp
            </button>

            {!canCheckout && (
              <p className="checkout-hint">Please fill in all valid details above to checkout.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
