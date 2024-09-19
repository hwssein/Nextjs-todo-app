import { useState } from "react";
import Form from "../module/Form";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import AuthProviders from "../module/AuthProviders";

function SignIn() {
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

    if (!form.email || !form.password) {
      toast.error("ایمیل یا رمز عبور را وارد کنید");

      setLoadingBtn(false);
      return;
    }

    const req = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (req.ok === false) {
      let notification;

      try {
        notification = JSON.parse(req.error);
      } catch (e) {
        notification = "مشکلی رخ داده است";
      }

      setLoadingBtn(false);

      toast.error(notification);
    }

    if (req.ok === true) {
      toast.success("با موفقیت وارد شدید");
      router.replace("/add-todo");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        marginBottom: "8px",
      }}
    >
      <Form
        form={form}
        loadingBtn={loadingBtn}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />

      <AuthProviders />
    </Box>
  );
}

export default SignIn;
