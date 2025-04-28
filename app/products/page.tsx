import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import { notFound } from "next/navigation";
//
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { db } from "@/lib/db";

async function getProducts() {
  try {
    const products = await db.selectFrom("products").selectAll().execute();

    if (!products) {
      return null;
    }

    return products;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Our Collection</h1>
          <p className="text-gray-600">
            Discover our curated selection of fine timepieces
          </p>
        </div>

        {/* Filters and Products Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {["All", "Luxury", "Sport", "Classic"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.toLowerCase()}`} />
                      <label
                        htmlFor={`category-${category.toLowerCase()}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider defaultValue={[0, 75]} max={100} step={1} />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>$0</span>
                    <span>$15,000+</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Movement</h3>
                <div className="space-y-2">
                  {["Automatic", "Mechanical", "Quartz", "Solar"].map(
                    (movement) => (
                      <div
                        key={movement}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`movement-${movement.toLowerCase()}`} />
                        <label
                          htmlFor={`movement-${movement.toLowerCase()}`}
                          className="text-sm cursor-pointer"
                        >
                          {movement}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Case Material</h3>
                <div className="space-y-2">
                  {[
                    "Stainless Steel",
                    "Gold",
                    "Titanium",
                    "Ceramic",
                    "Bronze"
                  ].map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      />
                      <label
                        htmlFor={`material-${material
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="text-sm cursor-pointer"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Features</h3>
                <div className="space-y-2">
                  {[
                    "Chronograph",
                    "Date Display",
                    "Moon Phase",
                    "GMT",
                    "Tourbillon"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      />
                      <label
                        htmlFor={`feature-${feature
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="text-sm cursor-pointer"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>

          {/* Products and Mobile Filters */}
          <div className="flex-1">
            {/* Mobile Filters */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your watch selection
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    {/* Mobile filter options - same as desktop */}
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {["All", "Luxury", "Sport", "Classic"].map(
                          (category) => (
                            <div
                              key={category}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-category-${category.toLowerCase()}`}
                              />
                              <label
                                htmlFor={`mobile-category-${category.toLowerCase()}`}
                                className="text-sm cursor-pointer"
                              >
                                {category}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    {/* More mobile filters... */}
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={`${product.img_url}?height=600&width=600`}
                      alt={product.img_alt || product.name}
                      width={600}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium group-hover:text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.brand}
                    </p>
                    <p className="font-medium">
                      ${(product.price / 100).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
