import { config } from "@/config";
import { pool } from "@/libs/DB";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ✅ Define NextAuth options properly
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await pool.query(
        `SELECT * FROM member WHERE email='${user.email as string}'`
      );
      if (dbUser.rows.length === 0) {
        await pool.query(
          `INSERT INTO member (name, email, profileurl, timer) VALUES (
            '${user.name as string}',
            '${user.email as string}',
            '${user.image as string}',
            '${new Date().toISOString().split("T")[0]}'
          )`
        );
      }
      return true;
    },
  },
};

// ✅ Correct way to export API routes in Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
