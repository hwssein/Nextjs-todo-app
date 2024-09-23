import ShowTodo from "../module/ShowTodo";
import fetcher from "@/utils/fetcher";
import NotFoundTodos from "../module/NotFoundTodos";

import useSWR, { mutate } from "swr";

import { Grid2 } from "@mui/material";
import { toast } from "react-toastify";
import Loader from "../elements/Loader";

function DonePage() {
  const { data, error, isLoading } = useSWR("/api/todos?status=done", fetcher);

  const deleteHandler = async (id) => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "failed") toast.error(data.notification);
    if (data.status === "success") {
      toast.success("با موفقیت حذف شد");
      mutate("/api/todos?status=done");
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
