import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number.parseInt(params.id);

    // Get related product IDs
    const relatedProductIds = await db
      .selectFrom("related_products")
      .select(["related_product_id"])
      .where("product_id", "=", productId)
      .execute();

    if (relatedProductIds.length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Get related products
    const relatedProducts = await db
      .selectFrom("products")
      .select(["id", "name", "price", "image_url", "image_alt", "slug"])
      .where((eb) =>
        eb.or(
          relatedProductIds.map((rp) => eb("id", "=", rp.related_product_id))
        )
      )
      .limit(3)
      .execute();

    // Format prices from cents to dollars
    const formattedProducts = relatedProducts.map((product) => ({
      ...product,
      price: product.price / 100
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 }
    );
  }
}
