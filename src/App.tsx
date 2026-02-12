import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import type { AppDispatch, RootState } from "./redux/store";
import { useEffect, useState } from "react";
import {
  fetchMoviesByGanre,
  fetchMoviesByQuery,
} from "./redux/movies/moviesOperations";
import { GenreList } from "./components/GanreList/GanreList";
import { MovieList } from "./components/MovieList/MovieList";

function App() {
  const [moviesList, setMoviesList] = useState<string>("");

  const { movies, genres } = useSelector((state: RootState) => state.movies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    dispatch(fetchMoviesByGanre());
  }, [dispatch]);

  // useEffect((): void => {
  //   setGenresList(genres)
  // }, [genres])

  const handleSearch = (): void => {
    dispatch(fetchMoviesByQuery({ query: moviesList }));
  };

  return (
    <>
      <input
        type="text"
        value={moviesList}
        onChange={(e) => setMoviesList(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <MovieList movies={movies} />
      <GenreList genres={genres} />
    </>
  );
}

export default App;
