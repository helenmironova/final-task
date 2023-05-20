import "./App.css"
import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <Fragment>
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/auth" element={ <LoginPage/>} />
        <Route path="/auth/signup" element={ <SignupPage/>} />
        <Route path="/not-found" element={ <NotFoundPage/>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
   </Routes>
    </Fragment>
  )
}

export default App
