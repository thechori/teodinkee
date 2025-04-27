import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get the product
    const product = await db
      .selectFrom("products")
      .select([
        "id",
        "name",
        "brand",
        "price",
        "description",
        "image_url",
        "image_alt",
        "slug",
        "category"
      ])
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get product details
    const details = await db
      .selectFrom("product_details")
      .select(["features", "images"])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Get product specifications
    const specifications = await db
      .selectFrom("product_specifications")
      .select([
        "case_diameter",
        "case_thickness",
        "case_material",
        "dial_color",
        "crystal",
        "movement",
        "power_reserve",
        "water_resistance",
        "bracelet_or_strap",
        "clasp",
        "functions"
      ])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Get review summary
    const reviewSummary = await db
      .selectFrom("product_review_summary")
      .select(["average", "count"])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Get review breakdown
    const reviewBreakdown = reviewSummary
      ? await db
          .selectFrom("product_review_breakdown")
          .select(["rating", "percentage"])
          .where("summary_id", "=", reviewSummary.id)
          .execute()
      : [];

    // Get related products
    const relatedProductIds = await db
      .selectFrom("related_products")
      .select(["related_product_id"])
      .where("product_id", "=", product.id)
      .execute();

    const relatedProducts =
      relatedProductIds.length > 0
        ? await db
            .selectFrom("products")
            .select(["id", "name", "price", "image_url", "image_alt", "slug"])
            .where(
              "id",
              "in",
              relatedProductIds.map((rp) => rp.related_product_id)
            )
            .execute()
        : [];

    return NextResponse.json({
      ...product,
      details,
      specifications,
      reviews: {
        average: reviewSummary?.average || 0,
        count: reviewSummary?.count || 0,
        breakdown: reviewBreakdown
      },
      relatedProducts
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
