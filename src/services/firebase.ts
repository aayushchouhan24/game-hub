import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChCDhifQgn_ANqOJQ0TS5-hfYDDqwtwIE",
  authDomain: "game-hub-web.firebaseapp.com",
  databaseURL:
    "https://game-hub-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "game-hub-web",
  storageBucket: "game-hub-web.appspot.com",
  messagingSenderId: "331251075482",
  appId: "1:331251075482:web:a577f60183bae15ac49223",
  measurementId: "G-TXQLZLTF33",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);

export const googleProvider = new GoogleAuthProvider();
