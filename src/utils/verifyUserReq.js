import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { getServerSession } from "next-auth";

const verifyUserReq = async (req, res, authOption) => {
  const session = await getServerSession(req, res, authOption);

  if (!session)
    return {
      code: 401,
      status: "failed",
      message: "unauthorized",
      notification: "لطفا وارد حساب کاربری خود شوید",
    };

  try {
    await connectDB();
  } catch (error) {
    return {
      code: 500,
      status: "failed",
      message: "connection failed",
      notification: "مشکلی در اتصال رخ داده",
    };
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("user not found");
    return { status: "success", user };
  } catch (error) {
    return {
      code: 404,
      status: "failed",
      message: "user not found",
      notification: "لطفا وارد حساب کاربری خود شوبد",
    };
  }
};

export default verifyUserReq;
