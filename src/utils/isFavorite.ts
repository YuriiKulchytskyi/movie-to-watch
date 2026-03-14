import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const isFavorite = async (movieId: number) => {
  const user = auth.currentUser;

  if (!user) return false;

  const movieRef = doc(db, "users", user.uid, "favorites", movieId.toString());

  const movieSnap = await getDoc(movieRef);

  return movieSnap.exists();
};