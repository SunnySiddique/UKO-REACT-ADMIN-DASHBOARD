import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq14uU8bjZP54YTm6UecyzcjlJpCXtKYE",
  authDomain: "sass-dashboard-f515e.firebaseapp.com",
  projectId: "sass-dashboard-f515e",
  storageBucket: "sass-dashboard-f515e.appspot.com",
  messagingSenderId: "587600031665",
  appId: "1:587600031665:web:3efaf1c800e7691bc51790",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { firebaseAuth, googleProvider };
