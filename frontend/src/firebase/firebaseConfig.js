
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyC6oQ8pavfX1B857SZY9bLR2k4ZJqgZnkI",
  authDomain: "q-bit-5c696.firebaseapp.com",
  projectId: "q-bit-5c696",
  storageBucket: "q-bit-5c696.firebasestorage.app",
  messagingSenderId: "941366265998",
  appId: "1:941366265998:web:fce56a7d5c83449826a1df"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
