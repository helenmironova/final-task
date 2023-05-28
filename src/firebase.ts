import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_zz8bbKvZLfF9yhU2_3NzDNPjKQxLSGM",
  authDomain: "final-task-331c2.firebaseapp.com",
  projectId: "final-task-331c2",
  storageBucket: "final-task-331c2.appspot.com",
  messagingSenderId: "1071874135413",
  appId: "1:1071874135413:web:8a67cf2e221a32ec36af3c",
  measurementId: "G-B1LV3HFX3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
