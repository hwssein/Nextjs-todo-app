import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2cb67d",
    },
    secondary: {
      main: "#72757e",
    },
    tertiary: {
      main: "#7f5af0",
    },
    stroke: {
      main: "#010101",
    },
    text: {
      main: "#fffffe",
    },
    cardBgColor: {
      main: "#18181b",
    },
    mainBgColor: {
      main: "#2b2b2c",
    },
  },

  typography: {
    fontFamily: ["SUSE", "Zain"].join(","),
  },
});

export default theme;
