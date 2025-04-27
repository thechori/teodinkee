import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number.parseInt(session.user.id);
    const orderId = Number.parseInt(params.id);

    // Get order
    const order = await db
      .selectFrom("orders")
      .select([
        "id",
        "created_at",
        "status",
        "total_price_in_cents",
        "tracking_number",
        "notes"
      ])
      .where("id", "=", orderId)
      .where("user_id", "=", userId)
      .executeTakeFirst();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get order items
    const items = await db
      .selectFrom("order_products")
      .innerJoin("products", "products.id", "order_products.product_id")
      .select([
        "products.id",
        "products.name",
        "products.image_url",
        "products.slug",
        "order_products.quantity",
        "order_products.price_at_purchase_in_cents"
      ])
      .where("order_products.order_id", "=", orderId)
      .execute();

    return NextResponse.json({
      ...order,
      items
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
