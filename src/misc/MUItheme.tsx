import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#F93B1D",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
