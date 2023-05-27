import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./routes/PagesRouter";
import { ThemeProvider, createTheme } from "@mui/material";

import OpenSansFont from "./assets/fonts/OpenSans-VariableFont.ttf";

const THEME = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  },
});

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <PagesRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
