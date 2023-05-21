import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/notFound";
import Authentication from "./pages/authentication/authentication";
import MainPage from "./pages/main/mainPage";
import ProtectedRoutes from "./components/protected-routes/protected-routes";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Authentication />} />

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/main"
        element={
          <ProtectedRoutes>
            <MainPage />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
