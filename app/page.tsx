import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Package, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/product/featured-products";
import NewsletterSignup from "@/components/newsletter-signup";
import LatestBlogPosts from "@/components/blog-posts/latest-blog-posts";
import FeaturedCollections from "@/components/collections/featured-collections";

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
          <div>
            <FeaturedCollections />
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
          <div>
            <LatestBlogPosts />
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
