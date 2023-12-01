import { initializeApp } from "firebase/app";

const API_KEY = process.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "map-9cbf6.firebaseapp.com",
  projectId: "map-9cbf6",
  storageBucket: "map-9cbf6.appspot.com",
  messagingSenderId: "1074511798472",
  appId: "1:1074511798472:web:65cb0d166485f88ac985fd"
};

export const app = initializeApp(firebaseConfig);
