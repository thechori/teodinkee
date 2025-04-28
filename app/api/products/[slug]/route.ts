import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get the product with all its details (now in a single table)
    const product = await db
      .selectFrom("products")
      .select([
        "id",
        "name",
        "brand",
        "price",
        "description",
        "img_url",
        "img_alt",
        "slug",
        "category",
        "features",
        "images",
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
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get reviews for the product
    const reviews = await db
      .selectFrom("product_reviews")
      .select(["id", "author", "title", "description", "rating", "created_at"])
      .where("product_id", "=", product.id)
      .orderBy("created_at", "desc")
      .limit(5)
      .execute();

    // Calculate review statistics
    const reviewStats = await db
      .selectFrom("product_reviews")
      .select([
        db.fn.avg("rating").as("average"),
        db.fn.count("id").as("count")
      ])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Calculate review breakdown
    const reviewBreakdown = [];
    if (reviewStats && Number(reviewStats.count) > 0) {
      for (let rating = 1; rating <= 5; rating++) {
        const ratingCount = await db
          .selectFrom("product_reviews")
          .select(db.fn.count("id").as("count"))
          .where("product_id", "=", product.id)
          .where("rating", "=", rating)
          .executeTakeFirstOrThrow();

        const percentage =
          Number(reviewStats.count) > 0
            ? (Number(ratingCount.count) / Number(reviewStats.count)) * 100
            : 0;

        reviewBreakdown.push({
          rating,
          percentage: percentage.toString()
        });
      }
    }

    // Format the response
    const specifications = {
      case_diameter: product.case_diameter,
      case_thickness: product.case_thickness,
      case_material: product.case_material,
      dial_color: product.dial_color,
      crystal: product.crystal,
      movement: product.movement,
      power_reserve: product.power_reserve,
      water_resistance: product.water_resistance,
      bracelet_or_strap: product.bracelet_or_strap,
      clasp: product.clasp,
      functions: product.functions
    };

    return NextResponse.json({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      img_url: product.img_url,
      img_alt: product.img_alt,
      slug: product.slug,
      category: product.category,
      features: product.features || [],
      images: product.images || [product.img_url],
      specifications,
      reviews: {
        items: reviews,
        average: reviewStats?.average || "0",
        count: Number(reviewStats?.count || 0),
        breakdown: reviewBreakdown
      }
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}

/**
 * async function getProduct(slug: string) {
  try {
    // Get the product with all its details (now in a single table)
    const product = await db
      .selectFrom("products")
      .selectAll()
      .where("slug", "=", slug)
      .executeTakeFirst();

    if (!product) {
      return null;
    }

    // Get reviews for the product
    const reviews = await db
      .selectFrom("product_reviews")
      .select(["id", "author", "title", "description", "rating", "created_at"])
      .where("product_id", "=", product.id)
      .orderBy("created_at", "desc")
      .limit(5)
      .execute();

    // Calculate review statistics
    const reviewStats = await db
      .selectFrom("product_reviews")
      .select([
        db.fn.avg("rating").as("average"),
        db.fn.count("id").as("count")
      ])
      .where("product_id", "=", product.id)
      .executeTakeFirst();

    // Calculate review breakdown
    const reviewBreakdown = [];
    if (reviewStats && Number(reviewStats.count) > 0) {
      for (let rating = 1; rating <= 5; rating++) {
        const ratingCount = await db
          .selectFrom("product_reviews")
          .select(db.fn.count("id").as("count"))
          .where("product_id", "=", product.id)
          .where("rating", "=", rating)
          .executeTakeFirstOrThrow();

        const percentage =
          Number(reviewStats.count) > 0
            ? (Number(ratingCount.count) / Number(reviewStats.count)) * 100
            : 0;

        reviewBreakdown.push({
          rating,
          percentage: percentage.toString()
        });
      }
    }

    // Format the specifications
    const specifications = {
      case_diameter: product.case_diameter,
      case_thickness: product.case_thickness,
      case_material: product.case_material,
      dial_color: product.dial_color,
      crystal: product.crystal,
      movement: product.movement,
      power_reserve: product.power_reserve,
      water_resistance: product.water_resistance,
      bracelet_or_strap: product.bracelet_or_strap,
      clasp: product.clasp,
      functions: product.functions
    };

    return {
      ...product,
      features: product.features || [],
      images: product.images || [product.img_url],
      specifications,
      reviews: {
        items: reviews,
        average: reviewStats?.average || "0",
        count: Number(reviewStats?.count || 0),
        breakdown: reviewBreakdown
      }
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
 */
