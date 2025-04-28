"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter
} from "lucide-react";
//
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { notFound, useParams } from "next/navigation";
import { BlogPosts } from "kysely-codegen";
import { analytics, segmentEvents } from "@/lib/analytics";
import { useEffect, useState } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPosts | null>(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchPostBySlug = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();
        setPost(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPostBySlug();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!post) {
    notFound();
  }

  analytics.track(segmentEvents.ARTICLE_VIEWED, post);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-gray-100 px-2.5 py-0.5 rounded text-xs font-medium">
              {post.category}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.read_time}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full overflow-hidden relative">
              <Image
                src={`${post.img_url}?height=48&width=48`}
                alt={post.img_alt || post.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">Some Author Name</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
            <Image
              src={`${post.img_url}?height=800&width=1200`}
              alt={post.img_alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="prose prose-lg max-w-none">{post.content}</div>
        </div>

        {/* Share Links */}
        <div className="max-w-3xl mx-auto mb-12">
          <Separator className="mb-6" />
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Share this article:</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
            </div>
          </div>
          <Separator className="mt-6" />
        </div>

        {/* Author Bio */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="h-24 w-24 rounded-full overflow-hidden relative flex-shrink-0">
                <Image
                  src={`/abstract-geometric-shapes.png?height=96&width=96&`}
                  alt="picture of the author"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-center sm:text-left">
                  Some Author Name
                </h3>
                <p className="text-gray-600">(Some Author Bio)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
