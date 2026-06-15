import { useState, useEffect, useCallback } from 'react';
import type { Product } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProductDetail } from './pages/ProductDetail';
import { Account } from './pages/Account';

// ── Types ──────────────────────────────────────────────

type Page = 'home' | 'catalog' | 'about' | 'contact' | 'product' | 'account';

interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  mobile: string;
  email: string;
  doorNo?: string;
  street?: string;
  city?: string;
  pincode?: string;
}

// ── App ────────────────────────────────────────────────

export default function App() {
  const [page, setPage]         = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart]         = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zesty_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('zesty_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  const [drawerOpen, setDrawer] = useState(false);

  // Scroll to top whenever the page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [page]);

  // Persist cart and user
  useEffect(() => {
    localStorage.setItem('zesty_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('zesty_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('zesty_user');
    }
  }, [user]);

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
    alert(`${product.name} added to cart!`);
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
        currentPage={page}
        setCurrentPage={setPage}
        user={user}
      />

      <main>
        {page === 'home'    && <Home    onAddToCart={addToCart} setCurrentPage={setPage} />}
        {page === 'catalog' && <Catalog onAddToCart={addToCart} onSelectProduct={(p) => { setSelectedProduct(p); setPage('product'); }} />}
        {page === 'about'   && <About />}
        {page === 'contact' && <Contact />}
        {page === 'account' && <Account user={user} setUser={setUser} />}
        {page === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBack={() => setPage('catalog')} 
          />
        )}
      </main>

      <Footer setCurrentPage={setPage} />

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawer(false)}
        cartItems={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
        clearCart={() => setCart([])}
        user={user}
        setUser={setUser}
      />
    </>
  );
}
