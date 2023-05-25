import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/notFound";
import Authentication from "./pages/authentication/authentication";
import MainPage from "./pages/main/mainPage";
import ProtectedRoutes from "./components/protected-routes/protected-routes";
import ProteinPage from "./pages/protein/proteinPage";
import { UserAuth } from "./contexts/AuthContext";

const App = () => {
  const { user } = UserAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate replace to={"/main"} /> : <Home />}
      />
      <Route
        path="/auth"
        element={user ? <Navigate replace to={"/main"} /> : <Authentication />}
      />
      <Route
        path="/main"
        element={
          <ProtectedRoutes>
            <MainPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/protein/:Id"
        element={
          <ProtectedRoutes>
            <ProteinPage />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
