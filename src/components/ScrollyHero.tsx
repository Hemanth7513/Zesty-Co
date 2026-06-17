import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FRAME_COUNT = 89;

export const ScrollyHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${num}.svg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    const img = images[frameIndex];
    if (img) {
      const canvas = canvasRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate object-fit cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      context.drawImage(img, 0,0, img.width, img.height,
         centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
  });

  // Resize handler for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Trigger a re-draw (hacky but works to force initial draw)
        if (images.length > 0) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
              const img = images[0];
              const canvas = canvasRef.current;
              const hRatio = canvas.width / img.width;
              const vRatio = canvas.height / img.height;
              const ratio = Math.max(hRatio, vRatio);
              const centerShift_x = (canvas.width - img.width * ratio) / 2;
              const centerShift_y = (canvas.height - img.height * ratio) / 2;  
              context.drawImage(img, 0,0, img.width, img.height,
                 centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, images]);

  // Parallax text opacities based on scroll
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [50, 0, -50]);
  
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <div ref={containerRef} style={{ height: '500vh', width: '100%', position: 'relative', backgroundColor: '#000', margin: 0, padding: 0 }}>
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* Canvas Background */}
        <canvas 
          ref={canvasRef} 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} 
        />
        
        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Overlay 1: Center */}
          <motion.div 
            style={{ opacity: text1Opacity, y: text1Y, position: 'absolute', textAlign: 'center', padding: '0 1rem' }}
          >
            <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              The New Standard <br/>
              <span style={{ fontStyle: 'italic', color: '#fbbf24' }}>of Flavor</span>
            </h1>
            <p style={{ color: '#d1d5db', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Small-batch, 100% vegetarian condiments designed to elevate your everyday meals.
            </p>
          </motion.div>

          {/* Overlay 2: Left aligned */}
          <motion.div 
            style={{ opacity: text2Opacity, y: text2Y, position: 'absolute', left: '10%', textAlign: 'left', maxWidth: '400px' }}
          >
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Premium Ingredients
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '1.125rem' }}>
              We source only the finest spices and herbs. No artificial nasties, just pure, authentic taste in every drop.
            </p>
          </motion.div>

          {/* Overlay 3: Right aligned */}
          <motion.div 
            style={{ opacity: text3Opacity, y: text3Y, position: 'absolute', right: '10%', textAlign: 'right', maxWidth: '400px', pointerEvents: 'auto' }}
          >
            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Ready to Taste?
            </h2>
            <button 
              onClick={() => navigate('/catalog')}
              style={{ backgroundColor: '#fbbf24', color: 'black', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(250,204,21,0.4)' }}
            >
              SHOP THE COLLECTION
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
