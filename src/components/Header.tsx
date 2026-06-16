import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: 'home' | 'catalog' | 'about' | 'contact' | 'product' | 'account';
  setCurrentPage: (page: 'home' | 'catalog' | 'about' | 'contact' | 'product' | 'account') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  currentPage,
  setCurrentPage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'catalog' | 'about' | 'contact') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const nav = (page: 'home' | 'catalog' | 'about' | 'contact', label: string) => (
    <li key={page}>
      <a
        href={`#${page}`}
        className={currentPage === page ? 'active' : ''}
        onClick={(e) => { e.preventDefault(); handleNavClick(page); }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
        <nav aria-label="Main navigation" className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            {nav('home', 'Home')}
            {nav('catalog', 'Our Sauces')}
            {nav('about', 'Our Story')}
            {nav('contact', 'Contact')}
          </ul>
        </nav>

        <div className="header-actions">
          {/* Clerk Account Integration */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="cart-btn" aria-label="Sign In" style={{ background: 'none', color: '#c92c2c', padding: '8px 12px', border: '1px solid #c92c2c', borderRadius: '50px', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="account-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => setCurrentPage('account')} style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 8px' }}>
                Orders
              </button>
              <UserButton appearance={{ elements: { userButtonAvatarBox: { width: 32, height: 32 } } }} />
            </div>
          </SignedIn>

          {/* Cart */}
          <button className="cart-btn" onClick={onCartClick} id="cart-toggle" aria-label="Open cart">
            <ShoppingBag size={16} />
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
