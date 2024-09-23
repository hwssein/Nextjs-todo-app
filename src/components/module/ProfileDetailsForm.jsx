import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

function ProfileDetailsForm() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: name === "password" ? value.trim() : value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "failed") toast.error(data.notification);
    if (data.status === "success") {
      toast.success(data.notification);
      mutate("/api/profile");
    }
  };

  return (
    <>
      <form method="POST" onSubmit={submitHandler}>
        <Stack
          direction="column"
          spacing={1}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
            }}
          >
            <Typography component="h6" variant="h6" color="primary">
              نام:
            </Typography>
            <TextField
              type="text"
              variant="standard"
              value={form.name}
              name="name"
              onChange={changeHandler}
              sx={{
                width: "200px",
              }}
              inputProps={{
                style: {
                  color: "var(--text)",
                },
              }}
            />
          </Box>

          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
            }}
          >
            <Typography component="h6" variant="h6" color="primary">
              نام خانوادگی:
            </Typography>
            <TextField
              type="text"
              variant="standard"
              value={form.lastName}
              name="lastName"
              onChange={changeHandler}
              sx={{
                width: "200px",
              }}
              inputProps={{
                style: {
                  color: "var(--text)",
                },
              }}
            />
          </Box>

          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
            }}
          >
            <Typography component="h6" variant="h6" color="primary">
              رمز عبور:
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              variant="standard"
              value={form.password}
              name="password"
              onChange={changeHandler}
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
              sx={{
                width: "200px",
              }}
              inputProps={{
                style: {
                  color: "var(--text)",
                },
              }}
            />
          </Box>

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
            <Button type="submit" variant="text" sx={{ width: "150px" }}>
              ذخیره
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
}

export default ProfileDetailsForm;
