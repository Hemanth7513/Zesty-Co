# Product Requirements Document (PRD)
**Product Name:** Zesty Co. 
**Version:** 1.0 (MVP)
**Last Updated:** June 16, 2026

## 1. Executive Summary
Zesty Co. is a premium direct-to-consumer (D2C) culinary brand offering "Western Sauces with an Indian Soul." The digital storefront is designed to reflect the brand's uncompromising commitment to quality: 100% vegetarian, eggless, small-batch, and completely free of artificial preservatives, colors, and MSG. The platform provides a seamless, luxurious shopping experience characterized by editorial design and micro-interactions.

## 2. Target Audience
- Urban Indian millennials and Gen-Z consumers.
- Culinary enthusiasts seeking premium, clean-label alternatives to mass-market condiments.
- Vegetarians looking for high-quality eggless variants of classic Western sauces (e.g., Ranch, Buffalo).

## 3. Core Product Principles & Aesthetics
- **"Magazine Cover" Minimalism:** The UI must feel like a high-end culinary magazine. Heavy use of whitespace, strict left-aligned typography, and zero unnecessary visual clutter (no heavy drop shadows, no standard card borders).
- **Interactive Discovery:** Actions (like "Add to Cart" or "Wishlist") are hidden by default to keep the focus on the product photography, revealing themselves only through deliberate user interaction (hover).
- **Brand Palette:** Deep luxury Black (`#171717`) and vibrant Amber (`#D97706`), set against an Off-White/Cream background (`#f7f5f0`).

## 4. Feature Requirements (MVP)

### 4.1 Global Navigation & Header
- **Navigation Links:** Our Sauces (Catalog), Our Story (About), Contact.
- **Cart Integration:** Persistent cart icon in the header displaying the total quantity of items currently selected.
- **User Profile:** Persistent profile/account icon in the header.

### 4.2 Home Page (The "Editorial" Hero)
- **Objective:** Establish the premium nature of the brand immediately.
- **Components:** A singular, massive, immersive split-screen layout.
- **Copy:** High-impact serif typography focusing on the "New Standard of Flavor" and the brand's clean-label proposition.
- **Call to Action:** A primary "Shop the Collection" button routing to the Catalog.

### 4.3 Catalog Page (Our Sauces)
- **Objective:** Product discovery and rapid checkout.
- **Filtering:** Clean text-based filtering (All, Best Sellers, New Launches).
- **Grid Layout:** A spacious grid (`minmax(280px)`) that scales down to exactly 2 columns on mobile devices to prevent endless scrolling.
- **Product Cards:**
  - Borderless, floating bottle images.
  - Left-aligned product metadata (Title, 5-Star Reviews, Price, Size).
  - Hover-activated "Add to Cart" and "Wishlist" buttons that slide up smoothly within the image frame.

### 4.4 Product Detail Page
- **Objective:** Deep dive into a specific sauce.
- **Components:** High-resolution image, detailed flavor profile description, spice level indicators, and a sticky "Add to Cart" action.

### 4.5 The "About" Page
- **Objective:** Brand storytelling.
- **Components:** Editorial layout detailing the founding story, the commitment to Indian palates, and the "Zero Nasties" ingredient philosophy.

## 5. Future Considerations (Post-MVP)
- Integration of a secure payment gateway (Razorpay/Stripe).
- User authentication and order history.
- Dynamic backend for inventory management (Headless CMS like Sanity or Shopify Storefront API).
- Dedicated product reviews system.
