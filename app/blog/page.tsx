"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BlogPosts } from "kysely-codegen";
import { notFound } from "next/navigation";

const categories = [
  "All Categories",
  "Craftsmanship",
  "Investment",
  "Industry",
  "Education",
  "History",
  "Guides",
  "Interviews",
  "Events"
];

export default function BlogPage() {
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

  if (!blogPosts || blogPosts.length === 0) return notFound;

  const featuredPost = blogPosts[0];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">
            The Teodinkee Journal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and expertise from the world of fine watchmaking
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="w-full md:w-auto">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8 w-full md:w-[300px]"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category.toLowerCase().replace(" ", "-")}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
                <Image
                  src={`${featuredPost.img_url}?height=600&width=900`}
                  alt={featuredPost.img_alt || featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date().toLocaleDateString()}
                    {/* {featuredPost.published_at} */}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.read_time}
                  </span>
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-gray-700">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=40&width=40&`}
                      alt="photo of author"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">
                    Some Author
                    {/* {featuredPost.author.name} */}
                  </span>
                </div>
                <Button className="group-hover:bg-gray-800">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>

        <Separator className="mb-16" />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden group">
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/9] relative">
                  <Image
                    src={`${featuredPost.img_url}?height=600&width=900`}
                    alt={featuredPost.img_alt || featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-gray-100 rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.read_time}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-gray-700">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                    {/* {post.date} */}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-sm font-medium flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled>
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              8
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
