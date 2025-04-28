"use client";

import { Collections } from "kysely-codegen";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturedCollections = () => {
  const [collections, setCollections] = useState<Collections[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load collections
  useEffect(() => {
    const loadCollections = async () => {
      try {
        const response = await fetch("/api/collections");
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        setCollections(data);
        console.log("dataz", data);
      } catch (error) {
        console.error("Error loading featured collections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollections();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        collections.map((category) => (
          <Link
            href={`/products?category=${category.name.toLowerCase()}`}
            key={category.name}
            className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/5] relative">
              <Image
                src={`${category.img_url}?height=600&width=480`}
                alt={category.img_alt || "watch collection image"}
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
        ))
      )}
    </div>
  );
};

export default FeaturedCollections;
