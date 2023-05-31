// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  User,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { NavigateFunction, To, useNavigate } from "react-router-dom";
import { setEmail, setUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { AnyAction, Dispatch } from "redux";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC286MVNaBipk_hzFWm9Vq5goCVKS3ys04",
  authDomain: "quantori-c220d.firebaseapp.com",
  projectId: "quantori-c220d",
  storageBucket: "quantori-c220d.appspot.com",
  messagingSenderId: "429652431805",
  appId: "1:429652431805:web:77f9fce81000736342f8d4",
  measurementId: "G-0C0VBPDPF0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.toLowerCase());
};

const validatePassword = (password: string): boolean => {
  return (
    /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)
  );
};

export const loginEmailPassword = async (
  loginEmail: string | undefined,
  loginPassword: string | undefined
): Promise<void> => {
  if (loginEmail && loginPassword) {
    if (loginPassword.length < 6) {
      throw new Error("Password should have a minimum of 6 symbols");
    } else if (validateEmail(loginEmail)) {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } else {
      throw new Error("Please enter a valid email");
    }
  } else {
    throw new Error("Empty email or password");
  }
};

/**
 * Creates a user account.
 *
 * @param loginEmail - The email for the account.
 * @param loginPassword - The password for the account.
 * @param loginRepeatPassword - The repeated password for confirmation.
 * @throws {Error} If the passwords do not match.
 * @returns {Promise<void>} A Promise that resolves when the account is created.
 */

export const createAccount = async (
  loginEmail: string | undefined,
  loginPassword: string | undefined,
  loginRepeatPassword: string | undefined
): Promise<void> => {
  if (loginEmail && loginPassword && loginRepeatPassword) {
    if (!validateEmail(loginEmail)) {
      throw new Error("Please enter a valid email");
    }
    if (!validatePassword(loginPassword)) {
      throw new Error(
        "Passwords must contain lowercase letters, uppercase letters and numbers"
      );
    }
    if (loginPassword !== loginRepeatPassword) {
      throw new Error("Passwords do not match");
    }

    if (loginPassword.length < 6) {
      throw new Error("Password should have a minimum of 6 symbols");
    }
    await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
  } else {
    throw new Error("Empty email or password");
  }
};
export const loginEvent = document.createEvent("Event");

export const monitorAuthState = (dispatch: Dispatch<AnyAction>): void => {
  onAuthStateChanged(auth, (user) => {
    let destination: To = "";
    if (user) {
      // User is logged in
      const currentPath = window.location.pathname;
      dispatch(setEmail(user.email));

      if (
        currentPath === "/" ||
        currentPath === "/auth" ||
        currentPath === "/auth/"
      ) {
        // Redirect to /search if on root or /auth path
        destination = "/search";
      }
    } else {
      // User is not logged in
      const currentPath = window.location.pathname;
      console.log("user not logged in");
      if (currentPath !== "/auth" && currentPath !== "/") {
        // Redirect to / if not on root path
        destination = "/";
      }

      dispatch(setEmail(null));
    }
    if (destination) {
      window.location.href = destination;
    }
  });
};

export const logout = (): void => {
  signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
