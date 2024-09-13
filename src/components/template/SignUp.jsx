import { useState } from "react";
import Form from "../module/form";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import { toast } from "react-toastify";

function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "email" ? value.trim().toLowerCase() : value.trim(),
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoadingBtn(true);

    const req = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const res = await req.json();

    if (res.status === "failed") {
      setLoadingBtn(false);
      toast.error(res.notification);
    }

    if (res.status === "success") {
      router.reload();
    }
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          marginBottom: "8px",
        }}
      >
        <Form
          form={form}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          loadingBtn={loadingBtn}
        />
      </Box>
    </>
  );
}

export default SignUp;
