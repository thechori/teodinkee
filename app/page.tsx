import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Package, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/product/featured-products";
import NewsletterSignup from "@/components/newsletter-signup";
import { collections } from "@/data/collections";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/elegant-timepiece.png"
            alt="Luxury watch showcase"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
              Timeless Elegance on Your Wrist
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover our curated collection of luxury timepieces crafted for
              those who appreciate the art of watchmaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-black/50 border-white text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((category) => (
              <Link
                href={`/products?category=${category.name.toLowerCase()}`}
                key={category.name}
                className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={`${category.imgUrl}?height=600&width=480`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-medium text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                    <span className="text-white flex items-center text-sm font-medium">
                      Discover <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-bold">
              Featured Timepieces
            </h2>
            <Link
              href="/products"
              className="text-sm font-medium flex items-center hover:underline"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Why Choose Teodinkee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 mb-4" />,
                title: "Authenticity Guaranteed",
                description:
                  "Every timepiece is certified authentic with documentation and a 2-year warranty."
              },
              {
                icon: <Package className="h-10 w-10 mb-4" />,
                title: "Free Global Shipping",
                description:
                  "Complimentary insured shipping on all orders with white-glove delivery service."
              },
              {
                icon: <Clock className="h-10 w-10 mb-4" />,
                title: "Expert Consultation",
                description:
                  "Our horological experts are available to help you find your perfect timepiece."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="flex justify-center text-gray-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from Blog */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-bold">
              Latest from the Blog
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium flex items-center hover:underline"
            >
              View All Articles <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Art of Mechanical Movements",
                excerpt:
                  "Exploring the intricate craftsmanship behind today's finest mechanical watch movements.",
                image: "close up of watch movement gears",
                date: "May 15, 2023",
                slug: "art-of-mechanical-movements"
              },
              {
                title: "Investing in Luxury Watches",
                excerpt:
                  "How certain timepieces have become more than accessories, but valuable investment assets.",
                image: "luxury watches displayed in collection case",
                date: "April 28, 2023",
                slug: "investing-in-luxury-watches"
              },
              {
                title: "The Rise of Independent Watchmakers",
                excerpt:
                  "Discover the small ateliers creating some of the most innovative designs in horology.",
                image: "watchmaker working at desk with tools",
                date: "April 10, 2023",
                slug: "rise-of-independent-watchmakers"
              }
            ].map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=400&width=600&query=${post.image}`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-gray-700">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <span className="text-sm font-medium flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and horological insights.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
