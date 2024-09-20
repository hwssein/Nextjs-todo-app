import { useEffect, useState } from "react";
import ShowTodo from "../module/ShowTodo";
import { Box, Grid2, Typography } from "@mui/material";

function NotDonePage() {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();

    if (data.data.notDone) setTodo(data.data.notDone);
  };

  const statusHandler = async () => {
    console.log("not done");
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
