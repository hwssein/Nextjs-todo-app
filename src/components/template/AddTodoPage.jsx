import { useState } from "react";
import { toast } from "react-toastify";
import TodoForm from "../module/TodoForm";
import { Box, Typography } from "@mui/material";
import { mutate } from "swr";

function AddTodoPage() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoadingBtn(true);

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "failed") {
      toast.error(data.notification);
      setLoadingBtn(false);
    }
    if (data.status === "success") {
      toast.success(data.notification);
      setLoadingBtn(false);
      setTodo({
        title: "",
        description: "",
        status: "",
      });

      mutate("/api/todos");
    }
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <Typography
          component="h6"
          variant="h6"
          p={1}
          sx={{ borderBottom: "2px solid var(--primary)" }}
        >
          افزودن وظیفه
        </Typography>
      </Box>

      <TodoForm
        todo={todo}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        loadingBtn={loadingBtn}
      />
    </>
  );
}

export default AddTodoPage;
