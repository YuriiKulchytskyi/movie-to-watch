import { useEffect } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedGenre } from "../redux/movies/moviesOperations";
import { useParams } from "react-router";
import { MovieList } from "../components/MovieList/MovieList";

export const GenrePage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(
    (state: RootState) => state.movies.selectedGenreMovies,
  );

  useEffect(() => {
    if (genreId) {
      dispatch(fetchSelectedGenre(Number(genreId)));
    }
  }, [dispatch, genreId]);

  return <MovieList movies={movies} />;
};
