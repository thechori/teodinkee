import { NextResponse } from "next/server";

export async function GET() {
  // In a real application, this data would come from a database
  const teamMembers = [
    {
      name: "Thomas Dinkee",
      title: "Founder & Master Watchmaker",
      bio: "With over 30 years of experience in haute horlogerie, Thomas founded Teodinkee to create timepieces that blend traditional craftsmanship with contemporary design.",
      image: "professional older man with glasses in workshop"
    },
    {
      name: "Elena Rousseau",
      title: "Head of Design",
      bio: "A graduate of the prestigious École d'Art et de Design in Geneva, Elena brings a unique artistic vision to Teodinkee's collections, balancing aesthetics with functionality.",
      image: "professional woman with dark hair in design studio"
    },
    {
      name: "Marcus Chen",
      title: "Technical Director",
      bio: "With a background in mechanical engineering and traditional watchmaking, Marcus oversees the development and production of our in-house movements.",
      image: "asian man in professional attire examining watch"
    }
  ];

  return NextResponse.json(teamMembers);
}
