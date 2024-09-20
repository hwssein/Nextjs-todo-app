import { sortTodo } from "@/utils/sortTodo";
import { authOption } from "./auth/[...nextauth]";
import verifyUserReq from "@/utils/verifyUserReq";
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

  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "لطفا فیلد ها را پر کنید",
      });

    verifyUser.user.todos.push({ title, status });
    verifyUser.user.save();

    res.status(201).json({
      status: "success",
      message: "todo created",
      notification: "با موفقیت ایجاد شد",
      data: verifyUser.user,
    });
  } else if (req.method === "GET") {
    const sortedTodo = sortTodo(verifyUser.user.todos);

    res.status(200).json({ status: "success", data: sortedTodo });
  } else if (req.method === "PATCH") {
    const { id, statusBtn } = req.body;

    if (!id || !statusBtn)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "مشکلی رخ داده است",
      });

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": statusBtn } }
    );

    if (!result)
      return res.status(500).json({
        status: "failed",
        message: "can not update data",
        notification: "مشکلی رخ داده است",
      });

    res.status(200).json({ status: "success", message: "data updated" });
  }
};

export default handler;
