import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/verify";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "failed",
      message: "method not allowed",
      notification: "مشکلی در اتصال رخ داده",
    });
  }

  const { email, password } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailRegexResult = emailRegex.test(email);

  if (!email || !password || !emailRegexResult) {
    return res.status(422).json({
      status: "failed",
      message: "can not accept email",
      notification: "ایمیل وارد شده قابل قبول نیست",
    });
  }

  if (password.length < 4) {
    return res.status(422).json({
      status: "failed",
      message: "Password too short",
      notification: "رمز عبور کوتاه است",
    });
  }

  try {
    await connectDB();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "failed",
      message: "DB connection failed",
      notification: "مشکلی در اتصال رخ داده",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      status: "failed",
      message: "email already exist",
      notification: "حساب کاربری از قبل وجود دارد",
    });
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    return res.status(422).json({
      status: "failed",
      message: "password not hash please try again",
      notification: "مشکلی در اتصال رخ داده",
    });
  }

  try {
    const user = await User.create({ email, password: hashedPassword });

    return res
      .status(201)
      .json({ status: "success", message: "user created", data: user });
  } catch (error) {
    console.log("can not create user\n", error);

    return res.status(500).json({
      status: "failed",
      message: "error creating user",
      notification: "مشکلی در اتصال رخ داده",
    });
  }
};

export default handler;
