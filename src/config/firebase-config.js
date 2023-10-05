// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0vLJqaq5WtPDBk977tenab8o_v8oRNU0",
  authDomain: "expense-tracker-62427.firebaseapp.com",
  projectId: "expense-tracker-62427",
  storageBucket: "expense-tracker-62427.appspot.com",
  messagingSenderId: "917863368481",
  appId: "1:917863368481:web:39084e4b3635e921fd2060",
  measurementId: "G-BFH3KV1LB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
