import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import type { Movie } from "../types/movie";

const auth = getAuth();
const db = getFirestore();

export const addToFavorites = async (movie: Movie) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    await setDoc(doc(db, "users", user.uid, "favorites", movie.id.toString()), {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    });

  } catch (error) {
    console.error(error);
  }
};
