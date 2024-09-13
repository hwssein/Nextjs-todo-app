import { useState } from "react";
import Form from "../module/Form";
import { useRouter } from "next/router";

import { Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

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

    const req = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (req.ok === false) {
      const notification = JSON.parse(req.error);

      setLoadingBtn(false);

      toast.error(notification.fa);
    }

    if (req.ok === true) {
      toast.success("با موفقیت وارد شدید");
      router.replace("/not-done");
    }

    console.log(req);
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
    </Box>
  );
}

export default SignIn;
