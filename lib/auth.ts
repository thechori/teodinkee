import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//
import env from "@/config/env.server";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/login"
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
};
