import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "src/pages/auth-page-signup/SignUp";
import AuthPage from "src/pages/auth-page-login/AuthPage";
import MainPage from "src/pages/main-page/MainPage";

const App = () =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/login" element={<AuthPage />}></Route>
      <Route path="/auth/signup" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
