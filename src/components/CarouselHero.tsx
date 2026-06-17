import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/buffalo_sauce_cutout.png', bg: '#C92C2C', id: 'buffalo', title: 'BUFFALO' },
  { src: '/classic_ranch_cutout.png', bg: '#10B981', id: 'classic', title: 'CLASSIC RANCH' },
  { src: '/chipotle_ranch_cutout.png', bg: '#F59E0B', id: 'chipotle', title: 'CHIPOTLE RANCH' },
  { src: '/golden_dip_cutout.png', bg: '#FBBF24', id: 'golden', title: 'GOLDEN DIP' },
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

    switch (role) {
      case 'center':
        return {
          x: '-50%',
          y: '-50%',
          scale: 1.2,
          left: '50%',
          top: '50%',
          width,
          height,
          zIndex: 30,
          opacity: 1,
        };
      case 'left':
        return {
          x: '-50%',
          y: '-50%',
          scale: 0.9,
          left: isMobile ? '20%' : '35%',
          top: '50%',
          width,
          height,
          zIndex: 20,
          opacity: 0.9,
        };
      case 'right':
        return {
          x: '-50%',
          y: '-50%',
          scale: 0.9,
          left: isMobile ? '80%' : '65%',
          top: '50%',
          width,
          height,
          zIndex: 20,
          opacity: 0.9,
        };
      case 'back':
      default:
        return {
          x: '-50%',
          y: '-50%',
          scale: 0.7,
          left: '50%',
          top: '50%',
          width,
          height,
          zIndex: 10,
          opacity: 0.4,
        };
    }
  };

  const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

  return (
    <motion.div
      animate={{ backgroundColor: IMAGES[activeIndex].bg }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
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

        {/* Carousel Container */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {IMAGES.map((img, index) => {
            const role = getRole(index);
            const style = getStyleForRole(role);
            return (
              <motion.div
                key={img.id}
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  left: style.left,
                  top: style.top,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: style.width,
                  height: style.height,
                }}
              >
                <motion.img
                  src={img.src}
                  alt={img.title}
                  draggable={false}
                  onClick={() => {
                    if (role !== 'center') handleBottleClick(index);
                  }}
                  animate={{
                    filter: role === 'center' ? 'drop-shadow(0 40px 50px rgba(0,0,0,0.5))' : 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
                  }}
                  transition={{ duration: 0.4 }}
                  className={`transition-transform duration-300 ${role !== 'center' ? 'pointer-events-auto cursor-pointer hover:scale-[1.05]' : 'pointer-events-none'}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: 'scale(1.5)',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
