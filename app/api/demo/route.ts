import env from "@/config/env.server";
import { twilioClient } from "@/lib/twilio";
import { NextRequest, NextResponse } from "next/server";
//

// send sms to customer about flash deal
export async function GET(request: NextRequest) {
  console.log("GET api/demo - sending from: ", env.TWILIO_SENDER_PHONE_NUMBER);
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // get customers enrolled from db

    // send all customers sms
    const res = await twilioClient.messages.create({
      body: "Hello from twilio-node",
      to: "+18326460869",
      from: env.TWILIO_SENDER_PHONE_NUMBER // Twilio provided number
    });

    console.log("id: ", res);
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.error("[GET /demo] Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
