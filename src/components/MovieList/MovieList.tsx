import { useDispatch, useSelector } from "react-redux";
import "./MovieList.scss";
import type { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSelectedGenre } from "../../redux/movies/moviesOperations";
import { MovieItem } from "./MovieItem";

export const MovieList = () => {
  const movieList = useSelector((state: RootState) => state.movies.movies);
  const selectedGenreMovies = useSelector(
    (state: RootState) => state.movies.selectedGenreMovies,
  );
  const { genreId } = useParams<{ genreId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  useEffect(() => {
    if (genreId) {
      dispatch(fetchSelectedGenre(Number(genreId)));
    }
  }, [dispatch, genreId]);

  const movies = genreId ? selectedGenreMovies : movieList;

  if (!movies.length) return <p>Loading movies...</p>;

  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <MovieItem key={movie.id} item={movie} />
      ))}
    </ul>
  );
};
