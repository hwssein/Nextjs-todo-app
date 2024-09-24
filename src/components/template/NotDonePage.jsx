import ShowTodo from "../module/ShowTodo";
import fetcher from "@/utils/fetcher";
import NotFoundTodos from "../module/NotFoundTodos";

import useSWR, { mutate } from "swr";
import { useState } from "react";

import { Grid2 } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../elements/Loader";

function NotDonePage() {
  const { data, error, isLoading } = useSWR(
    "/api/todos?status=notDone",
    fetcher
  );

  const statusHandler = async (id) => {
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
      mutate("/api/todos?status=notDone");
    }
  };

  if (isLoading) return <Loader />;

  if (!data.data || data.data.length === 0) return <NotFoundTodos />;

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
        {data.data.map((item) => (
          <Grid2
            key={item._id}
            size={{ xs: 12 }}
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
