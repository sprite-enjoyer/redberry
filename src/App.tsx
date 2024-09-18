import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "@mui/material";
import theme from "./misc/MUItheme";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_REDBERRY_TOKEN}`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
