import React, { useEffect, useState } from 'react';
import { Package, Clock, ShoppingBag, User, Mail, Phone, ArrowRight, LogOut } from 'lucide-react';
import type { Product } from '../data/products';

export interface OrderHistoryItem {
  id: string;
  date: string;
  total: number;
  items: { product: Product; quantity: number }[];
}

interface AccountProps {
  user: any;
  setUser: (user: any) => void;
}

export const Account: React.FC<AccountProps> = ({ user, setUser }) => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [isLogin, setIsLogin] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zesty_order_history');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !password || (!isLogin && (!name || !email))) return;

    if (isLogin) {
      // Mock Login
      setUser({ name: 'Zesty Customer', mobile, email: 'customer@zesty.co' });
    } else {
      // Mock Register
      setUser({ name, mobile, email });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '400px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isLogin && (
              <>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#888" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                  <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#888" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                  <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>
              </>
            )}
            
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="#888" style={{ position: 'absolute', top: '12px', left: '12px' }} />
              <input type="tel" placeholder="Mobile Number" required value={mobile} onChange={e => setMobile(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <Package size={18} color="#888" style={{ position: 'absolute', top: '12px', left: '12px' }} />
              <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#c92c2c', fontWeight: 'bold', cursor: 'pointer' }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          <Package size={32} color="#e63946" /> Welcome, {user.name.split(' ')[0]}
        </h1>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', color: '#666' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order History</h2>

      {orders.length === 0 ? (
        <div style={{ background: '#f8f8f8', padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
          <ShoppingBag size={48} color="#ccc" style={{ marginBottom: '1rem', display: 'inline-block' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#555', marginBottom: '0.5rem' }}>No orders yet</h3>
          <p style={{ color: '#888' }}>Looks like you haven't placed any orders with us yet. Time to get zesty!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '1.5rem', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.9rem', color: '#888', display: 'block', marginBottom: '4px' }}>Order ID</span>
                  <strong style={{ fontFamily: 'monospace' }}>#{order.id.slice(0, 8)}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.9rem', color: '#888', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginBottom: '4px' }}>
                    <Clock size={14} /> {new Date(order.date).toLocaleDateString()}
                  </span>
                  <strong style={{ color: '#e63946' }}>₹{order.total}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>{item.quantity} × {item.product.name} ({item.product.size})</span>
                    <span style={{ color: '#666' }}>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
