import { Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShowTodo from "../module/ShowTodo";

function DonePage() {
  const [todo, setTodo] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();

    if (data.data.done) setTodo(data.data.done);
  };

  const deleteHandler = async () => {
    console.log("delete");
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
              setDeleteBtn={true}
              deleteHandler={deleteHandler}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default DonePage;
