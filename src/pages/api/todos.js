import { sortTodo } from "@/utils/sortTodo";
import { authOption } from "./auth/[...nextauth]";
import verifyUserReq from "@/utils/verifyUserReq";

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
  }
};

export default handler;
