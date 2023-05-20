import "./App.css"
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SignupPage/SignupPage";

const App = () => {
  return (
    <Fragment>
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/auth" element={ <LoginPage/>} />
        <Route path="/auth/signup" element={ <SignupPage/>} />
   </Routes>
    </Fragment>
  )
}

export default App
