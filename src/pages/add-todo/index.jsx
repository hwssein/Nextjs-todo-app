import AddTodoPage from "@/components/template/AddTodoPage";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]";
import CloseTodoBtn from "@/components/elements/CloseTodoBtn";

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
