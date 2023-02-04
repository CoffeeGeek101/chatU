// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP6uBO1PQCITbEiuHoqkU8uQG4qOh_ho8",
  authDomain: "chatu-eecff.firebaseapp.com",
  projectId: "chatu-eecff",
  storageBucket: "chatu-eecff.appspot.com",
  messagingSenderId: "191913098321",
  appId: "1:191913098321:web:b264d4deff90d4dff84c70",
  measurementId: "G-018P8B93L5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
