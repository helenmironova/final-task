import "./App.css"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

import { store } from "./app/store"
import { auth } from "./firebase"
import AuthPage from "./pages/auth-page"
import ErrorPage from "./pages/error-page"
import MainPage from "./pages/main-page"
import SearchPage from "./pages/search-page"
import SingleProteinPage from "./pages/single-protein-page"

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
        navigate("/auth", { state: { from: location } })
      }

      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [navigate, location])

  if (loading) {
    return null
  }

  if (!authenticated) {
    return <Navigate to="/auth" />
  }

  return <Component {...rest} />
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/search"
            element={<ProtectedRoute element={SearchPage} />}
          />
          <Route
            path="/search/:searchValue"
            element={<ProtectedRoute element={SearchPage} />}
          />
          <Route
            path="/protein/:id"
            element={<ProtectedRoute element={SingleProteinPage} />}
          />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
