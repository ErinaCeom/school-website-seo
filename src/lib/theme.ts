import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-josefin), sans-serif",
  }
});

export default theme;
