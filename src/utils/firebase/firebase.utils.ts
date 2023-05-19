import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApXw-IYi4sLBeRt1iQFVjadyyS5xsXNTE",
  authDomain: "quantori-final-project-99073.firebaseapp.com",
  projectId: "quantori-final-project-99073",
  storageBucket: "quantori-final-project-99073.appspot.com",
  messagingSenderId: "378167074046",
  appId: "1:378167074046:web:392df27a1214f1a8b699af",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
