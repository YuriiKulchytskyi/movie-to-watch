import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import type { Movie } from "../types/movie";

export const getFavoriteMovies = async (): Promise<Movie[]> => {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const favoriteMoviesCol = collection(db, "users", user.uid, "favorites");

  const movieSnapshot = await getDocs(favoriteMoviesCol);

  const movieList: Movie[] = movieSnapshot.docs.map(doc => doc.data() as Movie);

  return movieList;
}