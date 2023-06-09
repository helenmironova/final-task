import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./routes/PagesRouter";
import { ThemeProvider, createTheme } from "@mui/material";
import { monitorAuthState } from "./utils/auth";
import store from "./store/store";
import { Provider } from "react-redux";
import { useAppDispatch } from "./hooks/useAppDispatch";

const THEME = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  },
});

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  monitorAuthState(dispatch);

  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <PagesRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
