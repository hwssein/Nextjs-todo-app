import verifyUserReq from "@/utils/verifyUserReq";
import { authOption } from "./auth/[...nextauth]";
import { verifyPassword } from "@/utils/verify";
import User from "@/models/User";

const handler = async (req, res) => {
  const verifyUser = await verifyUserReq(req, res, authOption);

  if (verifyUser.status === "failed") {
    return res.status(verifyUser.code).json({
      status: "failed",
      message: verifyUser.message,
      notification: verifyUser.notification,
    });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "success",
      data: {
        name: verifyUser.user.name,
        lastName: verifyUser.user.lastName,
        email: verifyUser.user.email,
      },
    });
  } else if (req.method === "POST") {
    const { name, lastName, password } = req.body;

    if (!name || !lastName || !password)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "لطفا فیلد هارا پر کنید",
      });

    const validPassword = await verifyPassword(
      password,
      verifyUser.user.password
    );

    if (!validPassword)
      return res.status(422).json({
        status: "failed",
        message: "invalid password",
        notification: "رمز عبور اشتباه است",
      });

    try {
      verifyUser.user.name = name;
      verifyUser.user.lastName = lastName;
      verifyUser.user.save();
    } catch (error) {
      console.log("can not save data\n", error);

      return res
        .status(500)
        .json({ status: "failed", message: "can not save data" });
    }

    res.status(201).json({
      status: "success",
      message: "Changed successfully",
      notification: "تغییرات با موفقیت ذخیره شد",
      data: {
        name: verifyUser.user.name,
        lastName: verifyUser.user.lastName,
        email: verifyUser.user.email,
      },
    });
  } else if (req.method === "DELETE") {
    const { password } = req.body;

    const isValidPassword = await verifyPassword(
      password,
      verifyUser.user.password
    );

    if (!password || !isValidPassword)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "رمز عبور اشتباه است",
      });

    try {
      const deleteAccount = await User.findByIdAndDelete({
        _id: verifyUser.user._id,
      });

      return res.status(200).json({
        status: "success",
        message: "deleted successfully",
        notification: "حساب کاربری با موفقیت حذف شد",
      });
    } catch (error) {
      console.log("can not delete account\n", error);
      return res.status(500).json({
        status: "failed",
        message: "can not delete account",
        notification: "مشکلی رخ داده است",
      });
    }
  }
};

export default handler;
