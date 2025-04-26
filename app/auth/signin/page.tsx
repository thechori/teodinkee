"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Let NextAuth handle the redirect
      await signIn("google", { callbackUrl });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to sign in with Google. Please try again."
      });
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container max-w-md px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif">
              Sign in to Teodinkee
            </CardTitle>
            <CardDescription>
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2"
            >
              <Image
                src="/google-logo.png"
                alt="Google"
                width={20}
                height={20}
                className="rounded-full"
              />
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-600">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-gray-900">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-gray-900">
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
