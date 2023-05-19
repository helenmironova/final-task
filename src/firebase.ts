// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCKHMr_sE2YT_XBNyn42ni1KGJJCqMijw",
  authDomain: "quantori-final-project.firebaseapp.com",
  projectId: "quantori-final-project",
  storageBucket: "quantori-final-project.appspot.com",
  messagingSenderId: "1023837254689",
  appId: "1:1023837254689:web:bb76cf11852d160e4fdf60",
  measurementId: "G-HPBQ1GBEXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);