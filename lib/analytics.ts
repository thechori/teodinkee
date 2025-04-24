import { AnalyticsBrowser } from "@segment/analytics-next";
//
import env from "@/config/env.client";

console.log(
  "env.NEXT_PUBLIC_SEGMENT_WRITE_KEY: ",
  env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
);

export const analytics = AnalyticsBrowser.load({
  writeKey: env.NEXT_PUBLIC_SEGMENT_WRITE_KEY
});

export const segmentEvents = {
  PRODUCT_VIEWED: "Product Viewed"
};
