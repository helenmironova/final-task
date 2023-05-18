import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "src/pages/auth-page/AuthPage";
import MainPage from "src/pages/main-page/MainPage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
