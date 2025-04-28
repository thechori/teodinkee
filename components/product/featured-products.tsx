"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Products } from "kysely-codegen";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Products[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
      toast("Removed from wishlist");
    } else {
      setWishlist([...wishlist, id]);
      toast("Added to wishlist");
    }
  };

  const addToCart = (name: string) => {
    toast.success("Added to cart", {
      description: `${name} has been added to your cart.`
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square rounded-lg bg-gray-200 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products
        .filter((p) => p.featured)
        .map((product) => (
          // @ts-ignore
          <div key={product.id} className="group relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.img_url || "/placeholder.svg"}
                  alt={product.img_alt || product.name}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
                // @ts-ignore
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    // @ts-ignore
                    wishlist.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
            <div>
              <Link href={`/products/${product.slug}`} className="block">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              </Link>
              <div className="flex justify-between items-center">
                <p className="font-medium">${product.price.toLocaleString()}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => addToCart(product.name)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
