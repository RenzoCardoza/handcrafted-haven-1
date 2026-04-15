import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sql } from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const rows = await sql`
          SELECT id, name, email, password, role
          FROM users
          WHERE email = ${credentials.email}
          LIMIT 1
        `;

        const user = rows[0];

        if (!user || !user.password) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          String(credentials.password),
          String(user.password)
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name ?? "",
          email: user.email ?? "",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" && user.email) {
        const existingRows = await sql`
          SELECT id
          FROM users
          WHERE email = ${user.email}
          LIMIT 1
        `;

        if (existingRows.length === 0) {
          await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (
              ${user.name ?? "GitHub User"},
              ${user.email},
              '',
              'buyer'
            )
          `;
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};