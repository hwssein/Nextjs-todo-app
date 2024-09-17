import { Box, Button } from "@mui/material";
import styles from "@/styles/addBtn.module.css";
import Link from "next/link";

function AddBtn() {
  return (
    <>
      <Box component="div" className={styles.add_btn_container}>
        <Button variant="outlined" sx={{ width: "100%" }}>
          افزودن
        </Button>
      </Box>
    </>
  );
}

export default AddBtn;
