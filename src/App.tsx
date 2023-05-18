import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
