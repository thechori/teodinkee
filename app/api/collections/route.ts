import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get the collections
    const collections = await db
      .selectFrom("collections")
      .selectAll()
      .execute();

    if (!collections) {
      return NextResponse.json(
        { error: "Collections not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}
