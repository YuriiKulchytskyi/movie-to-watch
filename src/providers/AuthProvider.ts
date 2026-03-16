import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {});

    return () => unsubscribe();
  }, []);

  return children;
};
