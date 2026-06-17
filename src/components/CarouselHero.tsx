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
    const width = isMobile ? '50vw' : '22vw';
    const height = isMobile ? '50vh' : '65vh';
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

        {/* Background Ghost Text */}
        <div
          className="absolute select-none pointer-events-none text-center uppercase font-black"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: isMobile ? '18vw' : '20vw',
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
          className="absolute left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none"
          style={{
            top: '12%',
            width: '90%',
          }}
        >
          <h1 
            className="text-white font-extrabold tracking-[0.2em] uppercase text-sm sm:text-base md:text-xl drop-shadow-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Western Sauces. Indian Soul.
          </h1>
          <p 
            className="text-white/60 tracking-[0.12em] uppercase text-[10px] sm:text-xs mt-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            100% Natural • No Artificial Preservatives • Premium Clean Label
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center z-40"
          style={{
            bottom: '10%',
          }}
        >
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center bg-white text-[#C92C2C] font-extrabold uppercase tracking-wider text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 hover:shadow-lg pointer-events-auto"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              borderRadius: '0',
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
                  className="transition-transform duration-300 group-hover:scale-[1.55]"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(1.5)',
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
