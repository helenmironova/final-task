import React, { useState, createContext, ReactNode, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

interface UserContextProps {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

export const UserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => null,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const value: UserContextProps = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      console.log(user);
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [setCurrentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
