import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SessionProvider } from "@/components/auth/session-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Teodinkee | Luxury Watches Direct to Consumer",
  description:
    "Discover our curated collection of luxury timepieces crafted for those who appreciate the art of watchmaking."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
