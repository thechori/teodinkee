"use client";

import React from "react";

import { useState } from "react";
import { Phone, ShieldCheck, Truck } from "lucide-react";
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

type VoiceCallType = "weekly-promo" | "order-confirmation" | "delivery-update";

type VoiceCallOption = {
  id: VoiceCallType;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultScript: string;
};

type Audience = {
  id: string;
  name: string;
  description: string;
};

export default function AdminVoicePanel() {
  const [dispatching, setDispatching] = useState<VoiceCallType | null>(null);
  const [selectedCallType, setSelectedCallType] =
    useState<VoiceCallType>("weekly-promo");
  const [script, setScript] = useState("");
  const [audience, setAudience] = useState("big-spenders");
  const [lastDispatched, setLastDispatched] = useState<{
    type: VoiceCallType;
    recipients: number;
    scriptSummary: string;
    estimatedDuration: string;
    dispatchedAt: string;
  } | null>(null);

  const voiceOptions: VoiceCallOption[] = [
    {
      id: "weekly-promo",
      title: "Weekly Flash Promo",
      description: "Automated voice calls announcing the weekly flash sale",
      icon: <Phone className="h-5 w-5" />,
      defaultScript:
        "Hello from Teodinkee! We're excited to announce our weekly flash sale with 15% off all luxury watches for the next 24 hours. Visit teodinkee.com or call us to take advantage of this limited-time offer. Thank you for being a valued customer!"
    },
    {
      id: "order-confirmation",
      title: "Order Confirmation",
      description: "Confirm orders with delivery information",
      icon: <ShieldCheck className="h-5 w-5" />,
      defaultScript:
        "Hello from Teodinkee! We're calling to confirm your recent order has been processed and is being prepared for shipping. You should receive your tracking information by email shortly. Thank you for your purchase!"
    },
    {
      id: "delivery-update",
      title: "Delivery Update",
      description: "Notify customers about delivery status changes",
      icon: <Truck className="h-5 w-5" />,
      defaultScript:
        "Hello from Teodinkee! We're calling to inform you that your order has been shipped and is on its way. You can track your delivery using the tracking number sent to your email. Thank you for your patience!"
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

  const handleCallTypeChange = (value: VoiceCallType) => {
    setSelectedCallType(value);
    const selectedOption = voiceOptions.find((option) => option.id === value);
    if (selectedOption) {
      setScript(selectedOption.defaultScript);
    }
  };

  // Set default script on initial load
  React.useEffect(() => {
    const defaultOption = voiceOptions.find(
      (option) => option.id === "weekly-promo"
    );
    if (defaultOption) {
      setScript(defaultOption.defaultScript);
    }
  }, []);

  async function handleDispatchCall() {
    if (!script.trim()) {
      toast.error("Please enter a script");
      return;
    }

    setDispatching(selectedCallType);

    try {
      // Note: simply GET for demo
      const response = await fetch("/api/voice", {
        method: "GET"
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        // body: JSON.stringify({
        //   callType: selectedCallType,
        //   script,
        //   audience
        // })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        if (result.details) {
          setLastDispatched({
            type: selectedCallType,
            recipients: result.details.recipients,
            scriptSummary: result.details.scriptSummary,
            estimatedDuration: result.details.estimatedDuration,
            dispatchedAt: result.details.dispatchedAt
          });
        }
      } else {
        console.error("ERROR", result);
        toast.error(result.message || "Success!");
      }
    } catch (error) {
      toast.error(
        `Failed to dispatch voice call: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setDispatching(null);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Compose Voice Campaign</CardTitle>
          <CardDescription>
            Create and dispatch automated voice calls to your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="call-type">Campaign Type</Label>
            <Select
              value={selectedCallType}
              onValueChange={(value) =>
                handleCallTypeChange(value as VoiceCallType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                {voiceOptions.map((option) => (
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
            <Label htmlFor="script">Voice Script</Label>
            <Textarea
              id="script"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter your voice call script"
              className="min-h-[150px]"
            />
            <p className="text-xs text-gray-500 flex justify-between">
              <span>Keep your script clear, concise, and conversational.</span>
              <span>{script.split(/\s+/).length} words</span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleDispatchCall}
            disabled={dispatching !== null || !script.trim()}
          >
            {dispatching ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Dispatching...
              </>
            ) : (
              `Dispatch Voice Campaign`
            )}
          </Button>
        </CardFooter>
      </Card>

      {lastDispatched && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800">
            Voice Campaign Dispatched Successfully
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            <div className="mt-2">
              <p>
                <strong>Campaign:</strong>{" "}
                {voiceOptions.find((o) => o.id === lastDispatched.type)?.title}
              </p>
              <p>
                <strong>Audience:</strong>{" "}
                {audiences.find((a) => a.id === audience)?.name}
              </p>
              <p>
                <strong>Recipients:</strong> {lastDispatched.recipients}
              </p>
              <p>
                <strong>Script Preview:</strong> "{lastDispatched.scriptSummary}
                "
              </p>
              <p>
                <strong>Estimated Duration:</strong>{" "}
                {lastDispatched.estimatedDuration}
              </p>
              <p>
                <strong>Dispatched at:</strong>{" "}
                {new Date(lastDispatched.dispatchedAt).toLocaleString()}
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
