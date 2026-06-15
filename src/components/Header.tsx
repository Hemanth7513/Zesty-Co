import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: 'home' | 'catalog' | 'about' | 'contact' | 'product' | 'account';
  setCurrentPage: (page: 'home' | 'catalog' | 'about' | 'contact' | 'product' | 'account') => void;
  user: any;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  currentPage,
  setCurrentPage,
  user,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (page: 'home' | 'catalog' | 'about' | 'contact', label: string) => (
    <li key={page}>
      <a
        href={`#${page}`}
        className={currentPage === page ? 'active' : ''}
        onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">

        {/* Premium wordmark logo — no icon, just refined type */}
        <a
          href="#home"
          className="logo"
          onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
          aria-label="Zesty Co. — home"
        >
          {/* Thin chilli glyph as SVG — geometric, not cartoonish */}
          <svg
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            aria-hidden="true"
            style={{ display: 'block', flexShrink: 0 }}
          >
            {/* Stem */}
            <path d="M9 2 C9 2, 11 0.5, 13 1" stroke="#c92c2c" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            {/* Body */}
            <path
              d="M9 3 C9 3, 14 5, 15 10 C16 14, 14 19, 11 21 C9.5 22 7.5 22 6 21 C4 19.5, 3 16, 3.5 12 C4 7, 7 3.5, 9 3 Z"
              fill="#c92c2c"
              opacity="0.9"
            />
            {/* Highlight */}
            <path
              d="M7.5 6 C8 5, 10 5.5, 11.5 7.5"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          Zesty <em>Co.</em>
        </a>

        {/* Nav */}
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {nav('home', 'Home')}
            {nav('catalog', 'Our Sauces')}
            {nav('about', 'Our Story')}
            {nav('contact', 'Contact')}
          </ul>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Account */}
          <button className="cart-btn" onClick={() => setCurrentPage('account')} aria-label="My Account" style={{ background: 'none', color: '#c92c2c', padding: '8px 12px', border: '1px solid #c92c2c', borderRadius: '50px', cursor: 'pointer' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In'}</span>
          </button>

          {/* Cart */}
          <button className="cart-btn" onClick={onCartClick} id="cart-toggle" aria-label="Open cart">
            <ShoppingBag size={16} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
