import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "src/pages/auth-page-signup/SignUp";
import AuthPage from "src/pages/auth-page-login/AuthPage";
import MainPage from "src/pages/main-page/MainPage";
import HomePage from "src/pages/home-page/HomePage";
import ProteinPage from "src/pages/ProteinPage/ProteinPage";
import NotFound from 'src/pages/not-found/NotFound'

const App = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<AuthPage />}></Route>
        <Route path="/auth/signup" element={<SignUp />}></Route>
        <Route path="/search" element={<HomePage />}></Route>
        <Route path="/protein" element={<ProteinPage />}></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
