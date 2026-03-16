import { deleteDoc, doc } from "firebase/firestore";
import type { Movie } from "../types/movie";
import { auth, db } from "../firebase";

export const removeFromFavorites = async (movie: Movie) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    await deleteDoc(doc(db, "users", user.uid, "favorites", movie.id.toString()));
  } catch (error) {
    console.error(error);
  }
};
