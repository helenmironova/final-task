import React, { useState, createContext, ReactNode } from "react";

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

