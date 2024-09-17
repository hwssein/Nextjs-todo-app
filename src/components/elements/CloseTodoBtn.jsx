import Link from "next/link";

import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/closeTodoBtn.module.css";

function CloseTodoBtn() {
  return (
    <Link href="not-done">
      <Box component="div" className={styles.close_btn_container}>
        <CloseIcon />
      </Box>
    </Link>
  );
}

export default CloseTodoBtn;
