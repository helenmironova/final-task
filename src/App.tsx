import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";
import SignUp from "./components/auth/signup/SignUp";

import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Fragment>
  );
};

export default App;
