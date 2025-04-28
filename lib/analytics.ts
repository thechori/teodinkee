import { AnalyticsBrowser } from "@segment/analytics-next";
//
import env from "@/config/env.client";

export const analytics = AnalyticsBrowser.load({
  writeKey: env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
});

// Note: Convention is events in the past tense
export const segmentEvents = {
  KEYWORD_SEARCHED: "Keyword Searched",
  PRODUCT_VIEWED: "Product Viewed",
  FILTER_BY_PRODUCT_CATEGORY: "Filter By Product Category",
  PRODUCT_ADDED_TO_WISHLIST: "Product Added to Wishlist",
  PRODUCT_ADDED_TO_CART: "Product Added to Cart",
  PRODUCT_PURCHASED: "Product Purchased",
  PRODUCT_REVIEW: "Product Review",
  ARTICLE_VIEWED: "Article Viewed",
  ARTICLE_LIKED: "Article Liked",
  ARTICLE_SHARED: "Article Shared",
  SUBSCRIBED_TO_NEWSLETTER: "Subscribed to Newsletter",
  //
  PAGE_VIEWED: "Page Viewed"
};
