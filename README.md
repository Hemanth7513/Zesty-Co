# Zesty Co. — Premium Clean-Label Hot Sauces

Zesty Co. is a D2C premium sauce brand featuring clean-label, eggless Western-inspired hot sauces and dressings custom-tailored for the Indian palate. Made with 100% natural ingredients and zero artificial preservatives.

Live Deployment: [Zesty Co. on Vercel](https://zesty-co.vercel.app)

---

## 🌶️ Key Features

### 1. **Interactive 3D Carousel Hero**
- A custom-engineered horizontal carousel featuring clean cutouts of Zesty Co. signature sauces (Buffalo Sauce, Classic Ranch, Chipotle Ranch, Golden Dip).
- **Smooth Animations**: Clicking any side bottle triggers a high-performance translation and scale transition to smoothly rotate that bottle to the center.
- **Responsive Layout**: Designed to adapt elegantly for both laptop/desktop viewports and mobile screens, adjusting headings and bottle sizes dynamically to avoid text overlap.
- **Premium Aesthetics**: Features a subtle overlay grain texture effect and a bold background "ZESTY CO." ghost text in the Anton typeface.

### 2. **D2C WhatsApp Checkout System**
- Custom order drawer calculating subtotal, delivery charges, and final amounts.
- **WhatsApp Integration**: Compiles ordered items, sizes, quantities, and customer shipping/payment details into a beautifully formatted WhatsApp text message template that redirects customers directly to WhatsApp checkout.

### 3. **Secure Auth Integration**
- Out-of-the-box user authentication and profile management powered by Clerk.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS + TailwindCSS (for utility layouts)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Clerk React SDK](https://clerk.com/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Clerk publishable key:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

### 4. Running the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 5. Building for Production
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

---

## 📁 Directory Structure
- `src/components/`: Houses reusable UI components (e.g., `CarouselHero.tsx`, `Header.tsx`, `OrderDrawer.tsx`).
- `src/pages/`: Main views/routes (e.g., `Home.tsx`, `Catalog.tsx`, `Account.tsx`).
- `src/data/`: Static product mock information (`products.ts`).
- `public/`: Cutout assets and images.
