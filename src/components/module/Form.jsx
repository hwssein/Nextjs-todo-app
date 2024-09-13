import { Button, TextField } from "@mui/material";
import styles from "@/styles/form.module.css";
import { useState } from "react";

function Form({ form, submitHandler, changeHandler, loadingBtn }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form
        method="POST"
        className={styles.signUp_form_container}
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          placeholder="ایمیل"
          name="email"
          value={form.email}
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

        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="رمز عبور"
          name="password"
          value={form.password}
          onChange={changeHandler}
          onMouseEnter={() => setShowPassword(true)}
          onMouseLeave={() => setShowPassword(false)}
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

        {loadingBtn ? (
          <Button
            variant="contained"
            disabled
            type="submit"
            sx={{ marginTop: "16px", marginBottom: "8px", width: "300px" }}
          >
            ایجاد حساب
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "16px", marginBottom: "8px", width: "300px" }}
          >
            ایجاد حساب
          </Button>
        )}
      </form>
    </>
  );
}

export default Form;
