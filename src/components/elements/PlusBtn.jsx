import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "@/styles/plusBtn.module.css";
import Link from "next/link";

function PlusBtn() {
  return (
    <Link href="add-todo">
      <Box component="div" className={styles.plus_btn_container}>
        <AddIcon />
      </Box>
    </Link>
  );
}

export default PlusBtn;
