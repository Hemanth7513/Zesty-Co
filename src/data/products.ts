export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  heatLevel: number; // 0 to 5
  description: string;
  ingredients: string[];
  dietary: ('Vegan' | 'Vegetarian' | 'Eggless' | 'Gluten-Free')[];
  pairings: string[];
  opportunityScore: number;
  imageName: string; // references local asset file
  tagline: string;
  size: string; // e.g. "200ml" or "250ml"
}

export const products: Product[] = [
  {
    id: "buffalo-sauce",
    name: "Fiery Buffalo Sauce",
    type: "Hot Sauce",
    price: 179,
    heatLevel: 4,
    description: "Classic American buffalo format adapted for Indian kitchens. A vibrant, vinegar-based hot sauce emulsified with rich plant-based butter for that signature smooth, tangy, and spicy finish.",
    ingredients: ["Cayenne pepper paste", "Real fermented vinegar", "Plant-based butter", "Water", "Sea salt", "Natural spice extracts"],
    dietary: ["Vegan", "Eggless", "Gluten-Free"],
    pairings: ["Chicken Wings", "Paneer Tikka Wings", "Momos", "Fries", "Pizza Drizzle", "Wraps"],
    opportunityScore: 9.5,
    imageName: "buffalo_sauce.png",
    tagline: "Fiery cayenne heat with a velvety plant-butter emulsion.",
    size: "200ml"
  },
  {
    id: "chipotle-ranch",
    name: "Smoky Chipotle Ranch",
    type: "Dips & Dressings",
    price: 229,
    heatLevel: 3,
    description: "The ultimate 'everything dip'. Combines the rich, cooling herbaceous tang of a buttermilk ranch base with the warm, smoky heat of chipotle peppers in adobo. Versatile and highly addictive.",
    ingredients: ["Buttermilk", "Cold-pressed sunflower oil", "Chipotle peppers in adobo", "Lemon juice", "Fresh garlic", "Chives", "Dill", "Organic spices"],
    dietary: ["Vegetarian", "Eggless", "Gluten-Free"],
    pairings: ["Burger Dressing", "Wrap Sauce", "Pizza Dip", "French Fries", "Salad Dressing"],
    opportunityScore: 9.0,
    imageName: "chipotle_ranch.png",
    tagline: "Creamy ranch meets warm adobo chipotle smoke.",
    size: "250ml"
  },
  {
    id: "golden-dip",
    name: "Golden Honey Mustard Dip",
    type: "Dips & Dressings",
    price: 229,
    heatLevel: 1,
    description: "A cult-classic Chick-fil-A inspired dipping sauce. A perfect sweet, smoky, and tangy harmony of rich eggless mayo, pure raw honey, and freshly ground mustard seeds.",
    ingredients: ["Eggless mayo base", "Pure raw honey", "Yellow mustard seeds", "Smoked paprika", "Tomato paste", "Jaggery", "Natural smoke flavor", "Spices"],
    dietary: ["Vegetarian", "Eggless"],
    pairings: ["Chicken Tenders", "Nuggets", "Paneer Strips", "Burgers", "Snack Platters"],
    opportunityScore: 8.5,
    imageName: "golden_dip.png",
    tagline: "Cult-classic honey mustard and BBQ fusion.",
    size: "250ml"
  },
  {
    id: "classic-ranch",
    name: "Backyard Classic Ranch",
    type: "Dips & Dressings",
    price: 199,
    heatLevel: 0,
    description: "Our clean-label answer to commodity ranch dressings. Made with real buttermilk and fresh garden herbs for an incredibly airy, refreshing, and clean herb-forward flavor profile.",
    ingredients: ["Buttermilk", "Cold-pressed sunflower oil", "Lemon juice", "Fresh dill", "Parsley", "Chives", "Garlic", "Onion powder", "Sea salt"],
    dietary: ["Vegetarian", "Eggless", "Gluten-Free"],
    pairings: ["Pizza Dip", "Salads", "Veggie Sticks", "Crispy Burger Spread"],
    opportunityScore: 7.0,
    imageName: "classic_ranch.png",
    tagline: "Refreshing buttermilk loaded with fresh garden herbs.",
    size: "250ml"
  },
  {
    id: "creamy-pepper-dip",
    name: "Creamy Cracked Pepper Dip",
    type: "Dips & Dressings",
    price: 199,
    heatLevel: 2,
    description: "A Raising Cane's-inspired house dipping sauce. Featuring a premium eggless mayo base blended with bold black pepper, garlic, and a custom tamarind-based spice blend for a savory punch.",
    ingredients: ["Eggless mayo base", "Tomato paste", "Coarsely cracked black pepper", "Fresh garlic", "Lemon juice", "Tamarind extract", "Organic sea salt", "Spices"],
    dietary: ["Vegetarian", "Eggless", "Gluten-Free"],
    pairings: ["Fried Chicken", "Wings", "Momos", "Burger Spread", "Crinkle-Cut Fries"],
    opportunityScore: 6.0,
    imageName: "creamy_pepper_dip.png",
    tagline: "Bold black pepper kick in a savory cream base.",
    size: "250ml"
  }
];
