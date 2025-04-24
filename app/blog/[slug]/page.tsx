import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// Mock blog post data
const post = {
  title: "The Art of Mechanical Movements",
  excerpt:
    "Exploring the intricate craftsmanship behind today's finest mechanical watch movements and the centuries of tradition they represent.",
  content: [
    "The mechanical watch movement is often described as a miniature universe of gears, springs, and levers working in perfect harmony. Unlike their quartz counterparts, mechanical movements don't rely on batteries but instead harness energy through either manual winding or the natural motion of the wearer's wrist in automatic watches.",
    "At the heart of every mechanical watch lies the mainspring, a coiled strip of metal that stores energy when wound. As the mainspring gradually unwinds, it transfers energy through a series of gears known as the gear train, which ultimately powers the watch hands. The escapement, a complex mechanism consisting of the escape wheel and pallet fork, regulates this energy release, ensuring the watch keeps accurate time.",
    "What makes mechanical movements truly remarkable is not just their functionality but the level of craftsmanship involved in their creation. High-end movements are often decorated with traditional finishing techniques such as Côtes de Genève (Geneva stripes), perlage (circular graining), and anglage (beveled edges). These decorative elements aren't merely aesthetic—they often serve practical purposes like reducing friction or preventing dust accumulation.",
    "The complexity of a mechanical movement is often measured by the number of 'jewels' it contains. These synthetic rubies or sapphires serve as bearings at points of friction, reducing wear and improving accuracy. A basic mechanical movement might contain 17 jewels, while more complex ones with additional complications can have 50 or more.",
    "In today's world of mass production, the preservation of traditional watchmaking techniques represents a commitment to craftsmanship that transcends mere timekeeping. Master watchmakers spend years perfecting their skills, and many of the techniques used today have remained largely unchanged for centuries.",
    "The most prestigious watch manufacturers often produce their movements entirely in-house, controlling every aspect of the process from design to assembly. These 'manufacture' movements are highly prized by collectors for their exclusivity and the direct connection they provide to the brand's heritage and expertise.",
    "Despite the dominance of quartz technology and the rise of smartwatches, mechanical movements continue to captivate enthusiasts worldwide. There's something profoundly appealing about wearing a piece of engineering that operates on purely mechanical principles, requiring no electronics or batteries—just the precision arrangement of components working together in perfect synchrony.",
    "As we look to the future, innovations in materials science and manufacturing techniques continue to enhance the performance of mechanical movements. Silicon components, for instance, offer improved resistance to magnetism and require no lubrication. Yet even as technology advances, the fundamental principles and the artistry behind mechanical watchmaking remain a testament to human ingenuity and craftsmanship."
  ],
  image: "close up of watch movement gears",
  date: "May 15, 2023",
  readTime: "6 min read",
  category: "Craftsmanship",
  author: {
    name: "Elizabeth Chen",
    bio: "Horological expert with over 15 years of experience in the luxury watch industry. Former technical editor at Timepiece Quarterly.",
    image: "professional female portrait with dark hair"
  },
  relatedPosts: [
    {
      title: "Understanding Watch Complications",
      excerpt:
        "A comprehensive guide to watch complications, from simple date displays to intricate perpetual calendars and minute repeaters.",
      image: "complicated watch movement showing multiple complications",
      date: "March 22, 2023",
      slug: "understanding-watch-complications"
    },
    {
      title: "The Rise of Independent Watchmakers",
      excerpt:
        "Discover the small ateliers creating some of the most innovative designs in horology, challenging the dominance of established brands.",
      image: "watchmaker working at desk with tools",
      date: "April 10, 2023",
      slug: "rise-of-independent-watchmakers"
    },
    {
      title: "Watch Care and Maintenance",
      excerpt:
        "Essential tips for keeping your timepiece in perfect condition, from daily care to professional servicing schedules.",
      image: "watch being serviced by watchmaker",
      date: "February 18, 2023",
      slug: "watch-care-maintenance"
    }
  ]
};

export default function BlogPostPage() {
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
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
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
                src={`/abstract-geometric-shapes.png?height=48&width=48&query=${post.author.image}`}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
            <Image
              src={`/abstract-geometric-shapes.png?height=800&width=1200&query=${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
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
                  src={`/abstract-geometric-shapes.png?height=96&width=96&query=${post.author.image}`}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-center sm:text-left">
                  {post.author.name}
                </h3>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {post.relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.slug} className="overflow-hidden group">
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=400&width=600&query=${relatedPost.image}`}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="group-hover:text-gray-700 text-lg">
                      {relatedPost.title}
                    </CardTitle>
                    <p className="text-xs text-gray-500">{relatedPost.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm font-medium flex items-center">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
