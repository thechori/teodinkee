export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  slug: string;
  category: string;
};

export type ProductSpecifications = {
  "Case Diameter": string;
  "Case Thickness": string;
  "Case Material": string;
  "Dial Color": string;
  Crystal: string;
  Movement: string;
  "Power Reserve": string;
  "Water Resistance": string;
  "Bracelet/Strap": string;
  Clasp: string;
  Functions: string;
};

export type ProductReviews = {
  average: number;
  count: number;
  breakdown: { rating: number; percentage: number }[];
};

export type ProductDetails = {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  features: string[];
  specifications: ProductSpecifications;
  reviews: ProductReviews;
  relatedProducts: Product[];
};
