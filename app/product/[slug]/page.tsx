import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart, ShoppingCart, Star } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import ProductReviews from "@/components/product/product-reviews";
import RelatedProducts from "@/components/product/related-products";

async function getProduct(slug: string) {
  try {
    // Get the product with all its details (now in a single table)
    const product = await db
      .selectFrom("products")
      .select([
        "id",
        "name",
        "brand",
        "price",
        "description",
        "image_url",
        "image_alt",
        "slug",
        "category",
        "features",
        "images",
        "case_diameter",
        "case_thickness",
        "case_material",
        "dial_color",
        "crystal",
        "movement",
        "power_reserve",
        "water_resistance",
        "bracelet_or_strap",
        "clasp",
        "functions"
      ])
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return null;
    }

    // Get reviews for the product
    const reviews = await db
      .selectFrom("product_reviews")
      .select(["id", "author", "title", "description", "rating", "created_at"])
      .where("product_id", "=", product.id)
      .orderBy("created_at", "desc")
      .limit(5)
      .execute();

    // Calculate review statistics
    const reviewStats = await db
      .selectFrom("product_reviews")
      .select([
        db.fn.avg("rating").as("average"),
        db.fn.count("id").as("count")
      ])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Calculate review breakdown
    const reviewBreakdown = [];
    if (reviewStats && Number(reviewStats.count) > 0) {
      for (let rating = 1; rating <= 5; rating++) {
        const ratingCount = await db
          .selectFrom("product_reviews")
          .select(db.fn.count("id").as("count"))
          .where("product_id", "=", product.id)
          .where("rating", "=", rating)
          .executeTakeFirstOrThrow();

        const percentage =
          Number(reviewStats.count) > 0
            ? (Number(ratingCount.count) / Number(reviewStats.count)) * 100
            : 0;

        reviewBreakdown.push({
          rating,
          percentage: percentage.toString()
        });
      }
    }

    // Format the specifications
    const specifications = {
      case_diameter: product.case_diameter,
      case_thickness: product.case_thickness,
      case_material: product.case_material,
      dial_color: product.dial_color,
      crystal: product.crystal,
      movement: product.movement,
      power_reserve: product.power_reserve,
      water_resistance: product.water_resistance,
      bracelet_or_strap: product.bracelet_or_strap,
      clasp: product.clasp,
      functions: product.functions
    };

    return {
      ...product,
      features: product.features || [],
      images: product.images || [product.image_url],
      specifications,
      reviews: {
        items: reviews,
        average: reviewStats?.average || "0",
        count: Number(reviewStats?.count || 0),
        breakdown: reviewBreakdown
      }
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const productImages = product.images || [product.image_url];
  const features = product.features || [];

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
                  {productImages.map((image: any, index: number) => (
                    <TabsContent
                      key={`image-${index}`}
                      value={`image-${index}`}
                      className="m-0"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - View ${index + 1}`}
                        width={800}
                        height={800}
                        className="object-cover w-full h-full"
                      />
                    </TabsContent>
                  ))}
                </div>
                <TabsList className="grid grid-cols-4 gap-2 h-auto bg-transparent">
                  {productImages.map((image: any, index: number) => (
                    <TabsTrigger
                      key={`thumb-${index}`}
                      value={`image-${index}`}
                      className="aspect-square p-0 rounded-md overflow-hidden data-[state=active]:border-2 data-[state=active]:border-black"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
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
                      i < Math.floor(Number(product.reviews.average))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {Number(product.reviews.average).toFixed(1)} (
                {product.reviews.count} reviews)
              </span>
            </div>
            <p className="text-2xl font-medium mb-6">
              ${(product.price / 100).toLocaleString()}
            </p>

            <p className="text-gray-700 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {features.map((feature: any, index: number) => (
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
                    {product.specifications &&
                      Object.entries(product.specifications)
                        .filter(([_, value]) => value !== null)
                        .map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-gray-500">
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
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
        {/* <ProductReviews
          productId={product.id}
          reviewSummary={product.reviews}
        /> */}

        <Separator className="my-16" />

        {/* Related Products */}
        <RelatedProducts productId={product.id} />
      </div>
    </div>
  );
}
