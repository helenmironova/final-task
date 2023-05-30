import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProteinPage from "./pages/ProteinPage/ProteinPage";
import ProteinDetails from "./components/ProteinDetails/ProteinDetails";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectProteinDetails } from "./features/proteinData/proteinDetailsSlice";
import {getAuthState} from "./features/auth/authSlice";
import { selectAuth } from "./features/auth/authSlice";
import ProteinFeatureViewer from "./components/ProteinFeatureViewer/ProteinFeatureViewer";
import ProteinPublications from "./components/ProteinPublications/ProteinPublications";

const App = () => {
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(getAuthState());
    }, [dispatch])
  

  const proteinDetails = useAppSelector(selectProteinDetails);
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={authState.isLoggedIn ? <Navigate to="/search" /> : <MainPage />}
        />
        <Route
          path="/auth"
          element={authState.isLoggedIn ? <Navigate to="/search" /> : <LoginPage />}
        />
        <Route
          path="/auth/signup"
          element={authState.isLoggedIn ? <Navigate to="/search" /> : <SignupPage />}
        />
        <Route path="/not-found" element={ authState.isLoggedIn ? <NotFoundPage /> : <MainPage />} />
        <Route path="*" element={authState.isLoggedIn ? <Navigate to="/not-found" /> : <MainPage />} />
        <Route path="/search" element={authState.isLoggedIn ? <SearchPage /> : <MainPage />} />
        <Route path={`/protein/${proteinDetails.id}`} element={ authState.isLoggedIn ? <ProteinPage /> : <MainPage /> }>
          <Route
            path={`/protein/${proteinDetails.id}/details`}
            element={authState.isLoggedIn ? <ProteinDetails /> : <MainPage /> }
          />
           <Route
            path={`/protein/${proteinDetails.id}/feature-viewer`}
            element={authState.isLoggedIn ? <ProteinFeatureViewer /> : <MainPage /> }
          />
            <Route
            path={`/protein/${proteinDetails.id}/publications`}
            element={authState.isLoggedIn ? <ProteinPublications /> : <MainPage /> }
          />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
