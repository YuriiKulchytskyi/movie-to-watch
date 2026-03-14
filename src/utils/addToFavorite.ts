import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import type { Movie } from "../types/movie";

const auth = getAuth();
const db = getFirestore();

export const addToFavorites = async (movie: Movie) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("User not logged in");
    return;
  }

  try {
    await setDoc(doc(db, "users", user.uid, "favorites", movie.id.toString()), {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    });

    console.log("Movie added to favorites", movie);
  } catch (error) {
    console.error(error);
  }
};
