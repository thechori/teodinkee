import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get current user profile
export async function GET() {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const user = await db
    //   .selectFrom("users")
    //   .select(["id", "email", "display_name", "bio", "created_at"])
    //   .where("email", "=", session.user.email)
    //   .executeTakeFirst();

    // if (!user) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    // return NextResponse.json(user);
    return NextResponse.json("hi");
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
