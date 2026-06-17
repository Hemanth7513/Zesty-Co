# Zesty Co.

Zesty Co. is a clean-label, eggless sauce brand offering Western-inspired recipes customized for the Indian palate. The project is built using a modern, interactive single-page application architecture.

Live Site: [Zesty Co. on Vercel](https://zesty-co.vercel.app)

---

## Core Features

- **Interactive 3D Carousel**: A responsive homepage carousel featuring smooth transition animations when clicking side bottles, optimized for both desktop and mobile viewports.
- **WhatsApp Checkout**: An integrated cart and checkout flow that compiles order details into a formatted WhatsApp message for direct ordering.
- **User Authentication**: Secure user login and profile management integrated using Clerk.

---

## Technical Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS + TailwindCSS (layout utility classes)
- **Icons**: Lucide React
- **Auth**: Clerk React SDK

---

## Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the root directory and add your Clerk publishable key:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 3. Development
Start the local development server:
```bash
npm run dev
```

### 4. Production Build
Compile the optimized production build:
```bash
npm run build
```
