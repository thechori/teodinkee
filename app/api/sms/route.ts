import env from "@/config/env.server";
import { twilioClient } from "@/lib/twilio";
import { NextResponse } from "next/server";
//

// send sms to customer about flash deal
export async function GET() {
  console.log("GET api/demo - sending from: ", env.TWILIO_SENDER_PHONE_NUMBER);
  try {
    // get customers enrolled from db

    // send all customers sms
    const res = await twilioClient.messages.create({
      body: "IT'S ON! Your weekly Teodinkee flash coupon is live for the next hour. Hurry up and claim it now! 5% off with code 'FS12251'",
      to: "",
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
