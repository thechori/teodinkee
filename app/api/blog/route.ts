import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const posts = await db
      .selectFrom("blog_posts")
      .leftJoin("blog_authors", "blog_authors.id", "blog_posts.author_id")
      .select([
        "blog_posts.id",
        "blog_posts.title",
        "blog_posts.content",
        "blog_posts.excerpt",
        "blog_posts.slug",
        "blog_posts.img_url",
        "blog_posts.img_alt",
        "blog_posts.published_at",
        "blog_posts.read_time",
        "blog_posts.category",
        "blog_posts.featured",
        "blog_authors.id as author_id",
        "blog_authors.name as author_name",
        "blog_authors.img_url as author_image", // Changed from image to img_url
        "blog_authors.bio as author_bio"
      ])
      .execute();

    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { error: "Blog posts not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog post details:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post details" },
      { status: 500 }
    );
  }
}
