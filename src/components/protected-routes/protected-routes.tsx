import { FC, ReactElement, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoutes: FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoutes;
