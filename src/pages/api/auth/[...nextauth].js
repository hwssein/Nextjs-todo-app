import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/verify";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "../../../../lib/db";

import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOption = {
  session: { strategy: "jwt" },

  adapter: MongoDBAdapter(client),

  secret: process.env.SECRET,

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),

    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailRegexResult = emailRegex.test(email);

        if (!email || !password || !emailRegexResult)
          throw new Error(
            JSON.stringify({
              en: "invalid data",
              fa: "اطلاعات وارد شده نا معتبر است",
            })
          );

        if (password.length < 4)
          throw new Error(
            JSON.stringify({
              en: "password too short",
              fa: "رمز عبور کوتاه است",
            })
          );

        try {
          await connectDB();
        } catch (error) {
          console.log(error);
          throw new Error(
            JSON.stringify({
              en: "DB connection failed",
              fa: "مشکلی در اتصال رخ داده",
            })
          );
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser)
          throw new Error(
            JSON.stringify({
              en: "invalid email or password",
              fa: "ایمیل یا رمز عبور نا معتبر است",
            })
          );

        const hashedPassword = await verifyPassword(
          password,
          existingUser.password
        );

        if (!hashedPassword)
          throw new Error(
            JSON.stringify({
              en: "invalid email or password",
              fa: "ایمیل یا رمز عبور نا معتبر است",
            })
          );

        return { email };
      },
    }),
  ],
};

const handler = nextAuth(authOption);

export default handler;
export { authOption };
