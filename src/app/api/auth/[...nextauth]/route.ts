import { config } from "@/config";
import { pool } from "@/libs/DB";
import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

interface Props {
  user: User | AdapterUser;
}

export const authOptions = {
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
    async signIn({ user }: Props) {
      const dbUser = await pool.query(
        `select * from member where email='${user.email as string}'`
      );
      if (dbUser.rows.length == 0) {
        await pool.query(
          `insert into member (name,email,profileurl,timer) values ('${
            user.name as string
          }', '${user.email as string}', '${user.image as string}','${
            new Date().toISOString().split("T")[0]
          }')`
        );
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
