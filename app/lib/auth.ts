import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sql } from "@/app/lib/db";

type DbUser = {
  id: number | string;
  name: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

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
        if (!credentials?.email || !credentials?.password) return null;

        const rows = await sql<DbUser[]>`
          SELECT id, name, email, password, role
          FROM users
          WHERE email = ${credentials.email}
          LIMIT 1
        `;

        const user = rows[0];
        if (!user || !user.password) return null;

        const passwordMatches = await bcrypt.compare(
          String(credentials.password),
          String(user.password)
        );

        if (!passwordMatches) return null;

        return {
          id: String(user.id),
          name: user.name ?? "",
          email: user.email ?? "",
          role: user.role ?? "buyer",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github" && user.email) {
        const existingRows = await sql<DbUser[]>`
          SELECT id, name, email, role
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

    async jwt({ token, user }) {
      // Initial sign-in
      if (user?.email) {
        const rows = await sql<DbUser[]>`
          SELECT id, name, email, role
          FROM users
          WHERE email = ${user.email}
          LIMIT 1
        `;

        const dbUser = rows[0];

        if (dbUser) {
          token.id = String(dbUser.id);
          token.role = dbUser.role ?? "buyer";
          token.name = dbUser.name ?? token.name;
          token.email = dbUser.email ?? token.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = String(token.role ?? "buyer");
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // allow relative callback URLs like /user or /seller/dashboard
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // allow same-origin absolute URLs
      if (new URL(url).origin === baseUrl) return url;

      // fallback
      return baseUrl;
    },
  },
};