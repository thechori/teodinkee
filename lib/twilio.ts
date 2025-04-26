import twilio from "twilio";
//
import env from "../config/env.server";

export const twilioClient = twilio(env.TWILIO_SID, env.TWILIO_SECRET);
