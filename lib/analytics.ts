import { AnalyticsBrowser } from "@segment/analytics-next";
//
import env from "@/config/env.client";

export const analytics = AnalyticsBrowser.load({
  writeKey: env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
});

export const segmentEvents = {
  PRODUCT_VIEWED: "Product Viewed"
};
