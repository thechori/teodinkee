import { AnalyticsBrowser } from "@segment/analytics-next";

const writeKey = process.env.SEGMENT_WRITE_KEY;

if (!writeKey) throw Error("missing segment writeKey env var");

export const analytics = AnalyticsBrowser.load({ writeKey });
