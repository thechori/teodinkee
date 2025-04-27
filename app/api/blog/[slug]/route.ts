import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get the blog post
    const post = await db
      .selectFrom("blog_posts")
      .leftJoin("blog_authors", "blog_authors.id", "blog_posts.author_id")
      .select([
        "blog_posts.id",
        "blog_posts.title",
        "blog_posts.content",
        "blog_posts.excerpt",
        "blog_posts.slug",
        "blog_posts.image_url",
        "blog_posts.image_alt",
        "blog_posts.published_at",
        "blog_posts.read_time",
        "blog_posts.category",
        "blog_authors.id as author_id",
        "blog_authors.name as author_name",
        "blog_authors.image as author_image",
        "blog_authors.bio as author_bio"
      ])
      .where("blog_posts.slug", "=", slug)
      .executeTakeFirst();

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Get related posts
    const relatedPostIds = await db
      .selectFrom("related_blog_posts")
      .select(["related_post_id"])
      .where("blog_post_id", "=", post.id)
      .execute();

    const relatedPosts =
      relatedPostIds.length > 0
        ? await db
            .selectFrom("blog_posts")
            .select([
              "id",
              "title",
              "excerpt",
              "slug",
              "image_url",
              "image_alt",
              "published_at",
              "read_time"
            ])
            .where(
              "id",
              "in",
              relatedPostIds.map((rp) => rp.related_post_id)
            )
            .execute()
        : [];

    return NextResponse.json({
      ...post,
      relatedPosts
    });
  } catch (error) {
    console.error("Error fetching blog post details:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post details" },
      { status: 500 }
    );
  }
}
