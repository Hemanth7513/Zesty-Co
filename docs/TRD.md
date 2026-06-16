# Technical Requirements Document (TRD)
**Project Name:** Zesty Co. Frontend
**Version:** 1.0
**Last Updated:** June 16, 2026

## 1. System Architecture
Zesty Co. is a Single Page Application (SPA) built to deliver a lightning-fast, highly animated frontend experience without the overhead of heavy SSR frameworks. State management is handled entirely client-side for the MVP phase.

## 2. Technology Stack
- **Framework:** React 18+
- **Build Tool:** Vite (chosen for sub-second HMR and highly optimized production builds).
- **Language:** TypeScript (Strict Mode enabled for robust type safety across product data and component props).
- **Styling:** Vanilla CSS3. We intentionally avoided utility-class frameworks (like Tailwind) to maintain absolute bespoke control over the unique editorial grid, typography, and complex hover interactions. CSS Variables are heavily utilized for theming.
- **Animations:** Framer Motion (used for page transitions, staggered layout animations, and micro-interactions like the hover slide-ups).
- **Icons:** `lucide-react` (Lightweight, clean SVGs).
- **Deployment:** Vercel (Continuous deployment via GitHub main branch).

## 3. Project Structure

```text
zesty-co/
├── src/
│   ├── assets/            # Static assets (sauce bottle PNGs)
│   ├── components/        # Reusable UI components (Header, SauceCard, PageTransition)
│   ├── data/              # Mock backend (products.ts)
│   ├── pages/             # Route-level views (Home, Catalog, About, Contact)
│   ├── App.tsx            # Root component handling global state and routing
│   ├── index.css          # Global styling and design system tokens
│   └── main.tsx           # React DOM entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 4. State Management & Routing
### 4.1 Custom Routing
For MVP simplicity and speed, routing is managed via a custom state hook (`[page, setPage] = useState<Page>('home')`) inside `App.tsx`. `AnimatePresence` from Framer Motion wraps the page components to enable smooth fade-in/out transitions between views.

### 4.2 Cart State
Cart state is lifted to the `App.tsx` level:
```typescript
interface CartItem {
  product: Product;
  quantity: number;
}
const [cart, setCart] = useState<CartItem[]>([]);
```
The `addToCart` function is passed down as a prop to child components (`Home`, `Catalog`, `SauceCard`), allowing any view to trigger a global cart update that immediately reflects in the `Header` badge.

## 5. CSS Architecture & Design System
All styling is centralized in `src/index.css`. The file is structured into:
1. **Design Tokens:** CSS custom properties defining colors (`--brand`, `--text-900`), spacing (`--space-4`), border radii, and animation easings.
2. **Typography Setup:** Implementation of custom web fonts (Serif for headlines, Display Sans-serif for UI elements).
3. **Component Blocks:** Specific classes for structural sections (`.hero-premium`, `.sauces-grid`, `.sauce-card-minimal`).

### Mobile Responsiveness Strategy
Media queries are primarily breakpoint-driven (`max-width: 900px`, `max-width: 768px`). The primary layout shift occurs in the `.sauces-grid` which moves from `repeat(auto-fill, minmax(280px, 1fr))` to `repeat(2, 1fr)` to ensure a two-column layout on standard smartphones.

## 6. Performance Considerations
- **Image Optimization:** All product images are cropped, background-removed PNGs optimized for web delivery. They are loaded with `loading="lazy"` attributes where appropriate.
- **Bundle Size:** Framer Motion is the only significant external dependency. Unused icons are aggressively tree-shaken by Vite.
- **Hardware Acceleration:** All complex hover effects and page transitions utilize `transform` and `opacity` properties to ensure they run on the GPU via the compositor thread, preventing layout thrashing.
