import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoutes: FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
