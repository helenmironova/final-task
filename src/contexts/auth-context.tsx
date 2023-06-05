import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface UserContextValue {
  user: User | null;
  logout: () => void;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  logout: () => {},
  createUser: () => Promise.reject(),
  signIn: () => Promise.reject(),
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const createUserWithEmailAndPassword = (email: string, password: string) => {
    return createUser(auth, email, password);
  };

  const signInWithEmailAndPassword = (email: string, password: string) => {
    return signIn(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser: createUserWithEmailAndPassword,
        user,
        logout,
        signIn: signInWithEmailAndPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
