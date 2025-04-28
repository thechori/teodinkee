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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type SmsType = "weekly-promo" | "weekly-ad" | "cart-reminder";

type SmsOption = {
  id: SmsType;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultMessage: string;
};

type Audience = {
  id: string;
  name: string;
  description: string;
};

export default function AdminSmsPanel() {
  const [sending, setSending] = useState<SmsType | null>(null);
  const [selectedSmsType, setSelectedSmsType] =
    useState<SmsType>("weekly-promo");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("dive-watch-lovers");
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
      icon: <Bell className="h-5 w-5" />,
      defaultMessage:
        "🔥 Flash Sale! IT'S ON! Your weekly Teodinkee flash coupon is live for the next hour. Hurry up and claim it now! 5% off with code 'FS12251'"
    },
    {
      id: "weekly-ad",
      title: "Weekly Ad",
      description: "Send weekly advertisement featuring new products",
      icon: <MessageSquare className="h-5 w-5" />,
      defaultMessage:
        "This week at Teodinkee: New arrivals from Swiss craftsmen. Discover our latest collection at teodinkee.com/new"
    },
    {
      id: "cart-reminder",
      title: "Forgot Something In Your Cart?",
      description: "Remind customers about items left in their shopping cart",
      icon: <ShoppingCart className="h-5 w-5" />,
      defaultMessage:
        "You left items in your cart! Complete your purchase now and get free shipping. teodinkee.com/cart"
    }
  ];

  const audiences: Audience[] = [
    {
      id: "big-spenders",
      name: "Big Spenders",
      description: "Customers who spend over $5,000 per order"
    },
    {
      id: "dive-watch-lovers",
      name: "Dive Watch Lovers",
      description: "Customers who purchased or viewed dive watches"
    },
    {
      id: "window-shoppers",
      name: "Window Shoppers",
      description: "Customers who browse but rarely purchase"
    },
    {
      id: "frugal-lovers",
      name: "Frugal Lovers",
      description: "Customers who primarily purchase during sales"
    }
  ];

  const handleSmsTypeChange = (value: SmsType) => {
    setSelectedSmsType(value);
    const selectedOption = smsOptions.find((option) => option.id === value);
    if (selectedOption) {
      setMessage(selectedOption.defaultMessage);
    }
  };

  async function handleSendSms() {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setSending(selectedSmsType);

    try {
      // Note: simply GET for demo
      const response = await fetch("/api/sms", {
        method: "GET"
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        // body: JSON.stringify({
        //   smsType: selectedSmsType,
        //   message,
        //   audience
        // })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        if (result.details) {
          setLastSent({
            type: selectedSmsType,
            recipients: result.details.recipients,
            messagePreview: result.details.messagePreview,
            sentAt: result.details.sentAt
          });
        }
      } else {
        toast.error(result.message);
      }
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Compose SMS Campaign</CardTitle>
          <CardDescription>
            Create and send SMS marketing campaigns to your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sms-type">Campaign Type</Label>
            <Select
              value={selectedSmsType}
              onValueChange={(value) => handleSmsTypeChange(value as SmsType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                {smsOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2">{option.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audienceOption) => (
                  <SelectItem key={audienceOption.id} value={audienceOption.id}>
                    <div className="flex flex-col">
                      <span>{audienceOption.name}</span>
                      <span className="text-xs text-gray-500">
                        {audienceOption.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your SMS message"
              className="min-h-[120px]"
            />
            <p className="text-xs text-gray-500 flex justify-between">
              <span>
                Keep your message concise and include a clear call to action.
              </span>
              <span>{message.length}/160 characters</span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSendSms}
            disabled={sending !== null || !message.trim()}
          >
            {sending ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending...
              </>
            ) : (
              `Send SMS Campaign`
            )}
          </Button>
        </CardFooter>
      </Card>

      {lastSent && (
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
                <strong>Audience:</strong>{" "}
                {audiences.find((a) => a.id === audience)?.name}
              </p>
              <p>
                <strong>Recipients:</strong> {lastSent.recipients}
              </p>
              <p>
                <strong>Message:</strong> "{lastSent.messagePreview}"
              </p>
              <p>
                <strong>Sent at:</strong>{" "}
                {new Date(lastSent.sentAt).toLocaleString()}
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
