import { AnalyticsBrowser } from "@segment/analytics-next";
//
import env from "@/config/env.client";

export const analytics = AnalyticsBrowser.load({
  writeKey: env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
});

export const segmentEvents = {
  SEARCH_BY_KEYWORD: "Search By Keyword", // pass `keyword`
  PRODUCT_VIEWED: "Product Viewed", // pass `productId`, `price`, `productCategory`
  FILTER_BY_PRODUCT_CATEGORY: "Filter By Product Category", // pass `productCategory`
  PRODUCT_ADDED_TO_WISHLIST: "Product Added to Wishlist", // pass `productId`
  PRODUCT_ADDED_TO_CART: "Product Added to Cart", // pass `productId`
  PRODUCT_PURCHASED: "Product Purchased", // pass `productId`
  PRODUCT_REVIEW: "Product Review", // pass `productId`
  ARTICLE_VIEWED: "Article Viewed", // pass `productCategory`
  ARTICLE_LIKED: "Article Liked", // pass `productCategory`
  SUBSCRIBED_TO_NEWSLETTER: "Subscribed to Newsletter", // pass `email` or `userId`
  //
  VISIT_PAGE: "Visit Page" // pass `page` - is this already handled by Segment, though?
};
