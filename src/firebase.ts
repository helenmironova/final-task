import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUCHKCiiIT--XwhFt2zr_VwO71v7Ybf_A",
  authDomain: "quantori-3a968.firebaseapp.com",
  projectId: "quantori-3a968",
  storageBucket: "quantori-3a968.appspot.com",
  messagingSenderId: "344574859188",
  appId: "1:344574859188:web:cf53db4b3c1fd24cdd44e1",
  measurementId: "G-7NV1E8VMTW",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

