import env from "@/config/env.server";
import { twilioClient } from "@/lib/twilio";
import { NextResponse } from "next/server";
//

// send voice call message to customer about flash deal
export async function GET() {
  try {
    // get customers enrolled from db

    const twiml = `<Response>
        <Say voice="Polly.Joanna">"IT'S ON! Your weekly Teodinkee flash coupon is live for the next hour. Hurry up and claim it now! 5% off with code 'FS12251'</Say>
        <Hangup/>
     </Response>`;

    //  NOTE: 500 - VOICE CALLING DEACTIVATED FOR MY ACCOUNT
    const call = await twilioClient.calls.create({
      to: "+18326460869",
      from: env.TWILIO_SENDER_PHONE_NUMBER, // Twilio provided number
      twiml
    });

    console.log("call.sid: ", call.sid);
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.error("[GET /demo] Error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
