// export type User = {
//   id: number;
//   googleId: string;
//   email: string;
//   displayName: string;
//   bio: string;
//   createdAt: Date;
//   //
//   orders: Order[];
// };

// export type OrderStatus = "PENDING" | "PROCESSED" | "SHIPPED" | "DELIVERED";

// export type Order = {
//   id: number;
//   createdAt: Date;
//   products: Product[];
//   user: User;
//   totalPriceInCents: number; // whole numbers for currency accuracy
//   status: OrderStatus; // default "PENDING"
//   trackingNumber: string | null;
//   notes: string | null;
// };

// export type BlogPost = {
//   title: string;
//   excerpt: string;
//   content: string;
//   imageAlt: string;
//   imageUrl: string;
//   date: Date;
//   readTime: string;
//   category: string;
//   author: {
//     name: string;
//     bio: string;
//     image: string;
//   };
//   relatedPosts: {
//     title: string;
//     excerpt: string;
//     image: string;
//     date: Date;
//     slug: string;
//   }[];
// };

// export type Collection = {
//   name: string;
//   description: string;
//   imgAlt: string;
//   imgUrl: string;
//   //
//   products: Product[];
// };

// export type Product = {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   slug: string;
//   category: string;
//   imageUrl: string;
//   imageAlt: string;
//   description: string;
//   //
//   details: ProductDetails;
//   reviewSummary: ProductReviewSummary;
// };

// export type ProductSpecifications = {
//   caseDiameter: string;
//   caseThickness: string;
//   caseMaterial: string;
//   dialColor: string;
//   crystal: string;
//   movement: string;
//   powerReserve: string;
//   waterResistance: string;
//   braceletOrStrap: string;
//   clasp: string;
//   functions: string;
// };

// export type ProductReview = {
//   author: string;
//   title: string;
//   description: string;
//   rating: number;
// };

// export type ProductReviewSummary = {
//   average: number;
//   count: number;
//   breakdown: { rating: number; percentage: number }[];
// };

// export type ProductDetails = {
//   images: string[];
//   features: string[];
//   specifications: ProductSpecifications;
//   reviews: ProductReview[];
//   relatedProducts: Product[];
// };
