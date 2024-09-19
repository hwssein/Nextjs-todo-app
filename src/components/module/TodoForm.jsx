import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

function TodoForm({ todo, submitHandler, changeHandler, loadingBtn }) {
  return (
    <>
      <form
        method="POST"
        onSubmit={submitHandler}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "8px",
        }}
      >
        <TextField
          type="text"
          placeholder="عنوان"
          name="title"
          value={todo.title}
          onChange={changeHandler}
          sx={{
            width: "300px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--secondary)",
              },
              "&:hover fieldset": {
                borderColor: "var(--text)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary)",
              },
            },
          }}
          inputProps={{
            style: {
              color: "var(--text)",
            },
          }}
        />

        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          <Button
            variant={todo.status === "notDone" ? "contained" : "outlined"}
            color="secondary"
            name="status"
            value="notDone"
            onClick={changeHandler}
            sx={{ width: "100px" }}
          >
            انجام نشده
          </Button>

          <Button
            variant={todo.status === "inProgress" ? "contained" : "outlined"}
            color="secondary"
            name="status"
            value="inProgress"
            onClick={changeHandler}
            sx={{ width: "100px" }}
          >
            درحال انجام
          </Button>

          <Button
            variant={todo.status === "done" ? "contained" : "outlined"}
            color="secondary"
            name="status"
            value="done"
            onClick={changeHandler}
            sx={{ width: "100px" }}
          >
            انجام شده
          </Button>
        </Box>

        {loadingBtn ? (
          <Button
            variant="contained"
            type="submit"
            disabled
            sx={{
              width: "300px",
              marginTop: "24px",
            }}
          >
            ذخیره
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "300px",
              marginTop: "24px",
            }}
          >
            ذخیره
          </Button>
        )}
      </form>
    </>
  );
}

export default TodoForm;
