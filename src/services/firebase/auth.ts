import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./app";

export const auth = getAuth(app);

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
