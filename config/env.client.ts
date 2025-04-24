"use client";

const NEXT_PUBLIC_SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

if (!NEXT_PUBLIC_SEGMENT_WRITE_KEY) {
  throw Error("missing env var: NEXT_PUBLIC_SEGMENT_WRITE_KEY");
}

const env = {
  NEXT_PUBLIC_SEGMENT_WRITE_KEY
};

export default env;
