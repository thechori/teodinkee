"use client";

import type React from "react";

import { useState } from "react";
import { Bell, MessageSquare, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { sendSms } from "@/app/actions/send-sms"
import { toast } from "sonner";

type SmsType = "weekly-promo" | "weekly-ad" | "cart-reminder";

type SmsOption = {
  id: SmsType;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function AdminSmsPanel() {
  const [sending, setSending] = useState<SmsType | null>(null);
  const [lastSent, setLastSent] = useState<{
    type: SmsType;
    recipients: number;
    messagePreview: string;
    sentAt: string;
  } | null>(null);

  const smsOptions: SmsOption[] = [
    {
      id: "weekly-promo",
      title: "Weekly Flash Promo",
      description: "Send a flash sale promotion to all subscribed customers",
      icon: <Bell className="h-5 w-5" />
    },
    {
      id: "weekly-ad",
      title: "Weekly Ad",
      description: "Send weekly advertisement featuring new products",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      id: "cart-reminder",
      title: "Forgot Something In Your Cart?",
      description: "Remind customers about items left in their shopping cart",
      icon: <ShoppingCart className="h-5 w-5" />
    }
  ];

  async function handleSendSms(smsType: SmsType) {
    setSending(smsType);

    const formData = new FormData();
    formData.append("smsType", smsType);

    try {
      // const result = await sendSms(formData)

      toast.success("sms sent!");

      // if (result.success) {
      // toast.success(result.message)
      //   if (result.details) {
      //     setLastSent({
      //       type: smsType,
      //       recipients: result.details.recipients,
      //       messagePreview: result.details.messagePreview,
      //       sentAt: result.details.sentAt,
      //     })
      //   }
      // } else {
      //   toast.error(result.message)
      // }
    } catch (error) {
      toast.error(
        `Failed to send SMS: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSending(null);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {smsOptions.map((option) => (
        <Card key={option.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {option.icon}
              <CardTitle>{option.title}</CardTitle>
            </div>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              {option.id === "weekly-promo" &&
                "Sends a time-limited promotion to drive immediate sales."}
              {option.id === "weekly-ad" &&
                "Highlights new arrivals and featured products for the week."}
              {option.id === "cart-reminder" &&
                "Targets customers who abandoned their shopping carts."}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleSendSms(option.id)}
              disabled={sending !== null}
            >
              {sending === option.id ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Sending...
                </>
              ) : (
                `Send ${option.title}`
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {lastSent && (
        <div className="col-span-1 md:col-span-3 mt-6">
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle className="text-green-800">
              SMS Campaign Sent Successfully
            </AlertTitle>
            <AlertDescription className="text-green-700">
              <div className="mt-2">
                <p>
                  <strong>Campaign:</strong>{" "}
                  {smsOptions.find((o) => o.id === lastSent.type)?.title}
                </p>
                <p>
                  <strong>Recipients:</strong> {lastSent.recipients}
                </p>
                <p>
                  <strong>Message Preview:</strong> "{lastSent.messagePreview}"
                </p>
                <p>
                  <strong>Sent at:</strong>{" "}
                  {new Date(lastSent.sentAt).toLocaleString()}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
