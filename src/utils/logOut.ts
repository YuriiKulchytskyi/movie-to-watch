import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleLogout = async () => {
  await signOut(auth);
};