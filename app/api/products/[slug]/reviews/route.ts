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

    // Update review summary
    await updateReviewSummary(product.id);

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error adding product review:", error);
    return NextResponse.json(
      { error: "Failed to add product review" },
      { status: 500 }
    );
  }
}

// Helper function to update review summary
async function updateReviewSummary(productId: number) {
  try {
    // Calculate average rating and count
    const summary = await db
      .selectFrom("product_reviews")
      .select([
        db.fn.avg("rating").as("average"),
        db.fn.count("id").as("count")
      ])
      .where("product_id", "=", productId)
      .executeTakeFirst();

    if (!summary || !summary.average || !summary.count) {
      return;
    }

    // Check if summary exists
    const existingSummary = await db
      .selectFrom("product_review_summary")
      .select(["id"])
      .where("product_id", "=", productId)
      .executeTakeFirst();

    if (existingSummary) {
      // Update existing summary
      await db
        .updateTable("product_review_summary")
        .set({
          average: summary.average.toString(),
          count: Number(summary.count)
        })
        .where("id", "=", existingSummary.id)
        .execute();

      // Update breakdown
      await updateReviewBreakdown(existingSummary.id, productId);
    } else {
      // Create new summary
      const newSummary = await db
        .insertInto("product_review_summary")
        .values({
          product_id: productId,
          average: summary.average.toString(),
          count: Number(summary.count)
        })
        .returning(["id"])
        .executeTakeFirst();

      if (newSummary) {
        await updateReviewBreakdown(newSummary.id, productId);
      }
    }
  } catch (error) {
    console.error("Error updating review summary:", error);
  }
}

// Helper function to update review breakdown
async function updateReviewBreakdown(summaryId: number, productId: number) {
  try {
    // Check if summaryId is valid
    if (!summaryId) {
      console.error("Invalid summary ID");
      return;
    }

    // Get total reviews count
    const totalCount = await db
      .selectFrom("product_reviews")
      .select(db.fn.count("id").as("count"))
      .where("product_id", "=", productId)
      .executeTakeFirstOrThrow();

    // Delete existing breakdown
    await db
      .deleteFrom("product_review_breakdown")
      .where("summary_id", "=", summaryId)
      .execute();

    // Calculate breakdown for each rating (1-5)
    for (let rating = 1; rating <= 5; rating++) {
      const ratingCount = await db
        .selectFrom("product_reviews")
        .select(db.fn.count("id").as("count"))
        .where("product_id", "=", productId)
        .where("rating", "=", rating)
        .executeTakeFirstOrThrow();

      const percentage =
        Number(totalCount.count) > 0
          ? (Number(ratingCount.count) / Number(totalCount.count)) * 100
          : 0;

      await db
        .insertInto("product_review_breakdown")
        .values({
          summary_id: summaryId,
          rating,
          percentage: percentage.toString()
        })
        .execute();
    }
  } catch (error) {
    console.error("Error updating review breakdown:", error);
  }
}
