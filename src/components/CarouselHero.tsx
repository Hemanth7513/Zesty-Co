import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IMAGES = [
  { src: '/buffalo_sauce_cutout.png', id: 'buffalo', title: 'BUFFALO SAUCE' },
  { src: '/classic_ranch_cutout.png', id: 'classic', title: 'CLASSIC RANCH' },
  { src: '/chipotle_ranch_cutout.png', id: 'chipotle', title: 'CHIPOTLE RANCH' },
  { src: '/golden_dip_cutout.png', id: 'golden', title: 'GOLDEN DIP' },
];

export const CarouselHero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBottleClick = (index: number) => {
    setActiveIndex(index);
  };

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getStyleForRole = (role: string) => {
    const width = isMobile ? '45vw' : '18vw';
    const height = isMobile ? '42vh' : '48vh';
    const baseTransition = 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1), left 600ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1)';

    switch (role) {
      case 'center':
        return {
          transform: `translate(-50%, -50%) scale(1.2)`,
          left: '50%',
          top: '50%',
          width,
          height,
          zIndex: 30,
          opacity: 1,
          transition: baseTransition,
        };
      case 'left':
        return {
          transform: `translate(-50%, -50%) scale(0.9)`,
          left: isMobile ? '20%' : '30%',
          top: '50%',
          width,
          height,
          zIndex: 20,
          opacity: 0.9,
          transition: baseTransition,
        };
      case 'right':
        return {
          transform: `translate(-50%, -50%) scale(0.9)`,
          left: isMobile ? '80%' : '70%',
          top: '50%',
          width,
          height,
          zIndex: 20,
          opacity: 0.9,
          transition: baseTransition,
        };
      case 'back':
      default:
        return {
          transform: `translate(-50%, -50%) scale(0.7)`,
          left: '50%',
          top: '50%',
          width,
          height,
          zIndex: 10,
          opacity: 0.4,
          transition: baseTransition,
        };
    }
  };

  const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

  return (
    <div
      style={{
        backgroundColor: '#C92C2C', // FIXED RED BACKGROUND
        height: '100vh',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[45]"
          style={{
            backgroundImage: `url("${grainSvg}")`,
            opacity: 0.4,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Custom style for interactive transitions */}
        <style>{`
          .hover-cta-btn {
            transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          }
          .hover-cta-btn:hover {
            background-color: #111111 !important;
            color: #ffffff !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25) !important;
          }
        `}</style>

        {/* Background Ghost Text */}
        <div
          style={{
            position: 'absolute',
            userSelect: 'none',
            pointerEvents: 'none',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 900,
            fontFamily: "'Anton', sans-serif",
            fontSize: isMobile ? '16vw' : '18vw',
            color: 'rgba(255, 255, 255, 0.05)',
            left: '50%',
            top: '46%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            width: '100%',
            letterSpacing: '0.02em',
          }}
        >
          ZESTY CO.
        </div>

        {/* Top Tagline Header */}
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 20,
            pointerEvents: 'none',
            top: isMobile ? '8%' : '10%',
            width: '90%',
          }}
        >
          <h1 
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '1.8rem' : '3.6rem',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              margin: '0 auto',
              lineHeight: 1.15,
              textShadow: '0 2px 10px rgba(0,0,0,0.15)',
            }}
          >
            Western Sauces. Indian Soul.
          </h1>
          <p 
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: isMobile ? '0.65rem' : '0.85rem',
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: isMobile ? '6px' : '12px',
              fontWeight: 700,
            }}
          >
            100% Natural • No Artificial Preservatives • Premium Clean Label
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 40,
            bottom: isMobile ? '6%' : '8%',
          }}
        >
          <Link
            to="/catalog"
            className="hover-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              color: '#C92C2C',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: isMobile ? '0.7rem' : '0.85rem',
              padding: isMobile ? '12px 24px' : '16px 36px',
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            Explore Catalog
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {IMAGES.map((img, index) => {
            const role = getRole(index);
            const style = getStyleForRole(role);
            const isClickable = role === 'left' || role === 'right';
            return (
              <div
                key={img.id}
                onClick={() => {
                  if (isClickable) handleBottleClick(index);
                }}
                className={`transition-all duration-300 ${isClickable ? 'pointer-events-auto cursor-pointer group' : 'pointer-events-none'}`}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform, left, opacity',
                  ...style,
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  draggable={false}
                  className="transition-transform duration-300 group-hover:scale-[1.2]"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(1.15)',
                    filter: role === 'center' ? 'drop-shadow(0 40px 50px rgba(0,0,0,0.5))' : 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                    transition: 'filter 600ms ease, transform 300ms ease',
                  }}
                />
                
                {/* Sauce Labels Below Bottles */}
                <div 
                  className="absolute -bottom-12 sm:-bottom-20 w-[200%] text-center pointer-events-none"
                  style={{
                    opacity: role === 'center' ? 1 : 0.6,
                    transform: `scale(${role === 'center' ? 1 : 0.8}) translateY(${role === 'center' ? '0px' : '-10px'})`,
                    transition: 'all 600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  <h3 className="text-white font-black uppercase tracking-widest text-lg sm:text-2xl drop-shadow-md">
                    {img.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
