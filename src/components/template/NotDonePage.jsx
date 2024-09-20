import { useEffect, useState } from "react";
import ShowTodo from "../module/ShowTodo";
import { Box, Grid2, Typography } from "@mui/material";
import { toast } from "react-toastify";

function NotDonePage() {
  const [todo, setTodo] = useState(null);
  const [todoStatus, setTodoStatus] = useState({
    id: "",
    statusBtn: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();

    if (data.data.notDone) setTodo(data.data.notDone);
  };

  const statusHandler = async (id) => {
    setTodoStatus((todoStatus) => ({ id, statusBtn: "inProgress" }));

    const newTodoStatus = { id, statusBtn: "inProgress" };

    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify(newTodoStatus),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "failed") toast.error(data.notification);
    if (data.status === "success") {
      toast.success("وضعیت به درحال انجام تغییر کرد");
      fetchData();
    }
  };

  if (!todo)
    return (
      <>
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            p={1}
            sx={{ borderBottom: "2px solid var(--primary)" }}
          >
            هنوز موردی وارد نشده
          </Typography>
        </Box>
      </>
    );

  return (
    <>
      <Grid2
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {todo.map((item) => (
          <Grid2
            key={item._id}
            size={{ xs: 12, sm: 6 }}
            sx={{
              width: "100%",
            }}
          >
            <ShowTodo
              data={item}
              btnStatus="انجام دادن"
              statusHandler={statusHandler}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default NotDonePage;
