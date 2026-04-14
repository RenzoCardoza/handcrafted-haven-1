import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [credentials.email]
        );

        const user = result.rows[0];

        if (!user) return null;

      
        const isHashed = user.password.startsWith("$2b$");

        let isValid = false;

        if (isHashed) {
          isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
        } else {
          isValid = credentials.password === user.password;
        }

        if (!isValid) return null;

        console.log("User found:", user);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };