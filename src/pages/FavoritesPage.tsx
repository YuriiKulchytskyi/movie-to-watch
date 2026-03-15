import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { MovieList } from "../components/MovieList/MovieList";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Pages.scss";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const favoritesRef = collection(db, "users", user.uid, "favorites");

    const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
      const movies: Movie[] = snapshot.docs.map((doc) => doc.data() as Movie);
      setFavorites(movies);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!favorites.length ? (
        <h1 className="favorites-header">You haven't added any favorite movies yet.</h1>
      ) : (
        <MovieList movies={favorites} />
      )}
    </>
  );
};
