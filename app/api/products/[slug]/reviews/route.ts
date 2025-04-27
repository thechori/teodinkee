import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    // Get product ID from slug
    const product = await db
      .selectFrom("products")
      .select(["id"])
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get reviews
    const reviews = await db
      .selectFrom("product_reviews")
      .select(["id", "title", "description", "rating", "author", "created_at"])
      .where("product_id", "=", product.id)
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc")
      .execute();

    // Get total count
    const totalCount = await db
      .selectFrom("product_reviews")
      .select(db.fn.count("id").as("count"))
      .where("product_id", "=", product.id)
      .executeTakeFirstOrThrow();

    return NextResponse.json({
      reviews,
      pagination: {
        total: Number(totalCount.count),
        page,
        limit,
        totalPages: Math.ceil(Number(totalCount.count) / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch product reviews" },
      { status: 500 }
    );
  }
}

// Add a review
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;
    const data = await request.json();
    const { title, description, rating } = data;

    if (!title || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid review data" },
        { status: 400 }
      );
    }

    // Get product ID from slug
    const product = await db
      .selectFrom("products")
      .select(["id"])
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Add review
    const review = await db
      .insertInto("product_reviews")
      .values({
        product_id: product.id,
        title,
        description: description || null,
        rating,
        author: session.user.name
      })
      .returning([
        "id",
        "title",
        "description",
        "rating",
        "author",
        "created_at"
      ])
      .executeTakeFirst();

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error adding product review:", error);
    return NextResponse.json(
      { error: "Failed to add product review" },
      { status: 500 }
    );
  }
}
