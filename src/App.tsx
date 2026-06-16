import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import type { Product } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProductDetail } from './pages/ProductDetail';
import { Account } from './pages/Account';

// ── Types ──────────────────────────────────────────────

interface CartItem {
  product: Product;
  quantity: number;
}

// ── App ────────────────────────────────────────────────

export default function App() {
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [cart, setCart]         = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zesty_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [drawerOpen, setDrawer] = useState(false);

  // Scroll to top whenever the page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('zesty_cart', JSON.stringify(cart));
  }, [cart]);

  // ── Cart logic ──────────────────────────────────────

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`${product.name} added to cart!`);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  // ── Render ──────────────────────────────────────────

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setDrawer(true)}
      />

      <main style={{ overflowX: 'hidden' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/catalog" element={<Catalog onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawer(false)}
        cartItems={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
        clearCart={() => setCart([])}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}
