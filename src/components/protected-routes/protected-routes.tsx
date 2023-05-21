import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const ProtectedRoutes = ({ children }: any) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
