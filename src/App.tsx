import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/notFound";
import Authentication from "./components/authentication/authentication";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
};

export default App;
