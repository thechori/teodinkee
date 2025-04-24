"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart, ShoppingCart, Star } from "lucide-react";
//
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { analytics, segmentEvents } from "@/lib/analytics";
import { productDetails as product } from "@/data/product-details";

export default function ProductDetailPage() {
  // Track event
  analytics.track(segmentEvents.PRODUCT_VIEWED, {
    product_id: "1234",
    name: "Teodinkee DiveMaster 300",
    category: "Dive Watches",
    price: 499,
    currency: "USD"
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all watches
          </Link>
        </div>

        {/* Product Detail */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <Tabs defaultValue="image-0" className="w-full">
                <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                  {product.images.map((image, index) => (
                    <TabsContent
                      key={`image-${index}`}
                      value={`image-${index}`}
                      className="m-0"
                    >
                      <Image
                        src={`/abstract-geometric-shapes.png?height=800&width=800&query=${image}`}
                        alt={`${product.name} - View ${index + 1}`}
                        width={800}
                        height={800}
                        className="object-cover w-full h-full"
                      />
                    </TabsContent>
                  ))}
                </div>
                <TabsList className="grid grid-cols-4 gap-2 h-auto bg-transparent">
                  {product.images.map((image, index) => (
                    <TabsTrigger
                      key={`thumb-${index}`}
                      value={`image-${index}`}
                      className="aspect-square p-0 rounded-md overflow-hidden data-[state=active]:border-2 data-[state=active]:border-black"
                    >
                      <Image
                        src={`/abstract-geometric-shapes.png?height=120&width=120&query=${image}`}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        width={120}
                        height={120}
                        className="object-cover w-full h-full"
                      />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-serif font-bold mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.reviews.average)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.reviews.average} ({product.reviews.count} reviews)
              </span>
            </div>
            <p className="text-2xl font-medium mb-6">
              ${product.price.toLocaleString()}
            </p>

            <p className="text-gray-700 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key}>
                          <p className="text-sm text-gray-500">{key}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    Free worldwide shipping on all orders over $2,000.
                  </p>
                  <p className="mb-4">
                    Delivery typically takes 2-5 business days depending on your
                    location.
                  </p>
                  <p>
                    If you're not completely satisfied with your purchase, you
                    can return it within 30 days for a full refund.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warranty">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    All Teodinkee watches come with a 2-year international
                    warranty covering manufacturing defects.
                  </p>
                  <p>Extended warranty options are available at checkout.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-8">
            Customer Reviews
          </h2>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Review Summary */}
            <div className="md:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold mb-2">
                    {product.reviews.average}
                  </p>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.reviews.average)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500">
                    Based on {product.reviews.count} reviews
                  </p>
                </div>

                <div className="space-y-2">
                  {product.reviews.breakdown.map((item) => (
                    <div key={item.rating} className="flex items-center gap-2">
                      <div className="flex items-center w-16">
                        <span className="text-sm">{item.rating} star</span>
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-sm text-gray-500">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review List - In a real app, these would be actual reviews */}
            <div className="md:w-2/3">
              <div className="space-y-6">
                {[
                  {
                    name: "James Wilson",
                    date: "March 15, 2023",
                    rating: 5,
                    title: "Exceptional craftsmanship",
                    content:
                      "I've been collecting watches for over a decade, and the Chronograph Master stands out as one of the finest timepieces in my collection. The attention to detail is remarkable, and the movement is incredibly accurate. Worth every penny."
                  },
                  {
                    name: "Sarah Johnson",
                    date: "February 3, 2023",
                    rating: 5,
                    title: "Stunning design, perfect size",
                    content:
                      "This watch has exceeded all my expectations. The blue dial catches the light beautifully, and the 42mm case size is perfect for my wrist. I've received numerous compliments since purchasing it. The chronograph function is smooth and precise."
                  },
                  {
                    name: "Michael Chen",
                    date: "January 22, 2023",
                    rating: 4,
                    title: "Great watch, slightly heavy",
                    content:
                      "The quality and craftsmanship are excellent. My only minor complaint is that the bracelet is a bit heavier than I expected. After wearing it for a few days, I got used to the weight. The movement is accurate and the chronograph works flawlessly."
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{review.title}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {review.name} - {review.date}
                    </p>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                href={`/products/${relatedProduct.slug}`}
                key={relatedProduct.id}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=600&width=600&query=${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium group-hover:text-gray-700">
                    {relatedProduct.name}
                  </h3>
                  <p className="font-medium">
                    ${relatedProduct.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
