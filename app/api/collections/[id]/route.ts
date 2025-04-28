import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // await the params promise to get your route params
    const { id } = await params;
    const collectionId = Number.parseInt(id, 10);

    // Fetch the collection
    const collection = await db
      .selectFrom("collections")
      .select(["id", "name", "description", "img_url", "img_alt"])
      .where("id", "=", collectionId)
      .executeTakeFirst();

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Fetch products in this collection
    const productIds = await db
      .selectFrom("collection_products")
      .select("product_id")
      .where("collection_id", "=", collectionId)
      .execute();

    const products =
      productIds.length > 0
        ? await db
            .selectFrom("products")
            .select([
              "id",
              "name",
              "brand",
              "price",
              "img_url",
              "img_alt",
              "slug",
              "category"
            ])
            .where(
              "id",
              "in",
              productIds.map((p) => p.product_id)
            )
            .execute()
        : [];

    return NextResponse.json({
      ...collection,
      products
    });
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection details" },
      { status: 500 }
    );
  }
}
