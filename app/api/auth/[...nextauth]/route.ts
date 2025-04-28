import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import env from "@/config/env.server";

// Create the auth options configuration
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const existingUser = await db
            .selectFrom("users")
            .select(["id", "email"])
            .where("email", "=", user.email)
            .executeTakeFirst();

          if (!existingUser) {
            // Create new user
            await db
              .insertInto("users")
              .values({
                email: user.email,
                google_id: user.id,
                display_name: user.name || null
              })
              .execute();
          } else {
            // Update existing user's Google ID if needed
            await db
              .updateTable("users")
              .set({ google_id: user.id })
              .where("email", "=", user.email)
              .execute();
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub as string;

        // Get user from database
        if (session.user.email) {
          const dbUser = await db
            .selectFrom("users")
            .select(["id"])
            .where("email", "=", session.user.email)
            .executeTakeFirst();

          if (dbUser) {
            session.user.id = dbUser.id.toString();
          }
        }
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }: any) {
      // Handle relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow redirects to the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default fallback
      return baseUrl;
    }
  }
};

// Create and export the handler functions directly
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// If you need to use authOptions elsewhere, export it in a separate file
// NOT as a route export
