import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  
  const [drawerOpen, setDrawer] = useState(false);

  // Scroll to top whenever the page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [page]);

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
      />

      <main style={{ overflowX: 'hidden' }}>
        <AnimatePresence mode="wait">
          {page === 'home'    && <Home    key="home"    onAddToCart={addToCart} setCurrentPage={setPage} onSelectProduct={(p) => { setSelectedProduct(p); setPage('product'); }} />}
          {page === 'catalog' && <Catalog key="catalog" onAddToCart={addToCart} onSelectProduct={(p) => { setSelectedProduct(p); setPage('product'); }} />}
          {page === 'about'   && <About   key="about"   />}
          {page === 'contact' && <Contact key="contact" />}
          {page === 'account' && <Account key="account" />}
          {page === 'product' && selectedProduct && (
            <ProductDetail 
              key="product"
              product={selectedProduct} 
              onAddToCart={addToCart} 
              onBack={() => setPage('catalog')} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setPage} />

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawer(false)}
        cartItems={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
        clearCart={() => setCart([])}
      />
    </>
  );
}
