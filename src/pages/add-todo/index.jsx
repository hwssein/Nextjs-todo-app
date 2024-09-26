import AddTodoPage from "@/components/template/AddTodoPage";

import CloseTodoBtn from "@/components/elements/CloseTodoBtn";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]";

function AddTodo() {
  return (
    <>
      <AddTodoPage />
      <CloseTodoBtn />
    </>
  );
}

const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOption);

  if (session) {
    try {
      await connectDB();
    } catch (error) {
      console.log(error);
    }
  }

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

export default AddTodo;
export { getServerSideProps };
