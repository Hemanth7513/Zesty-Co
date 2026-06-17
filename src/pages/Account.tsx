/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { Package, Clock, ShoppingBag } from 'lucide-react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import type { Product } from '../data/products';
import { PageTransition } from '../components/PageTransition';

export interface OrderHistoryItem {
  id: string;
  date: string;
  total: number;
  items: { product: Product; quantity: number }[];
}

export const Account: React.FC = () => {
  const { user: clerkUser } = useUser();
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    if (!clerkUser) {
      setOrders([]);
      return;
    }
    try {
      const historyKey = `zesty_order_history_${clerkUser.id}`;
      const saved = localStorage.getItem(historyKey);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, [clerkUser]);

  if (!clerkUser) {
    return (
      <PageTransition>
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '400px', margin: '0 auto', minHeight: '60vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Sign In Required</h1>
          <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.5 }}>
            Please sign in or create an account to view your past orders and manage your details.
          </p>
          <SignInButton mode="modal">
            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
            <Package size={32} color="#e63946" /> Welcome, {clerkUser.firstName || clerkUser.fullName?.split(' ')[0] || 'User'}
          </h1>
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
    </PageTransition>
  );
};
