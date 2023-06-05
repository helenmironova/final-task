import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { UserAuth } from "../../contexts/auth-context";

interface AuthLayoutProps {
  children: ReactElement;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthLayout;
