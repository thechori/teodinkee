import { NextRequest, NextResponse } from "next/server";
//

// send sms to customer about flash deal
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // get customers enrolled from db

    // send all customers sms
  } catch (error: any) {
    console.error("[GET /demo] Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
