import AddTodoPage from "@/components/template/AddTodoPage";

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
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: null,
    },
  };
};

export default AddTodo;
export { getServerSideProps };
