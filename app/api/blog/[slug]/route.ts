import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await db
      .selectFrom("blog_posts")
      .where("slug", "=", slug)
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
        "blog_authors.img_url as author_image",
        "blog_authors.bio as author_bio"
      ])
      .executeTakeFirst();

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post details:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post details" },
      { status: 500 }
    );
  }
}
