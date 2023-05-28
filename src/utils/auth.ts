// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

export const loginEmailPassword = async (
  loginEmail: string | undefined,
  loginPassword: string | undefined
): Promise<void> => {
  if (loginEmail && loginPassword) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
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
    if (loginPassword === loginRepeatPassword) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
    } else {
      throw new Error("Passwords do not match");
    }
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
