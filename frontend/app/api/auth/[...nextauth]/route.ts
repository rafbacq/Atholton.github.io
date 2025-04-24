import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Verify hcpss.org domain
        return profile?.email?.endsWith("@inst.hcpss.org") ?? false;
      }
      return false; // Deny sign in if not Google or not hcpss.org
    },
    async jwt({ token, account }) {
      // Add custom claims to token
      if (account) {
        token.userRole = "pending"; // Will be updated after DB verification
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom session data
      if (session.user) {
        session.user.role = token.userRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
