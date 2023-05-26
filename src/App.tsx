import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";
import Authentication from "./pages/authentication/authentication";
import MainPage from "./pages/main/main-page";
import AuthLayout from "./components/auth-layout/auth-layout";
import ProteinPage from "./pages/protein/protein-page";
import { UserAuth } from "./contexts/auth-context";

const App = () => {
  const { user } =  UserAuth();

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
          <AuthLayout>
            <MainPage />
          </AuthLayout>
        }
      />
      <Route
        path="/protein/:Id"
        element={
          <AuthLayout>
            <ProteinPage />
          </AuthLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
