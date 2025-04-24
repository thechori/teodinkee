"use client";

import type React from "react";
import { toast } from "sonner";
//
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast("Subscription successful!", {
      description: "Thank you for subscribing to our newsletter."
    });

    setEmail("");
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-white text-black hover:bg-gray-200"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
