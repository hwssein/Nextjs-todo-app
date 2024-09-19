import AddTodoPage from "@/components/template/AddTodoPage";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]";
import CloseTodoBtn from "@/components/elements/CloseTodoBtn";
import connectDB from "@/utils/connectDB";

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

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }

  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
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
