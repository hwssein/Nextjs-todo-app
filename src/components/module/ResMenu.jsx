import Link from "next/link";
import { useState } from "react";

import { Box, Typography } from "@mui/material";
import styles from "@/styles/resMenu.module.css";

function ResMenu() {
  const [select, setSelect] = useState(1);

  return (
    <>
      <Box component="div" className={styles.res_menu}>
        <Link
          href="/profile"
          replace={true}
          className={`${styles.res_menu_link} ${
            select === 0 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(0)}
        >
          <Typography
            component="span"
            variant="span"
            sx={{
              width: "100%",
              fontSize: "0.83rem",
            }}
          >
            پروفایل
          </Typography>
        </Link>

        <Link
          href="/not-done"
          replace={true}
          className={`${styles.res_menu_link} ${
            select === 1 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(1)}
        >
          <Typography
            component="span"
            variant="span"
            sx={{
              width: "100%",
              fontSize: "0.83rem",
            }}
          >
            انجام نشده
          </Typography>
        </Link>

        <Link
          href="/in-progress"
          replace={true}
          className={`${styles.res_menu_link} ${
            select === 2 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(2)}
        >
          <Typography
            component="span"
            variant="span"
            sx={{
              width: "100%",
              fontSize: "0.83rem",
            }}
          >
            درحال انجام
          </Typography>
        </Link>

        <Link
          href="/done"
          replace={true}
          className={`${styles.res_menu_link} ${
            select === 3 ? styles.selected : styles.unselected
          }`}
          onClick={() => setSelect(3)}
        >
          <Typography
            component="span"
            variant="span"
            sx={{
              width: "100%",
              fontSize: "0.83rem",
            }}
          >
            انجام شده
          </Typography>
        </Link>
      </Box>
    </>
  );
}

export default ResMenu;
