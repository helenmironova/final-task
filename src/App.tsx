import "./App.css"
import { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProteinPage from "./pages/ProteinPage/ProteinPage";
import ProteinDetails from "./components/ProteinDetails/ProteinDetails";
import {  useAppSelector,} from "./app/hooks";
import { selectProteinDetails } from "./features/proteinData/proteinDetailsSlice";
import { selectAuth } from "./features/auth/authSlice";


const App = () => {

  const authState = useAppSelector(selectAuth);
 
  const  proteinDetails = useAppSelector(selectProteinDetails);
  return (
    <Fragment>
        <Routes>
        <Route path="/" element={authState.user ? <Navigate to="/search" /> : <MainPage/>} />
        <Route path="/auth" element={authState.user ? <Navigate to="/search" /> : <LoginPage/>} />
        <Route path="/auth/signup" element={authState.user ? <Navigate to="/search" /> :  <SignupPage/>} />
        <Route path="/not-found" element={ <NotFoundPage/>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/search" element={ <SearchPage/> } />
        <Route path={`/protein/${proteinDetails.id}`} element={authState.user ? <ProteinPage/> : <Navigate to="/" />} > 
          <Route path={`/protein/${proteinDetails.id}/details`} element={authState.user ? <ProteinDetails/> : <Navigate to="/" />}/>
         
        </Route>
   </Routes>
    </Fragment>
  )
}

export default App
