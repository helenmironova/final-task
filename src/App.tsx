import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "src/pages/main-page/MainPage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
