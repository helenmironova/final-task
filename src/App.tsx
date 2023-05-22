import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/notFound";
import Authentication from "./pages/authentication/authentication";
import MainPage from "./pages/main/mainPage";
import ProtectedRoutes from "./components/protected-routes/protected-routes";
import ProteinPage from "./pages/protein/proteinPage";

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
      <Route path="/protein/:Id" element={<ProteinPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
