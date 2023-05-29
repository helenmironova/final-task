// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password: string) => {
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

export const monitorAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(" LOgged in");
    } else {
      console.log("Not LOgged in");
    }
  });
};
