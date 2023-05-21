import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/user.context";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/notFound";
import Authentication from "./components/authentication/authentication";
import MainPage from "./pages/main/mainPage";
import ProtectedRoutes from "./components/protected-routes/protected-routes";

const App = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route index element={currentUser ? <MainPage /> : <Home />} />
      <Route
        path="/auth"
        element={currentUser ? <MainPage /> : <Authentication />}
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
