import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

type Location = {
  city: string;
  address: string;
  hours: string;
  image: string;
};

async function getTeamMembers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/about/team`,
      {
        cache: "no-store"
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

async function getLocations() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/about/locations`,
      {
        cache: "no-store"
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const locations = await getLocations();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/watchmaker-workshop.png"
            alt="Watchmaker workshop"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Crafting exceptional timepieces since 2010, driven by passion and
              precision.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">
              The Teodinkee Journey
            </h2>
            <p className="text-lg text-gray-600">
              Founded in 2010 by master watchmaker Thomas Dinkee, our company
              began with a simple mission: to create timepieces that honor
              traditional craftsmanship while embracing modern innovation. What
              started as a small atelier in Geneva has grown into a respected
              name in luxury horology, without ever compromising on our founding
              principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Our Philosophy
              </h3>
              <p className="text-gray-600 mb-6">
                At Teodinkee, we believe that a truly exceptional timepiece is
                more than the sum of its parts. It's a harmonious blend of
                technical excellence, aesthetic beauty, and emotional resonance.
                Every watch we create is designed to be not just an instrument
                for measuring time, but a companion for life's most significant
                moments.
              </p>
              <p className="text-gray-600">
                We maintain a commitment to small-batch production, ensuring
                that each timepiece receives the attention to detail it
                deserves. Our watchmakers spend hundreds of hours perfecting
                each movement, dial, and case, resulting in watches that stand
                the test of time both mechanically and stylistically.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/watchmaker-at-desk.png"
                alt="Watchmaker at desk"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/watch-components.png"
                alt="Watch components"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Craftsmanship
              </h3>
              <p className="text-gray-600 mb-6">
                Our watches are crafted using a combination of traditional
                techniques passed down through generations and cutting-edge
                technology. Each component is meticulously designed,
                manufactured, and finished in our workshops by skilled artisans
                who have dedicated their lives to the art of watchmaking.
              </p>
              <p className="text-gray-600">
                We source only the finest materials from around the world:
                surgical-grade stainless steel, precious metals, sapphire
                crystals, and ethically sourced gemstones. Our movements are
                developed in-house and undergo rigorous testing to ensure
                exceptional accuracy and reliability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Direct to Consumer
              </h3>
              <p className="text-gray-600 mb-6">
                In 2015, we made the decision to adopt a direct-to-consumer
                model, eliminating traditional retail markups and forging a more
                direct relationship with our customers. This approach allows us
                to offer exceptional value while maintaining the highest
                standards of quality and service.
              </p>
              <p className="text-gray-600">
                By selling directly to our customers, we're able to gather
                valuable feedback that informs our design and manufacturing
                processes. This continuous dialogue has helped us create
                timepieces that truly resonate with watch enthusiasts and
                collectors around the world.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/watch-display.png"
                alt="Watch display"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Behind every Teodinkee timepiece is a team of dedicated
              professionals who share a passion for exceptional watchmaking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="aspect-square relative rounded-full overflow-hidden w-32 h-32 mx-auto mb-6">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=128&width=128&query=${member.image}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-center mb-4">{member.title}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Visit Us</h2>
            <p className="text-lg text-gray-600">
              Experience our collections in person at one of our boutiques or
              authorized service centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location: Location) => (
              <div
                key={location.city}
                className="border rounded-lg overflow-hidden group"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=400&query=${location.image}`}
                    alt={`${location.city} Boutique`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        {location.city}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line mb-4">
                        {location.address}
                      </p>
                      <p className="text-sm text-gray-500 whitespace-pre-line">
                        {location.hours}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Experience Teodinkee
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Discover our collection of meticulously crafted timepieces and
              find the perfect watch to mark your most significant moments.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
            >
              <Link href="/products">
                Explore Our Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
