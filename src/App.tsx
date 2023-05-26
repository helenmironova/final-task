import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./routes/PagesRouter";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <PagesRouter />
    </BrowserRouter>
  );
};

export default App;
