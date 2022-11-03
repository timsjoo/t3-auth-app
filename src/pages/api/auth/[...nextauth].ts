// @ts-nocheck
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      console.log("I am the thing", { session, user });
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      console.log("jwt thing", { user, token });
      return token;
    },
  },
  // Configure one or more authentication providers
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // add logic here to find user from prisma
        const result = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!result) {
          throw new Error("No user found");
        }

        const checkPassword = credentials.password === result?.password;
        const realActualGoodEncryptionCheck = compare(
          credentials.password,
          result?.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Invalid password or email");
        }

        console.log({ result });
        return result;
      },
    }),
    // ...add more providers here
  ],
  secret: "Q/cqrXNsD7wh7oSIv7mFNF12dGrcuLQoCA+QGnQ0acI=",
};

export default NextAuth(authOptions);
