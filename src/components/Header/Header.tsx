import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../redux/hooks";
import { signOut } from "../../features/search/searchSlice";
import { auth } from "../../firebase";
import "./Header.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth.currentUser]);

  return (
    <header className="wrapper">
      <div>
        <p>{auth.currentUser?.email}</p>
        <button onClick={handleSignOut}>Log out</button>
      </div>
    </header>
  );
};

export default Header;

