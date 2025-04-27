import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";
    const limit = Number.parseInt(searchParams.get("limit") || "12");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    let query = db
      .selectFrom("products")
      .select([
        "id",
        "name",
        "brand",
        "price",
        "image_url",
        "image_alt",
        "slug",
        "category"
      ]);

    if (category) {
      query = query.where("category", "=", category);
    }

    // For featured products, we could have a featured flag in the database
    // For now, just return the first few products

    const products = await query
      .limit(limit)
      .offset(offset)
      .orderBy("id", "asc")
      .execute();

    // Count total products for pagination
    let countQuery = db
      .selectFrom("products")
      .select(db.fn.count("id").as("count"));

    if (category) {
      countQuery = countQuery.where("category", "=", category);
    }

    const totalCount = await countQuery.executeTakeFirstOrThrow();

    // Format prices from cents to dollars for display
    const formattedProducts = products.map((product) => ({
      ...product,
      price: product.price / 100 // Convert cents to dollars
    }));

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        total: Number(totalCount.count),
        page,
        limit,
        totalPages: Math.ceil(Number(totalCount.count) / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
