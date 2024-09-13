import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/verify";

import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  session: { strategy: "jwt" },
  providers: [
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

export default nextAuth(authOption);
