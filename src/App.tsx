import { useState, useEffect, useCallback } from 'react';
import type { Product } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';

// ── Types ──────────────────────────────────────────────

type Page = 'home' | 'catalog' | 'about';

interface CartItem {
  product: Product;
  quantity: number;
}

// ── App ────────────────────────────────────────────────

export default function App() {
  const [page, setPage]         = useState<Page>('home');
  const [cart, setCart]         = useState<CartItem[]>([]);
  const [drawerOpen, setDrawer] = useState(false);

  // Scroll to top whenever the page changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [page]);

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
    setDrawer(true);
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

      <main>
        {page === 'home'    && <Home    onAddToCart={addToCart} setCurrentPage={setPage} />}
        {page === 'catalog' && <Catalog onAddToCart={addToCart} />}
        {page === 'about'   && <About />}
      </main>

      <Footer setCurrentPage={setPage} />

      <OrderDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawer(false)}
        cartItems={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
      />
    </>
  );
}
