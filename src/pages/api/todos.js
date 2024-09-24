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
    const { title, description, status } = req.body;

    if (!title || !description || !status)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "لطفا فیلد ها را پر کنید",
      });

    verifyUser.user.todos.push({ title, description, status });
    verifyUser.user.save();

    res.status(201).json({
      status: "success",
      message: "todo created",
      notification: "با موفقیت ایجاد شد",
      data: verifyUser.user,
    });
  } else if (req.method === "GET") {
    const { status } = req.query;

    const sortedTodo = sortTodo(verifyUser.user.todos);

    const filteredData = Object.entries(sortedTodo)
      .filter(([key]) => key === status)
      .map(([key, value]) => value);

    res.status(200).json({ status: "success", data: filteredData[0] });
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
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id)
      return res.status(422).json({
        status: "failed",
        message: "invalid data",
        notification: "مشکلی رخ داده است",
      });

    const result = await User.updateOne(
      { _id: verifyUser.user._id },
      { $pull: { todos: { _id: id } } }
    );

    if (result.modifiedCount === 0)
      return res.status(500).json({
        status: "failed",
        message: "can not delete todo",
        notification: "مشکلی رخ داده است",
      });

    res.status(200).json({ status: "success", message: "todo deleted" });
  }
};

export default handler;
