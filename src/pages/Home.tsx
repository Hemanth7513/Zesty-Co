import React from 'react';
import type { Product } from '../data/products';
import { PageTransition } from '../components/PageTransition';
import { CarouselHero } from '../components/CarouselHero';

interface HomeProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = () => {
  return (
    <PageTransition>
      <div className="page-wrapper" style={{ padding: 0, margin: 0, overflowX: 'hidden' }}>
        <CarouselHero />
      </div>
    </PageTransition>
  );
};
