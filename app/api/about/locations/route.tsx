import { NextResponse } from "next/server";

export function GET() {
  // In a real application, this data would come from a database
  const locations = [
    {
      city: "Geneva",
      address: "14 Rue du Rhône\nGeneva, Switzerland",
      hours: "Monday - Saturday: 10am - 7pm\nSunday: Closed",
      image: "luxury watch boutique in geneva"
    },
    {
      city: "New York",
      address: "121 Spring Street\nNew York, NY 10012",
      hours: "Monday - Saturday: 11am - 8pm\nSunday: 12pm - 6pm",
      image: "luxury watch boutique in new york"
    },
    {
      city: "Tokyo",
      address: "5-2-1 Ginza\nChuo City, Tokyo 104-0061",
      hours: "Monday - Sunday: 10am - 7pm",
      image: "luxury watch boutique in tokyo"
    }
  ];

  return NextResponse.json(locations);
}
