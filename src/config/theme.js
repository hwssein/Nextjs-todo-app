import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7f5af0",
    },
    secondary: {
      main: "#72757e",
    },
    tertiary: {
      main: "#2cb67d",
    },
    stroke: {
      main: "#010101",
    },
    text: {
      main: "#fffffe",
    },
    cardBgColor: {
      main: "#16161a",
    },
    mainBgColor: {
      main: "#242629",
    },
  },

  typography: {
    fontFamily: ["SUSE", "Zain"].join(","),
  },
});

export default theme;
