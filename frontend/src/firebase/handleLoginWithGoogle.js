// handleLoginWithGoogle.js
import { auth, googleProvider } from "./firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";

const handleLoginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Access user info via `result.user`
    console.log("User signed in: ", result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export default handleLoginWithGoogle;
