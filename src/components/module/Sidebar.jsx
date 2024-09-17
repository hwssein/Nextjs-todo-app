import styles from "@/styles/sidebar.module.css";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import AddBtn from "../elements/AddBtn";

function Sidebar() {
  const [select, setSelect] = useState(4);
  return (
    <>
      <Box component="div" className={styles.sidebar_container}>
        <Link
          href="/profile"
          replace={true}
          className={`${styles.sidebar_link} ${
            select === 0 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(0)}
        >
          <Typography component="span" variant="span" sx={{ width: "100%" }}>
            پروفایل
          </Typography>
        </Link>

        <Link
          href="/not-done"
          replace={true}
          className={`${styles.sidebar_link} ${
            select === 1 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(1)}
        >
          <Typography component="span" variant="span" sx={{ width: "100%" }}>
            انجام نشده
          </Typography>
        </Link>

        <Link
          href="/in-progress"
          replace={true}
          className={`${styles.sidebar_link} ${
            select === 2 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(2)}
        >
          <Typography component="span" variant="span" sx={{ width: "100%" }}>
            درحال انجام
          </Typography>
        </Link>

        <Link
          href="/done"
          replace={true}
          className={`${styles.sidebar_link} ${
            select === 3 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(3)}
        >
          <Typography component="span" variant="span" sx={{ width: "100%" }}>
            انجام شده
          </Typography>
        </Link>

        <Link
          href="add-todo"
          replace={true}
          onClick={() => setSelect(4)}
          className={`${styles.add_todo_btn} ${select === 4 && null}`}
        >
          <AddBtn />
        </Link>
      </Box>
    </>
  );
}

export default Sidebar;
