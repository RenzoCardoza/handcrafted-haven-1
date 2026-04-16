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

function makeGitHubFallbackEmail(providerAccountId: string) {
  return `github_${providerAccountId}@handcrafted-haven.local`;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
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
    error: "/login",
  },

  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      let email = user?.email ?? token.email ?? null;

      if (!email && account?.provider === "github" && account.access_token) {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              Accept: "application/vnd.github+json",
              "User-Agent": "Handcrafted-Haven",
            },
            cache: "no-store",
          });

          const data: unknown = await res.json();

          if (Array.isArray(data)) {
            const primaryVerified = data.find(
              (item): item is { email?: string; primary?: boolean; verified?: boolean } =>
                typeof item === "object" &&
                item !== null &&
                "email" in item &&
                "primary" in item &&
                "verified" in item &&
                typeof (item as { email?: unknown }).email === "string" &&
                (item as { primary?: boolean }).primary === true &&
                (item as { verified?: boolean }).verified === true
            );

            const anyVerified = data.find(
              (item): item is { email?: string; verified?: boolean } =>
                typeof item === "object" &&
                item !== null &&
                "email" in item &&
                "verified" in item &&
                typeof (item as { email?: unknown }).email === "string" &&
                (item as { verified?: boolean }).verified === true
            );

            email = primaryVerified?.email ?? anyVerified?.email ?? null;
          } else {
            console.error("GitHub emails API returned non-array:", data);
          }
        } catch (error) {
          console.error("Failed to fetch GitHub email:", error);
        }
      }

      // Fallback for GitHub users with no accessible email
      if (!email && account?.provider === "github" && account.providerAccountId) {
        email = makeGitHubFallbackEmail(account.providerAccountId);
      }

      // Also preserve fallback on later JWT calls
      if (!email && typeof token.sub === "string") {
        email = makeGitHubFallbackEmail(token.sub);
      }

      if (!email) {
        return token;
      }

      const rows = await sql<DbUser[]>`
        SELECT id, name, email, role
        FROM users
        WHERE email = ${email}
        LIMIT 1
      `;

      let dbUser = rows[0];

      if (!dbUser) {
        const displayName =
          user?.name ??
          token.name ??
          (profile && typeof profile === "object" && "name" in profile
            ? String((profile as { name?: unknown }).name ?? "")
            : "") ??
          "GitHub User";

        const insertedRows = await sql<DbUser[]>`
          INSERT INTO users (name, email, password, role)
          VALUES (
            ${displayName || "GitHub User"},
            ${email},
            '',
            'buyer'
          )
          RETURNING id, name, email, role
        `;

        dbUser = insertedRows[0];
      }

      token.id = String(dbUser.id);
      token.role = dbUser.role ?? "buyer";
      token.email = dbUser.email ?? email;
      token.name = dbUser.name ?? token.name;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role =
          typeof token.role === "string" ? token.role : "buyer";
        session.user.email =
          typeof token.email === "string"
            ? token.email
            : session.user.email;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};