"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BlogPosts } from "kysely-codegen";

const FeaturedBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch blogPosts");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error loading featured blogPosts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        blogPosts
          ?.filter((p) => p.featured)
          .map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={`${post.img_url}?height=400&width=600`}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 bg-white">
                {/* <p className="text-sm text-gray-500 mb-2">{post.published_at ? new Date(post.published_at)}</p> */}
                <h3 className="text-xl font-medium mb-2 group-hover:text-gray-700">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-sm font-medium flex items-center">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))
      )}
    </div>
  );
};

export default FeaturedBlogPosts;
